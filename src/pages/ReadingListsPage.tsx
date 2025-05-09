
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/data/productService';

// Sample reading lists data - in a real app, this would come from an API or database
const readingLists = [
  {
    id: "summer-2025",
    title: "Summer 2025 Reading List",
    description: "Perfect beach reads for your summer vacation",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    productIds: ["1", "3", "5", "7"]
  },
  {
    id: "award-winners-2024",
    title: "Award Winners 2024",
    description: "Books that have won prestigious literary awards this year",
    coverImage: "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    productIds: ["2", "4", "6"]
  },
  {
    id: "staff-picks",
    title: "Staff Picks",
    description: "Recommended by our bookstore staff",
    coverImage: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    productIds: ["8", "9", "10"]
  },
  {
    id: "classics-reimagined",
    title: "Classics Reimagined",
    description: "Modern takes on timeless stories",
    coverImage: "https://images.unsplash.com/photo-1531072901881-d644216d4bf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    productIds: ["1", "2", "4"]
  }
];

const ReadingListsPage = () => {
  const allProducts = getAllProducts();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Curated Reading Lists</h1>
          <p className="text-muted-foreground mb-8">
            Discover handpicked collections for every reader
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {readingLists.map(list => {
              const books = list.productIds
                .map(id => allProducts.find(product => product.id === id))
                .filter(product => product !== undefined);
                
              if (books.length === 0) return null;
              
              return (
                <Card key={list.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src={list.coverImage} 
                      alt={list.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent">
                      <div className="absolute bottom-0 left-0 p-6">
                        <h2 className="text-white text-2xl font-bold">{list.title}</h2>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="pt-4 pb-0">
                    <CardDescription>{list.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {books.slice(0, 4).map(book => (
                        <Link key={book.id} to={`/product/${book.id}`}>
                          <img 
                            src={book.image} 
                            alt={book.name}
                            className="h-24 w-16 object-cover rounded"
                            title={book.name}
                          />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to={`/reading-list/${list.id}`}>
                        View Collection
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReadingListsPage;
