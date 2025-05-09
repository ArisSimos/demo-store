
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/data/productService';
import { Book, Calendar, Mail } from 'lucide-react';

// Mock author data - in a real app, this would come from an API or database
const authors = [
  {
    id: "matt-haig",
    name: "Matt Haig",
    bio: "Matt Haig is a British author for children and adults. His memoir Reasons to Stay Alive was a number one bestseller, staying in the British top ten for 46 weeks. His children's novel A Boy Called Christmas was a runaway hit and is translated in over 40 languages.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    birthDate: "July 3, 1975",
    website: "https://www.matthaig.com",
    email: "contact@matthaig.com"
  },
  {
    id: "james-clear",
    name: "James Clear",
    bio: "James Clear is an author, entrepreneur, and photographer. His work focuses on habits and continuous improvement. He is a regular speaker at Fortune 500 companies and his work has been featured in publications such as Time magazine, the New York Times, and the Wall Street Journal.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    birthDate: "January 22, 1986",
    website: "https://jamesclear.com",
    email: "james@jamesclear.com"
  },
  {
    id: "andy-weir",
    name: "Andy Weir",
    bio: "Andy Weir built a career as a software engineer until the success of his first published novel, The Martian, allowed him to live out his dream of writing full-time. He is a lifelong space nerd and a devoted hobbyist of subjects such as relativistic physics and orbital mechanics.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    birthDate: "June 16, 1972",
    website: "https://andyweirauthor.com",
    email: "andy@andyweirauthor.com"
  }
];

const AuthorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const author = authors.find(author => author.id === slug);
  
  if (!author) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Author Not Found</h1>
            <p>We couldn't find the author you're looking for.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Get all books by this author
  const authorBooks = getAllProducts().filter(
    product => product.author && product.author.includes(author.name)
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="md:w-1/4">
                <img 
                  src={author.image} 
                  alt={author.name}
                  className="w-full rounded-lg shadow-md object-cover aspect-[3/4]"
                />
              </div>
              
              <div className="md:w-3/4">
                <h1 className="text-3xl font-bold mb-4">{author.name}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Born: {author.birthDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Book className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Books: {authorBooks.length}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${author.email}`} className="text-sm text-primary hover:underline">
                      {author.email}
                    </a>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-2">About the Author</h2>
                  <p>{author.bio}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Books by {author.name}</h2>
            {authorBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {authorBooks.map(book => (
                  <ProductCard key={book.id} product={book} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No books found for this author.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthorPage;
