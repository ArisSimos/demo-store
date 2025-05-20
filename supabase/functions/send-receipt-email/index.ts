
// Follow these steps to enable this Edge Function in your Supabase project:
// 1. Go to your Supabase dashboard > Edge Functions
// 2. Click "New Function"
// 3. Name it "send-receipt-email"
// 4. Copy this code into the function
// 5. Add your SendGrid API key as a secret with: 
//    supabase secrets set SENDGRID_API_KEY=your_api_key_here

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

interface EmailRequestBody {
  email: string;
  orderDetails: {
    items: Array<{
      name: string;
      price: number;
      quantity: number;
    }>;
    subtotal: number;
    grandTotal: number;
  };
}

serve(async (req) => {
  try {
    const { email, orderDetails } = await req.json() as EmailRequestBody;
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Get the API key from environment variables
    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    
    if (!SENDGRID_API_KEY) {
      console.error("SENDGRID_API_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Format email content
    const items = orderDetails.items.map(item => 
      `${item.name} - ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}`
    ).join('\n');
    
    const emailContent = `
    Order Receipt
    -------------
    
    Items:
    ${items}
    
    Subtotal: $${orderDetails.subtotal.toFixed(2)}
    Total: $${orderDetails.grandTotal.toFixed(2)}
    
    Thank you for your purchase!
    `;
    
    // Send email using SendGrid API
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email }],
            subject: "Your Order Receipt",
          },
        ],
        from: { email: "noreply@yourbookstore.com", name: "Book Store" },
        content: [
          {
            type: "text/plain",
            value: emailContent,
          },
        ],
      }),
    });
    
    if (response.status >= 200 && response.status < 300) {
      return new Response(
        JSON.stringify({ success: true, message: "Email sent successfully" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      const errorData = await response.json();
      console.error("SendGrid API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: errorData }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
