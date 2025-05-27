import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface EmailParams {
  to: { email: string; name?: string }[];
  subject: string;
  text: string;
}

export const useMailerSend = () => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const apiKey = import.meta.env.VITE_MAILERSEND_API_KEY;
  const fromEmail = import.meta.env.VITE_MAILERSEND_FROM_EMAIL;
  const fromName = import.meta.env.VITE_MAILERSEND_FROM_NAME;

  const sendEmail = async (emailParams: EmailParams): Promise<boolean> => {
    setIsSending(true);
    try {
      if (!apiKey) {
        console.error('MailerSend API key is missing.');
        toast({
          title: 'Missing API Key',
          description: 'MailerSend API key is not configured. Please check your environment variables.',
          variant: 'destructive',
        });
        return false;
      }

      if (!fromEmail || !fromName) {
        console.error('MailerSend From Email or Name is missing.');
        toast({
          title: 'Missing Sender Info',
          description: 'MailerSend From Email or Name is not configured. Please check your environment variables.',
          variant: 'destructive',
        });
        return false;
      }

      const response = await fetch('https://api.mailersend.com/v1/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: {
            email: fromEmail,
            name: fromName,
          },
          to: emailParams.to,
          subject: emailParams.subject,
          text: emailParams.text,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('MailerSend API Error:', errorData);
        toast({
          title: 'Failed to send email',
          description: `MailerSend API error: ${response.statusText}`,
          variant: 'destructive',
        });
        return false;
      }

      console.log('Email sent successfully');
      toast({
        title: 'Email sent successfully',
        description: `Email sent to ${emailParams.to.map(t => t.email).join(', ')}`,
      });
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Failed to send email',
        description: 'An unexpected error occurred while sending the email.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSending(false);
    }
  };

  return { sendEmail, isSending };
};
