
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEmailReceipt } from '@/hooks/useEmailReceipt';
import CheckoutComplete from '@/components/checkout/CheckoutComplete';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

const CheckoutPage: React.FC = () => {
  const { items, subtotal, grandTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [email, setEmail] = useState('');
  const [sendReceipt, setSendReceipt] = useState(true);
  
  const { sendReceiptEmail } = useEmailReceipt({ items, subtotal, grandTotal });
  
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
        const emailSent = await sendReceiptEmail(email);
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
          <CheckoutComplete email={email} sendReceipt={sendReceipt} />
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
              <CheckoutForm 
                email={email}
                setEmail={setEmail}
                sendReceipt={sendReceipt}
                setSendReceipt={setSendReceipt}
                handleSubmit={handleSubmit}
                isProcessing={isProcessing}
                grandTotal={grandTotal}
              />
            </div>

            <div>
              <OrderSummary 
                items={items}
                subtotal={subtotal}
                grandTotal={grandTotal}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
