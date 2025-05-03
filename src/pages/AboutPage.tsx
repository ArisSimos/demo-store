
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl font-bold mb-4">About BookHaven</h1>
                <p className="text-lg text-gray-700 mb-6">
                  Your trusted source for books since 2010. We believe that books have the power to 
                  change lives, spark imagination, and connect people across the world.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1521123845560-14093637aa7d?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3" 
                  alt="BookHaven store interior" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <p className="text-gray-700 mb-6">
                BookHaven began with a simple idea: to create a space where book lovers could discover 
                new worlds, explore different perspectives, and find their next favorite read. What 
                started as a small corner bookshop in 2010 has grown into the comprehensive online 
                platform you see today.
              </p>
              <p className="text-gray-700 mb-6">
                Our founder, Jane Smith, a lifelong bibliophile, envisioned a bookstore that would 
                not only sell books but create a community around the love of reading. With her 
                background in literature and technology, she built BookHaven to bridge the gap 
                between traditional bookstores and the digital age.
              </p>
              <p className="text-gray-700">
                Today, BookHaven serves thousands of readers across the country, offering everything 
                from bestsellers to rare finds, physical books to audiobooks. Despite our growth, 
                our mission remains the same: connecting readers with stories that matter.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Literacy for All</h3>
                <p className="text-gray-600">
                  We believe everyone should have access to books and the worlds they open. That's why 
                  we donate a portion of our profits to literacy programs nationwide.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Supporting Authors</h3>
                <p className="text-gray-600">
                  Behind every book is a writer with a story to tell. We work directly with authors 
                  and publishers to ensure fair compensation and recognition.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Environmental Responsibility</h3>
                <p className="text-gray-600">
                  Our packaging is made from recycled materials, and we offer digital options to 
                  reduce environmental impact while still bringing stories to life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Jane Smith - Founder & CEO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">Jane Smith</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="John Davis - Head of Curation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">John Davis</h3>
                <p className="text-gray-600">Head of Curation</p>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Sarah Johnson - Customer Experience" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">Sarah Johnson</h3>
                <p className="text-gray-600">Customer Experience</p>
              </div>
              <div className="text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Michael Chen - Operations" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">Michael Chen</h3>
                <p className="text-gray-600">Operations</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-12 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Join the BookHaven Community</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Want to stay updated on new releases, author events, and exclusive offers? 
              Sign up for our newsletter or reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
