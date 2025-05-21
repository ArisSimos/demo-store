
import React from 'react';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { calculatePriceWithSubscription } from '@/data/subscriptionService';
import { useSubscription } from '@/context/SubscriptionContext';
import MembershipBenefits from '@/components/subscription/MembershipBenefits';

interface SubscriptionProductInfoProps {
  product: Product;
}

const SubscriptionProductInfo: React.FC<SubscriptionProductInfoProps> = ({ product }) => {
  const { currentTier, isSubscribed } = useSubscription();
  const regularPrice = product.salePrice || product.price;
  const memberPrice = calculatePriceWithSubscription(regularPrice, currentTier);
  const hasDiscount = isSubscribed && memberPrice < regularPrice;
  
  return (
    <div className="mt-4 space-y-2">
      <h2 className="font-medium text-xl">{product.name}</h2>
      
      {product.author && (
        <p className="text-gray-600 text-sm">by {product.author}</p>
      )}
      
      <div className="flex gap-2 flex-wrap">
        <Badge variant="outline">{product.category}</Badge>
        {product.format && <Badge variant="outline">{product.format}</Badge>}
      </div>
      
      <div className="pt-2">
        {hasDiscount ? (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">${memberPrice.toFixed(2)}</span>
            <span className="text-gray-500 line-through text-lg">${regularPrice.toFixed(2)}</span>
            <Badge className="bg-green-500">Member Price</Badge>
          </div>
        ) : (
          <span className="text-2xl font-bold">${regularPrice.toFixed(2)}</span>
        )}
      </div>
      
      {/* Membership benefits card */}
      <MembershipBenefits productPrice={regularPrice} />
    </div>
  );
};

export default SubscriptionProductInfo;
