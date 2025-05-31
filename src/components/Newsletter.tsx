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
      const res = await fetch('/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emails: [email],
          subject: 'Newsletter Subscription',
          content: `<p>User <strong>${email}</strong> subscribed to the newsletter.</p>`
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmail('');
        toast({
          title: 'Subscription successful!',
          description: data.message || 'You are now subscribed to our newsletter.',
        });
      } else {
        toast({
          title: 'Subscription failed',
          description: data.error || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Network error',
        description: 'Could not connect to the server.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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