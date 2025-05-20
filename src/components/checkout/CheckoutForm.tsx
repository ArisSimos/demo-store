
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface CheckoutFormProps {
  email: string;
  setEmail: (email: string) => void;
  sendReceipt: boolean;
  setSendReceipt: (checked: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
  grandTotal: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  email,
  setEmail,
  sendReceipt,
  setSendReceipt,
  handleSubmit,
  isProcessing,
  grandTotal
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <Input required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <Input required />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Address</label>
          <Input required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <Input required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <Input required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ZIP Code</label>
            <Input required />
          </div>
        </div>
        
        {/* Email for Receipt */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input 
            type="email" 
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={sendReceipt}
          />
        </div>
        
        <div className="flex items-center space-x-2 mb-6">
          <Checkbox 
            id="sendReceipt" 
            checked={sendReceipt} 
            onCheckedChange={(checked) => setSendReceipt(checked === true)}
          />
          <label 
            htmlFor="sendReceipt" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Send me a receipt by email
          </label>
        </div>
        
        <h2 className="text-lg font-semibold mb-4 mt-8">Payment Information</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <Input placeholder="**** **** **** ****" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Expiration Date</label>
            <Input placeholder="MM/YY" required />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">CVC</label>
            <Input placeholder="123" required />
          </div>
        </div>
        <Button 
          type="submit" 
          className="w-full mt-6" 
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Pay ${grandTotal.toFixed(2)}
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
