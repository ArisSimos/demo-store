
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { BookOpen, Users, MessageCircle, Share, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getAllProducts } from '@/data/productService';

// Sample book club data - in a real app, this would come from an API or database
const sampleBookClubs = [
  {
    id: 'mystery-lovers',
    name: 'Mystery Lovers Club',
    description: 'A club for fans of mystery and detective novels.',
    members: 24,
    currentBook: '3', // product ID
    nextMeetingDate: '2025-05-25T18:00:00',
    isPublic: true,
    discussions: [
      {
        id: 'd1',
        title: 'What did everyone think about the plot twist in chapter 7?',
        author: 'Regular User',
        date: '2025-05-10T14:32:00',
        comments: 8,
        excerpt: 'I was completely shocked when the detective revealed that the butler was actually...'
      },
      {
        id: 'd2',
        title: 'Character development of the protagonist',
        author: 'Admin User',
        date: '2025-05-09T10:15:00',
        comments: 12,
        excerpt: 'I thought the way the author developed the main character throughout the story was brilliant...'
      }
    ]
  },
  {
    id: 'sci-fi-explorers',
    name: 'Sci-Fi Explorers',
    description: 'Exploring new worlds and technologies through science fiction literature.',
    members: 18,
    currentBook: '5', // product ID
    nextMeetingDate: '2025-05-20T19:00:00',
    isPublic: true,
    discussions: [
      {
        id: 'd3',
        title: 'The scientific accuracy of the space travel descriptions',
        author: 'Regular User',
        date: '2025-05-11T09:20:00',
        comments: 5,
        excerpt: 'While I enjoyed the book overall, I noticed some scientific inaccuracies in how the author described...'
      }
    ]
  },
  {
    id: 'classic-literature',
    name: 'Classic Literature Society',
    description: 'Appreciating the timeless themes and artistry of classic literature.',
    members: 32,
    currentBook: '1', // product ID
    nextMeetingDate: '2025-05-28T17:30:00',
    isPublic: false,
    discussions: [
      {
        id: 'd4',
        title: 'Relevance of themes to modern society',
        author: 'Admin User',
        date: '2025-05-12T11:45:00',
        comments: 15,
        excerpt: 'Despite being written over a century ago, the themes of class struggle and personal identity remain...'
      }
    ]
  }
];

interface BookClub {
  id: string;
  name: string;
  description: string;
  members: number;
  currentBook: string;
  nextMeetingDate: string;
  isPublic: boolean;
  discussions: {
    id: string;
    title: string;
    author: string;
    date: string;
    comments: number;
    excerpt: string;
  }[];
}

interface CreateBookClubForm {
  name: string;
  description: string;
  bookId: string;
  meetingDate: string;
  isPublic: boolean;
}

const BookClubsPage: React.FC = () => {
  const [bookClubs, setBookClubs] = useState<BookClub[]>(sampleBookClubs);
  const [selectedClub, setSelectedClub] = useState<BookClub | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const allProducts = getAllProducts();
  
  const form = useForm<CreateBookClubForm>({
    defaultValues: {
      name: '',
      description: '',
      bookId: '',
      meetingDate: '',
      isPublic: true,
    }
  });

  const handleCreateBookClub = (data: CreateBookClubForm) => {
    const newBookClub: BookClub = {
      id: `club-${Date.now()}`,
      name: data.name,
      description: data.description,
      members: 1,
      currentBook: data.bookId,
      nextMeetingDate: data.meetingDate,
      isPublic: data.isPublic,
      discussions: []
    };
    
    setBookClubs([...bookClubs, newBookClub]);
    toast({
      title: "Success!",
      description: `${data.name} book club has been created.`,
    });
    form.reset();
  };
  
  const handleJoinBookClub = (clubId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to join book clubs.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: "You've joined the book club.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Book Clubs</h1>
            <p className="text-muted-foreground">Join a community of readers and discuss your favorite books</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <BookOpen className="mr-2 h-4 w-4" />
                Create Book Club
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create a New Book Club</DialogTitle>
                <DialogDescription>
                  Start your own reading community. Fill out the details below to create a new book club.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateBookClub)} className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Club Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Mystery Lovers Book Club" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell potential members what your book club is about..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bookId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Book</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            {...field}
                          >
                            <option value="">Select a book</option>
                            {allProducts.map(product => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="meetingDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Meeting Date</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Public Club</FormLabel>
                          <FormDescription>
                            Make your book club visible to all users
                          </FormDescription>
                        </div>
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">Create Book Club</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Book Clubs Navigation and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar with list of clubs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-amber-200 shadow-sm p-4 sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-amber-900">Popular Clubs</h2>
              
              {bookClubs.map(club => {
                const currentBook = allProducts.find(p => p.id === club.currentBook);
                
                return (
                  <div 
                    key={club.id}
                    className={`mb-4 p-3 rounded-md cursor-pointer transition-colors ${selectedClub?.id === club.id ? 'bg-amber-100 border-l-4 border-amber-600' : 'hover:bg-amber-50'}`}
                    onClick={() => setSelectedClub(club)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-amber-950">{club.name}</h3>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                        <Users className="inline h-3 w-3 mr-1" /> 
                        {club.members}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{club.description}</p>
                    {currentBook && (
                      <div className="mt-2 flex items-center text-xs text-amber-700">
                        <BookOpen className="h-3 w-3 mr-1" />
                        <span>Reading: {currentBook.name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
              
              <div className="mt-6">
                <Input 
                  type="text" 
                  placeholder="Search book clubs..."
                  className="bg-amber-50/50 border-amber-200"
                />
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-2">
            {selectedClub ? (
              <BookClubDetail 
                club={selectedClub}
                onJoin={() => handleJoinBookClub(selectedClub.id)}
                products={allProducts}
              />
            ) : (
              <div className="bg-white rounded-lg border border-amber-200 shadow-sm p-8 text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-amber-300" />
                <h2 className="text-2xl font-bold mb-2 text-amber-900">Welcome to Book Clubs</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Select a book club from the list to view discussions and details,
                  or create your own community of readers.
                </p>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Explore Featured Clubs
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface BookClubDetailProps {
  club: BookClub;
  onJoin: () => void;
  products: any[];
}

const BookClubDetail: React.FC<BookClubDetailProps> = ({ club, onJoin, products }) => {
  const [activeTab, setActiveTab] = useState('discussions');
  const currentBook = products.find(p => p.id === club.currentBook);
  const { toast } = useToast();
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  
  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Discussion created",
      description: "Your new discussion has been posted to the book club.",
    });
    
    setNewDiscussion({ title: '', content: '' });
  };
  
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-amber-900">{club.name}</CardTitle>
              <CardDescription className="mt-2">{club.description}</CardDescription>
            </div>
            <Button onClick={onJoin} className="bg-amber-600 hover:bg-amber-700">
              Join Club
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-4">
              <Users className="h-5 w-5 text-amber-700" />
              <div>
                <p className="text-sm font-medium text-amber-900">Members</p>
                <p className="text-muted-foreground">{club.members} readers</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-amber-700" />
              <div>
                <p className="text-sm font-medium text-amber-900">Next Meeting</p>
                <p className="text-muted-foreground">
                  {new Date(club.nextMeetingDate).toLocaleDateString()} at {new Date(club.nextMeetingDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          </div>
          
          {currentBook && (
            <div className="bg-amber-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2 flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-amber-700" />
                Currently Reading
              </h3>
              <div className="flex items-center space-x-4">
                <img 
                  src={currentBook.image} 
                  alt={currentBook.name} 
                  className="h-24 w-auto object-cover rounded"
                />
                <div>
                  <h4 className="font-medium">{currentBook.name}</h4>
                  {currentBook.author && <p className="text-sm text-amber-700">{currentBook.author}</p>}
                  <a href={`/product/${currentBook.id}`} className="text-xs text-amber-600 hover:underline mt-1 inline-block">
                    View Book Details
                  </a>
                </div>
              </div>
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-amber-100 border border-amber-200">
              <TabsTrigger value="discussions" onClick={() => setActiveTab('discussions')}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Discussions
              </TabsTrigger>
              <TabsTrigger value="members" onClick={() => setActiveTab('members')}>
                <Users className="h-4 w-4 mr-2" />
                Members
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="discussions" className="pt-6">
              <form onSubmit={handleCreateDiscussion} className="mb-6">
                <h3 className="text-lg font-medium mb-4">Start a New Discussion</h3>
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Discussion title"
                      value={newDiscussion.title}
                      onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                      className="mb-2"
                    />
                    <Textarea
                      placeholder="Share your thoughts or questions..."
                      value={newDiscussion.content}
                      onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Post Discussion
                  </Button>
                </div>
              </form>
              
              <h3 className="text-lg font-medium mb-4">Recent Discussions</h3>
              {club.discussions.map(discussion => (
                <Collapsible key={discussion.id} className="mb-4">
                  <div className="border border-amber-200 rounded-md overflow-hidden">
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-amber-50/60 hover:bg-amber-100/60">
                      <div>
                        <h4 className="font-medium">{discussion.title}</h4>
                        <div className="text-xs text-muted-foreground mt-1">
                          Started by {discussion.author} · {new Date(discussion.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full mr-2">
                          <MessageCircle className="inline h-3 w-3 mr-1" /> 
                          {discussion.comments}
                        </span>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="p-4 border-t border-amber-200">
                        <p className="text-sm mb-4">{discussion.excerpt}</p>
                        
                        <div className="flex justify-between items-center">
                          <Button variant="ghost" size="sm" className="text-amber-600">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm" className="text-amber-600">
                            <Share className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </TabsContent>
            
            <TabsContent value="members" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 border border-amber-100 rounded-md bg-amber-50/50">
                    <Avatar>
                      <AvatarFallback className="bg-amber-200 text-amber-800">
                        {String.fromCharCode(65 + i)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{i === 0 ? 'Book Club Admin' : `Member ${i}`}</p>
                      <p className="text-xs text-muted-foreground">Member since {new Date().getFullYear()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookClubsPage;
