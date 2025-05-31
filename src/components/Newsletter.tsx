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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setEmail('');
        toast({
          title: 'Success!',
          description: 'You have been subscribed to our newsletter.',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to subscribe. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
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
