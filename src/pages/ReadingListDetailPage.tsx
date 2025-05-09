
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/data/productService';

// Sample reading lists data - in a real app, this would come from an API or database
const readingLists = [
  {
    id: "summer-2025",
    title: "Summer 2025 Reading List",
    description: "Perfect beach reads for your summer vacation. These books are perfect companions for lazy days at the beach or relaxing by the pool. From light-hearted romances to thrilling adventures, this collection has something for everyone's summer reading pleasure.",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    productIds: ["1", "3", "5", "7"]
  },
  {
    id: "award-winners-2024",
    title: "Award Winners 2024",
    description: "Books that have won prestigious literary awards this year. This collection showcases the best literature has to offer, from Pulitzer Prize winners to National Book Award recipients. These critically acclaimed works represent the pinnacle of storytelling and literary achievement.",
    coverImage: "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    productIds: ["2", "4", "6"]
  },
  {
    id: "staff-picks",
    title: "Staff Picks",
    description: "Recommended by our bookstore staff. Our team of dedicated readers has carefully selected these books as their personal favorites. With diverse tastes and interests, our staff's recommendations span multiple genres and styles, offering something special for every reader.",
    coverImage: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    productIds: ["8", "9", "10"]
  },
  {
    id: "classics-reimagined",
    title: "Classics Reimagined",
    description: "Modern takes on timeless stories. This collection features contemporary retellings and fresh interpretations of beloved classics. These books breathe new life into familiar tales, offering innovative perspectives while honoring the enduring themes that make the originals so powerful.",
    coverImage: "https://images.unsplash.com/photo-1531072901881-d644216d4bf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    productIds: ["1", "2", "4"]
  }
];

const ReadingListDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const readingList = readingLists.find(list => list.id === id);
  const allProducts = getAllProducts();
  
  if (!readingList) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Reading List Not Found</h1>
            <p>We couldn't find the reading list you're looking for.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const books = readingList.productIds
    .map(id => allProducts.find(product => product.id === id))
    .filter(product => product !== undefined);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative h-64 mb-8">
          <img 
            src={readingList.coverImage} 
            alt={readingList.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <h1 className="text-4xl font-bold text-white mb-2">{readingList.title}</h1>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <p className="text-lg mb-8">{readingList.description}</p>
          
          <h2 className="text-2xl font-bold mb-6">Books in this Collection</h2>
          
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map(book => (
                <ProductCard key={book.id} product={book} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No books found in this reading list.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReadingListDetailPage;
