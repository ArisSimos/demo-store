
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductImageContainer from '@/components/product/ProductImageContainer';
import { Product } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { Book, ListCheck, Grid2X2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import ReadingProgress from '@/components/book/ReadingProgress';
import { getAllProducts } from '@/data/productService';

const BOOKSHELF_STORAGE_KEY = 'virtual-bookshelf-books';

const VirtualBookshelfPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [books, setBooks] = useState<Product[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filterText, setFilterText] = useState('');
  const allProducts = getAllProducts();
  
  // Load bookshelf data from localStorage
  useEffect(() => {
    const savedBookshelf = localStorage.getItem(BOOKSHELF_STORAGE_KEY);
    if (savedBookshelf) {
      try {
        const bookIds = JSON.parse(savedBookshelf);
        const booksList = allProducts.filter(product => 
          bookIds.includes(product.id)
        );
        setBooks(booksList);
      } catch (e) {
        console.error("Error loading bookshelf:", e);
      }
    } else {
      // For demo purposes, add some sample books if none exist
      const sampleBooks = allProducts.slice(0, 3);
      setBooks(sampleBooks);
      localStorage.setItem(BOOKSHELF_STORAGE_KEY, JSON.stringify(sampleBooks.map(b => b.id)));
    }
  }, [allProducts]);
  
  const filteredBooks = books.filter(book => 
    book.name.toLowerCase().includes(filterText.toLowerCase()) ||
    (book.author && book.author.toLowerCase().includes(filterText.toLowerCase()))
  );

  const handleRemoveBook = (bookId: string) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    setBooks(updatedBooks);
    localStorage.setItem(BOOKSHELF_STORAGE_KEY, JSON.stringify(updatedBooks.map(b => b.id)));
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">My Virtual Bookshelf</h1>
            <p className="text-muted-foreground">Keep track of your book collection and reading progress</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Input
                type="text"
                placeholder="Search your bookshelf..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="pl-10 border-amber-200"
              />
              <Book className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="flex border border-amber-200 rounded-md overflow-hidden">
              <Button
                variant={view === 'grid' ? "default" : "ghost"}
                size="icon"
                onClick={() => setView('grid')}
                className={view === 'grid' ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'list' ? "default" : "ghost"}
                size="icon"
                onClick={() => setView('list')}
                className={view === 'list' ? "bg-amber-600 hover:bg-amber-700" : ""}
              >
                <ListCheck className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-amber-100 border border-amber-200">
            <TabsTrigger value="all">All Books</TabsTrigger>
            <TabsTrigger value="reading">Currently Reading</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {filteredBooks.length > 0 ? (
              <div className={`${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' : 'space-y-6'}`}>
                {filteredBooks.map(book => (
                  <BookshelfItem 
                    key={book.id} 
                    book={book} 
                    view={view} 
                    onRemove={handleRemoveBook} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-amber-50 rounded-lg border border-amber-200">
                <h2 className="text-xl mb-2">Your bookshelf is empty</h2>
                <p className="text-muted-foreground mb-8">Add books to your bookshelf to keep track of your collection</p>
                <Button asChild>
                  <a href="/category/all">Browse Books</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reading" className="mt-6">
            <div className={`${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' : 'space-y-6'}`}>
              {filteredBooks.slice(0, 2).map(book => (
                <BookshelfItem 
                  key={book.id} 
                  book={book} 
                  view={view} 
                  onRemove={handleRemoveBook} 
                  showProgress 
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className={`${view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6' : 'space-y-6'}`}>
              {filteredBooks.slice(2, 3).map(book => (
                <BookshelfItem 
                  key={book.id} 
                  book={book} 
                  view={view} 
                  onRemove={handleRemoveBook} 
                  completed 
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

interface BookshelfItemProps {
  book: Product;
  view: 'grid' | 'list';
  onRemove: (id: string) => void;
  showProgress?: boolean;
  completed?: boolean;
}

const BookshelfItem: React.FC<BookshelfItemProps> = ({ 
  book, 
  view, 
  onRemove,
  showProgress = false,
  completed = false
}) => {
  if (view === 'grid') {
    return (
      <div className="flex flex-col h-full">
        <div className="relative mb-4 mx-auto" style={{ maxWidth: '180px' }}>
          <a href={`/product/${book.id}`}>
            <ProductImageContainer src={book.image} alt={book.name} />
          </a>
          {completed && (
            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
              <ListCheck className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <h3 className="font-medium text-amber-950 line-clamp-2">{book.name}</h3>
          {book.author && <p className="text-sm text-amber-700">{book.author}</p>}
        </div>
        
        {showProgress && (
          <div className="mt-4">
            <ReadingProgress bookId={book.id} totalPages={book.pages} />
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onRemove(book.id)}
            className="text-amber-700 hover:text-red-500"
          >
            Remove
          </Button>
        </div>
      </div>
    );
  }
  
  // List view
  return (
    <div className="flex gap-6 border-b border-amber-200 pb-6">
      <div className="relative" style={{ minWidth: '100px' }}>
        <a href={`/product/${book.id}`}>
          <ProductImageContainer src={book.image} alt={book.name} />
        </a>
        {completed && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <ListCheck className="h-4 w-4" />
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-lg text-amber-950">{book.name}</h3>
        {book.author && <p className="text-amber-700">{book.author}</p>}
        <div className="mt-2 text-sm text-muted-foreground">
          {book.format && <p>Format: {book.format}</p>}
          {book.pages && <p>Pages: {book.pages}</p>}
        </div>
        
        <div className="mt-4">
          {showProgress && <ReadingProgress bookId={book.id} totalPages={book.pages} />}
        </div>
      </div>
      
      <div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onRemove(book.id)}
          className="text-amber-700 hover:text-red-500"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default VirtualBookshelfPage;
