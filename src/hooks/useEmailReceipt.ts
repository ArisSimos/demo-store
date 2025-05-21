
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/types';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables and failsafe checks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create client only if we have valid values
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useEmailReceipt = () => {
  const { toast } = useToast();
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  const sendReceiptEmail = async (
    recipientEmail: string, 
    items: CartItem[], 
    subtotal: number, 
    grandTotal: number
  ) => {
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
  
  return { sendReceiptEmail, isSendingEmail };
};
