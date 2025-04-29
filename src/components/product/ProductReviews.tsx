
import React, { useState } from 'react';
import { Star, MessageSquare, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
}

const demoReviews: Record<string, Review[]> = {
  '1': [
    {
      id: '1',
      userName: 'John Doe',
      rating: 5,
      comment: 'This book changed my perspective on life. The way the author describes the library between life and death is fascinating.',
      date: '2023-12-15'
    },
    {
      id: '2',
      userName: 'Sarah Jones',
      rating: 4,
      comment: 'Well-written story with interesting concepts. The ending was a bit predictable but overall a great read.',
      date: '2023-11-03'
    }
  ],
  '2': [
    {
      id: '1',
      userName: 'Michael Smith',
      rating: 5,
      comment: 'This book has truly transformed my daily habits. The techniques are practical and easy to implement.',
      date: '2024-01-20'
    }
  ],
  '4': [
    {
      id: '1',
      userName: 'Emily Clark',
      rating: 5,
      comment: 'Andy Weir has done it again! The science is fascinating and the story keeps you on the edge of your seat.',
      date: '2023-10-05'
    },
    {
      id: '2',
      userName: 'Robert Johnson',
      rating: 4,
      comment: 'Great plot and characters. The scientific explanations are detailed but never boring.',
      date: '2024-02-12'
    }
  ],
  '7': [
    {
      id: '1',
      userName: 'Patricia Wilson',
      rating: 5,
      comment: 'Michelle Obama\'s narration adds so much to this already powerful book. Hearing her tell her own story is inspiring.',
      date: '2023-09-18'
    }
  ]
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState<Review[]>(demoReviews[productId] || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (!newReview.trim()) {
      toast({
        title: "Error",
        description: "Please enter a review comment",
        variant: "destructive"
      });
      return;
    }

    const review: Review = {
      id: `user-${Date.now()}`,
      userName: "You",
      rating,
      comment: newReview,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewReview('');
    setRating(5);
    setShowReviewForm(false);
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!"
    });
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="mt-16 mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <MessageSquare className="mr-2" /> 
        Customer Reviews {reviews.length > 0 && `(${reviews.length})`}
      </h2>
      
      {!showReviewForm && (
        <Button 
          onClick={() => setShowReviewForm(true)} 
          className="mb-6"
          variant="outline"
        >
          <MessageSquarePlus className="mr-2" /> Write a Review
        </Button>
      )}
      
      {showReviewForm && (
        <div className="bg-muted/30 p-4 rounded-lg mb-8">
          <h3 className="font-semibold mb-3">Write Your Review</h3>
          
          <div className="mb-4">
            <p className="mb-1">Rating:</p>
            <div className="flex space-x-1">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-6 w-6 cursor-pointer ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  onClick={() => setRating(i + 1)} 
                />
              ))}
            </div>
          </div>
          
          <Textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Share your thoughts about this product..."
            className="mb-4"
            rows={4}
          />
          
          <div className="flex space-x-2">
            <Button onClick={handleSubmitReview}>Submit Review</Button>
            <Button 
              variant="outline" 
              onClick={() => setShowReviewForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center mb-2">
                <div className="flex mr-2">
                  {renderStars(review.rating)}
                </div>
                <span className="font-semibold">{review.userName}</span>
                <span className="text-muted-foreground text-sm ml-2">
                  {review.date}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
