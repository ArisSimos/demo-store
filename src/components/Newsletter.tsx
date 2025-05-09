
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface NewsletterProps {
  variant?: 'default' | 'inline' | 'footer';
}

const Newsletter: React.FC<NewsletterProps> = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail('');
      toast({
        title: 'Success!',
        description: 'You have been subscribed to our newsletter.',
      });
    }, 1000);
  };
  
  if (variant === 'footer') {
    return (
      <div className="w-full">
        <h3 className="font-semibold mb-2">Subscribe to our newsletter</h3>
        <p className="text-sm text-muted-foreground mb-4">Get the latest updates and special offers</p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background/80"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    );
  }
  
  if (variant === 'inline') {
    return (
      <div className="p-4 bg-primary/10 rounded-lg flex items-center">
        <div className="flex-grow mr-4">
          <h4 className="font-medium">Newsletter</h4>
          <p className="text-sm text-muted-foreground">Subscribe for updates and offers</p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? '...' : 'Join'}
          </Button>
        </form>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className="bg-muted py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Join Our Newsletter</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Stay updated with the latest releases, author interviews, and exclusive offers.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex space-x-2">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
