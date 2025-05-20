
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/types';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface UseEmailReceiptProps {
  items: CartItem[];
  subtotal: number;
  grandTotal: number;
}

export const useEmailReceipt = ({ items, subtotal, grandTotal }: UseEmailReceiptProps) => {
  const { toast } = useToast();
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const sendReceiptEmail = async (recipientEmail: string) => {
    setIsSendingEmail(true);
    try {
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

  return {
    sendReceiptEmail,
    isSendingEmail
  };
};
