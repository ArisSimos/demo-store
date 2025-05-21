import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Check, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables and failsafe checks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create client only if we have valid values
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CheckoutPage: React.FC = () => {
  const { items, subtotal, grandTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [email, setEmail] = useState('');
  const [sendReceipt, setSendReceipt] = useState(true);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  const sendReceiptEmail = async (recipientEmail: string, orderDetails: any) => {
    setIsSendingEmail(true);
    try {
      // Check if Supabase has been properly configured
      if (supabaseUrl === 'https://placeholder-url.supabase.co') {
        console.error('Supabase URL is not properly configured');
        toast({
          title: "Configuration Error",
          description: "Email service is not properly configured. Please check your Supabase settings.",
          variant: "destructive",
        });
        return false;
      }
      
      // Call the Supabase Edge Function to send the email
      const { data, error } = await supabase.functions.invoke('send-receipt-email', {
        body: {
          email: recipientEmail,
          orderDetails: {
            items: items.map(item => ({
              name: item.product.name,
              price: item.product.salePrice || item.product.price,
              quantity: item.quantity
            })),
            subtotal,
            grandTotal
          }
        }
      });
      
      if (error) {
        console.error('Error sending email:', error);
        toast({
          title: "Failed to send email",
          description: "There was an error sending your receipt. Please contact support.",
          variant: "destructive",
        });
        return false;
      }
      
      console.log('Email sent successfully:', data);
      return true;
    } catch (err) {
      console.error('Exception sending email:', err);
      toast({
        title: "Failed to send email",
        description: "There was an error sending your receipt. Please contact support.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSendingEmail(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (sendReceipt && !email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive a receipt",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Send real email if user requested it
      if (sendReceipt && email) {
        const emailSent = await sendReceiptEmail(email, items);
        if (emailSent) {
          toast({
            title: "Receipt Sent",
            description: `A receipt has been sent to ${email}`
          });
        }
      }
      
      clearCart();
      
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!",
      });
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
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
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/cart" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to cart
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
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
            </div>

            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between">
                      <div>
                        <span className="font-medium">{item.quantity} x </span>
                        <span>{item.product.name}</span>
                      </div>
                      <span>${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {subtotal !== grandTotal && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount</span>
                      <span>-${(subtotal - grandTotal).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
