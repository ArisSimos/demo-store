import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CheckoutFormProps {
  email: string;
  setEmail: (email: string) => void;
  sendReceipt: boolean;
  setSendReceipt: (sendReceipt: boolean) => void;
  isProcessing: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  grandTotal: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  email,
  setEmail,
  sendReceipt,
  setSendReceipt,
  isProcessing,
  onSubmit,
  grandTotal
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  // Handlers for numeric inputs
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  // Format card number with spaces after every 4 digits
  const formatCardNumber = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/(\d{4})/g, '$1 ').trim();
    return formattedValue;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatCardNumber(inputValue);
    setCardNumber(formattedValue);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
      <form onSubmit={onSubmit}>
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
            <Input 
              required 
              pattern="[0-9]*"
              inputMode="numeric" 
              onInput={handleNumberInput}
            />
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
          <Input 
            placeholder="**** **** **** ****"
            required
            pattern="[0-9 ]*" // Allow numbers and spaces
            inputMode="numeric"
            maxLength={19} // Max length with spaces
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">Expiration Date</label>
            <DatePicker
              selected={expiryDate}
              onChange={(date: Date | null) => setExpiryDate(date)}
              dateFormat="MM/yy"
              showMonthYearPicker
              showFullMonthYearPicker
              placeholderText="MM/YY"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1">CVC</label>
            <Input 
              placeholder="123" 
              required 
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={4}
              onInput={handleNumberInput}
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full mt-6" 
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center">
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
