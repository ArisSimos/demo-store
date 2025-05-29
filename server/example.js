const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const { existsSync } = require("node:fs");
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Determine the correct .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
const envPath = path.resolve(__dirname, envFile);

// Check if the .env file exists before loading
if (existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`✅ Loaded environment variables from: ${envFile}`);
} else {
    console.warn(`⚠️ Warning: Environment file ${envFile} not found! Using default environment variables.`);
}

// Load JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key';

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'book_db',
};

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized: Token has expired. Please log in again." });
            }
            if (err.name === "JsonWebTokenError") {
                return res.status(403).json({ message: "Forbidden: Invalid token" });
            }
            if (err.name === "NotBeforeError") {
                return res.status(403).json({ message: "Forbidden: Token is not yet valid" });
            }

            console.error("JWT Verification Error:", err);
            return res.status(500).json({ message: "Server error. Please try again later." });
        }

        req.user = user;
        next();
    });
};

// Enable Swagger **only if not in production**
if (process.env.NODE_ENV !== 'production') {
    console.log("✅ Swagger API Docs enabled (Non-production mode)");

    const swaggerJsDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const swaggerOptions = {
        definition: {
            openapi: "3.1.1",
            info: {
                title: "Books API",
                version: "1.0.0",
                description: "Simple API for book management"
            },
            servers: [{ url: "http://localhost:3000" }],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                },
                schemas: {
                    Book: {
                        type: "object",
                        properties: {
                            uuid: { type: "string", format: "uuid" },
                            title: { type: "string" },
                            author: { type: "string" },
                            published_year: { type: "integer" },
                            genre: { type: "string" }
                        },
                        example: {
                            uuid: "123e4567-e89b-12d3-a456-426614174000",
                            title: "The Great Gatsby",
                            author: "F. Scott Fitzgerald",
                            published_year: 1925,
                            genre: "Fiction"
                        }
                    },
                    BookInput: {
                        type: "object",
                        required: ["title", "author", "published_year", "genre"],
                        properties: {
                            title: { type: "string" },
                            author: { type: "string" },
                            published_year: { type: "integer" },
                            genre: { type: "string" }
                        },
                        example: {
                            title: "1984",
                            author: "George Orwell",
                            published_year: 1949,
                            genre: "Dystopian"
                        }
                    }
                }
            },
            security: [{ bearerAuth: [] }]
        },
        apis: [path.basename(__filename)]
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
} else {
    console.log("🚀 Running in production mode – Swagger disabled.");
}

// Helper function for book validation
const validateBookData = (title, author, published_year, genre) => {
    if (!title || !author || !published_year || !genre) {
        return { valid: false, message: "Invalid data. All fields (title, author, published_year, genre) are required." };
    }

    const currentYear = new Date().getFullYear();
    if (isNaN(published_year) || published_year <= 0 || published_year > currentYear) {
        return { valid: false, message: "Invalid published_year. Must be a positive integer and a valid year." };
    }

    return { valid: true };
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user and generate JWT token
 *     description: Returns a JWT token for accessing protected routes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "testuser"
 *     responses:
 *       200:
 *         description: JWT token generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1..."
 *       400:
 *         description: Bad request - username not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username required"
 */
app.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: "Username required" });

    // Generate a JWT token
    const user = { name: username };
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

    res.json({ accessToken });
});

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *     description: Fetches all books from the database with optional pagination.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 10
 *         description: Maximum number of books to return (optional).
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           example: 0
 *         description: Number of books to skip before starting to collect the result set (optional).
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *               examples:
 *                  multipleBooks:
 *                    summary: Example response with multiple books
 *                    value:
 *                      - uuid: "123e4567-e89b-12d3-a456-426614174000"
 *                        title: "The Great Gatsby"
 *                        author: "F. Scott Fitzgerald"
 *                        published_year: 1925
 *                        genre: "Fiction"
 *                      - uuid: "456e7890-f12b-34c5-d678-91011a121314"
 *                        title: "1984"
 *                        author: "George Orwell"
 *                        published_year: 1949
 *                        genre: "Dystopian"
 *       400:
 *         description: Bad request - Invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid limit or offset value. Must be a positive integer."
 *       500:
 *         description: Internal Server Error - Unexpected database issue.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error. Please try again later."
 */
app.get('/books', async (req, res) => {
    let query = 'SELECT * FROM books';

    // Validate limit and offset
    const limit = req.query.limit && /^\d+$/.test(req.query.limit) ? parseInt(req.query.limit, 10) : null;
    const offset = req.query.offset && /^\d+$/.test(req.query.offset) ? parseInt(req.query.offset, 10) : null;

    if (req.query.limit && (isNaN(limit) || limit <= 0)) {
        return res.status(400).json({ message: "Invalid limit value. Must be a positive integer." });
    }
    if (req.query.offset && (isNaN(offset) || offset < 0)) {
        return res.status(400).json({ message: "Invalid offset value. Must be a non-negative integer." });
    }

    if (limit !== null) {
        query += ` LIMIT ${limit}`;
    }
    if (offset !== null && limit !== null) {
        query += ` OFFSET ${offset}`;
    }

    try {
        const conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.execute(query);
        await conn.end();
        res.json(rows);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by UUID
 *     description: Fetches a single book from the database using its UUID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         description: The UUID of the book to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Book"
 *             examples:
 *               singleBook:
 *                 summary: Example response with a book
 *                 value:
 *                   uuid: "123e4567-e89b-12d3-a456-426614174000"
 *                   title: "The Great Gatsby"
 *                   author: "F. Scott Fitzgerald"
 *                   published_year: 1925
 *                   genre: "Fiction"
 *       400:
 *         description: Bad request - Invalid UUID format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid UUID format."
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found."
 *       500:
 *         description: Internal Server Error - Unexpected database issue.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error. Please try again later."
 */
app.get('/books/:id', async (req, res) => {
    const { id } = req.params;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        return res.status(400).json({ message: "Invalid UUID format." });
    }

    try {
        const conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.execute('SELECT * FROM books WHERE uuid = ?', [id]);
        await conn.end();

        if (rows.length) {
            return res.status(200).json(rows[0]);
        } else {
            return res.status(404).json({ message: "Book not found." });
        }
    } catch (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     description: Creates a new book record in the database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/BookInput"
 *           examples:
 *             newBook:
 *               summary: Example of a book to be created
 *               value:
 *                 title: "To Kill a Mockingbird"
 *                 author: "Harper Lee"
 *                 published_year: 1960
 *                 genre: "Fiction"
 *     responses:
 *       201:
 *         description: Book successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 title:
 *                   type: string
 *                   example: "The Great Gatsby"
 *                 author:
 *                   type: string
 *                   example: "F. Scott Fitzgerald"
 *                 published_year:
 *                   type: integer
 *                   example: 1925
 *                 genre:
 *                   type: string
 *                   example: "Fiction"
 *       400:
 *         description: Bad request - Missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid data. All fields (title, author, published_year, genre) are required."
 *       401:
 *         description: Unauthorized - Missing authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       403:
 *         description: Forbidden - Invalid or expired authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: Invalid token"
 *       500:
 *         description: Internal Server Error - Unexpected database issue.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error. Please try again later."
 */
app.post('/books', authenticateToken, async (req, res) => {
    const { title, author, published_year, genre } = req.body;

    // Use the validation function
    const validation = validateBookData(title, author, published_year, genre);
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    try {
        const newUuid = uuidv4();
        const conn = await mysql.createConnection(dbConfig);
        await conn.execute(
            'INSERT INTO books (uuid, title, author, published_year, genre) VALUES (?, ?, ?, ?, ?)',
            [newUuid, title, author, published_year, genre]
        );
        await conn.end();

        res.status(201).json({ uuid: newUuid, title, author, published_year, genre });

    } catch (error) {
        console.error("Database Insert Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     description: Updates details of an existing book in the database.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         description: The UUID of the book to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               published_year:
 *                 type: integer
 *                 example: 1925
 *               genre:
 *                 type: string
 *                 example: "Fiction"
 *             required:
 *               - title
 *               - author
 *               - published_year
 *               - genre
 *     responses:
 *       200:
 *         description: Book successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book updated successfully."
 *       400:
 *         description: Bad request - Missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid data. All fields (title, author, published_year, genre) are required."
 *       401:
 *         description: Unauthorized - Missing authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       403:
 *         description: Forbidden - Invalid or expired authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: Invalid token"
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found."
 *       500:
 *         description: Internal Server Error - Unexpected database issue.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error. Please try again later."
 */
app.put('/books/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, author, published_year, genre } = req.body;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        return res.status(400).json({ message: "Invalid UUID format." });
    }

    // Use the validation function
    const validation = validateBookData(title, author, published_year, genre);
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    try {
        const conn = await mysql.createConnection(dbConfig);

        // Check if book exists before updating
        const [existingBook] = await conn.execute('SELECT * FROM books WHERE uuid = ?', [id]);
        if (existingBook.length === 0) {
            await conn.end();
            return res.status(404).json({ message: "Book not found." });
        }

        // Update book
        await conn.execute(
            'UPDATE books SET title=?, author=?, published_year=?, genre=? WHERE uuid=?',
            [title, author, published_year, genre, id]
        );
        await conn.end();

        return res.status(200).json({ message: "Book updated successfully." });

    } catch (error) {
        console.error("Database Update Error:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Removes a book from the database using its UUID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         description: The UUID of the book to delete.
 *     responses:
 *       200:
 *         description: Book successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book deleted successfully."
 *       400:
 *         description: Bad request - Invalid UUID format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid UUID format."
 *       401:
 *         description: Unauthorized - Missing authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       403:
 *         description: Forbidden - Invalid or expired authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: Invalid token"
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found."
 *       500:
 *         description: Internal Server Error - Unexpected database issue.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error. Please try again later."
 */
app.delete('/books/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
        return res.status(400).json({ message: "Invalid UUID format." });
    }

    try {
        const conn = await mysql.createConnection(dbConfig);

        // Check if book exists before deleting
        const [existingBook] = await conn.execute('SELECT * FROM books WHERE uuid = ?', [id]);
        if (existingBook.length === 0) {
            await conn.end();
            return res.status(404).json({ message: "Book not found." });
        }

        // Delete book
        await conn.execute('DELETE FROM books WHERE uuid=?', [id]);
        await conn.end();

        return res.status(200).json({ message: "Book deleted successfully." });

    } catch (error) {
        console.error("Database Delete Error:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
