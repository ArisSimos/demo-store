
import React from 'react';
import { Ticket, Percent, Calendar, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { coupons } from '@/data/products';
import { categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CouponsPage: React.FC = () => {
  const { toast } = useToast();
  
  const getCategoryNames = (categoryIds: string[] | undefined) => {
    if (!categoryIds || categoryIds.length === 0) {
      return 'All categories';
    }
    
    return categoryIds.map(id => {
      const category = categories.find(cat => cat.id === id);
      return category ? category.name : id;
    }).join(', ');
  };
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied to clipboard",
      description: `Coupon code ${code} is ready to use`
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Available Coupons</h1>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Subscribe for Special Offers
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map(coupon => (
              <div 
                key={coupon.code} 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-muted"
              >
                <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Ticket className="mr-2 h-5 w-5" />
                    <span className="text-lg font-bold">{coupon.code}</span>
                  </div>
                  <span className="text-sm bg-background text-foreground px-2 py-1 rounded">
                    {coupon.discountType === 'percentage' 
                      ? `${coupon.discountValue}% OFF` 
                      : `$${coupon.discountValue} OFF`}
                  </span>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Details:</p>
                    <ul className="text-sm space-y-1">
                      {coupon.minOrderValue && (
                        <li>Minimum order: ${coupon.minOrderValue.toFixed(2)}</li>
                      )}
                      {coupon.maxDiscountAmount && (
                        <li>Max discount: ${coupon.maxDiscountAmount.toFixed(2)}</li>
                      )}
                      {coupon.validUntil && (
                        <li className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          Valid until: {coupon.validUntil}
                        </li>
                      )}
                      <li>Applicable to: {getCategoryNames(coupon.applicableCategories)}</li>
                    </ul>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleCopyCode(coupon.code)}
                  >
                    Copy Code
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-muted/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Percent className="mr-2 h-6 w-6" />
              Special Bulk Discounts
            </h2>
            <p className="mb-6">Save more by buying multiple copies of the same book:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-md shadow">
                <h3 className="font-bold mb-2">The Midnight Library</h3>
                <p>Buy 3+ copies and get 10% off!</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow">
                <h3 className="font-bold mb-2">Atomic Habits</h3>
                <p>Buy 2+ copies and get 15% off!</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow">
                <h3 className="font-bold mb-2">The Very Hungry Caterpillar</h3>
                <p>Buy 5+ copies and get 20% off!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CouponsPage;
