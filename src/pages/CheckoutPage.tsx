import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import CheckoutComplete from '@/components/checkout/CheckoutComplete';
import { CartItem } from '@/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CheckoutPage: React.FC = () => {
  const { items, subtotal, grandTotal, clearCart, bulkDiscountTotal, membershipDiscountTotal, couponDiscount } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [email, setEmail] = useState('');
  const [sendReceipt, setSendReceipt] = useState(false);
  const [completedItems, setCompletedItems] = useState<CartItem[]>([]);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

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

    setCompletedItems([...items]);

    setTimeout(async () => {
      setIsProcessing(false);
      setIsComplete(true);

      // Send real email if user requested it
      if (sendReceipt && email) {
        try {
          // Compose product names and order IDs for the email
          const productNames = items.map((item) => item.product.name).join(', ');
          const orderIds = items.map((item) => item.product.isbn ?? '').join(', ');

          // Call your backend API to send the purchase email
          const response = await fetch('/api/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              productName: productNames,
              orderId: orderIds, // or use a single order ID if you have one for the whole order
            })
          });
          if (response.ok) {
            toast({
              title: "Receipt Sent",
              description: `A receipt has been sent to ${email}`
            });
          } else {
            toast({
              title: "Receipt Failed",
              description: `Failed to send receipt to ${email}`
            });
          }
        } catch (err) {
          toast({
            title: "Email Failed",
            description: "Could not send receipt email.",
            variant: "destructive"
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
      <CheckoutComplete 
        email={email} 
        sendReceipt={sendReceipt}
        items={completedItems}
      />
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
                isProcessing={isProcessing}
                onSubmit={handleSubmit}
                grandTotal={grandTotal}
              />
            </div>

            <div>
              <OrderSummary 
                items={items}
                subtotal={subtotal}
                grandTotal={grandTotal}
                bulkDiscountTotal={bulkDiscountTotal}
                membershipDiscountTotal={membershipDiscountTotal}
                couponDiscount={couponDiscount}
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
