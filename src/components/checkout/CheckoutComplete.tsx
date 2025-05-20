
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CheckoutCompleteProps {
  email: string;
  sendReceipt: boolean;
}

const CheckoutComplete: React.FC<CheckoutCompleteProps> = ({ email, sendReceipt }) => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
          {sendReceipt && email && (
            <span className="block mt-2">
              <Mail className="inline-block w-4 h-4 mr-1" />
              A receipt has been sent to {email}
            </span>
          )}
        </p>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutComplete;
