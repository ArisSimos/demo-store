import nodemailer from 'nodemailer';

// ...existing code for generating invoice PDF if needed...
// import { generateInvoicePdf } from './generateInvoicePdf.js';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

export async function sendPurchaseEmail({ to, productName, orderId }) {
  // Example: You can add PDF attachment logic here if needed
  // const pdfBuffer = await generateInvoicePdf({ ... });

  const books = productName.split(', ');
  const isbns = orderId.split(', ');

  const bookList = books.map((book, idx) => {
    const isbn = isbns[idx] || '';
    return `<li>${book} <br /><small>ISBN: ${isbn}</small></li>`;
  }).join('');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"BookHaven" <${EMAIL_USER}>`,
    to,
    subject: 'Your BookHaven Purchase Verification',
    html: `
      <h2>Thank you for your purchase!</h2>
      <p>You bought:</p>
      <ul>
        ${bookList}
      </ul>
      <p>If you have any questions, reply to this email.</p>
    `,
    // attachments: [
    //   {
    //     filename: `Invoice-${orderId}.pdf`,
    //     content: pdfBuffer,
    //     contentType: 'application/pdf'
    //   }
    // ]
  };

  await transporter.sendMail(mailOptions);
}