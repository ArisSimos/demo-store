import React, { useState } from 'react';
import { Check, X, CreditCard, Calendar, BookHeart, Truck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/context/SubscriptionContext';
import { useAuth } from '@/context/AuthContext';
import { getPlansByBillingCycle } from '@/data/subscriptionService';
import { SubscriptionPlan } from '@/types/subscription';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { userSubscription, isSubscribed, currentTier, subscribe, cancelSubscription } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const plans = getPlansByBillingCycle(billingCycle);
  
  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to subscribe to a plan",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Redirect to checkout with the plan ID as a query parameter
    navigate(`/checkout?plan=${plan.id}`);
  };
  
  const handleCancel = async () => {
    if (!isSubscribed) return;
    
    setIsProcessing(true);
    const success = await cancelSubscription();
    setIsProcessing(false);
    
    if (success) {
      toast({
        title: "Subscription Canceled",
        description: "Your subscription has been canceled successfully",
      });
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">BookHaven Membership</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enhance your reading experience with exclusive benefits, discounts on books, free rentals, and more.
            </p>
          </div>
          
          {isSubscribed && (
            <Card className="mb-12 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Your Current Subscription
                  <Badge variant="default" className="ml-2">ACTIVE</Badge>
                </CardTitle>
                <CardDescription>
                  You're currently on the {userSubscription?.tier.charAt(0).toUpperCase()}{userSubscription?.tier.slice(1)} plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <p className="font-medium">Subscription Details:</p>
                    <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
                      <li>Active until: {new Date(userSubscription?.endDate || '').toLocaleDateString()}</li>
                      <li>Auto-renewal: {userSubscription?.autoRenew ? 'Enabled' : 'Disabled'}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleCancel} disabled={isProcessing}>
                  Cancel Subscription
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="flex justify-center mb-8">
            <Tabs defaultValue="monthly" className="w-full max-w-3xl" onValueChange={(v) => setBillingCycle(v as 'monthly' | 'yearly')}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="monthly">Bill Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Bill Yearly <Badge variant="secondary" className="ml-2">Save up to 17%</Badge></TabsTrigger>
              </TabsList>
              <TabsContent value="monthly">
                <div className="grid gap-8 md:grid-cols-3">
                  {plans.map((plan) => (
                    <SubscriptionPlanCard
                      key={plan.id}
                      plan={plan}
                      isCurrentPlan={isSubscribed && currentTier === plan.tier}
                      onSubscribe={() => handleSubscribe(plan)}
                      isProcessing={isProcessing}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="yearly">
                <div className="grid gap-8 md:grid-cols-3">
                  {plans.map((plan) => (
                    <SubscriptionPlanCard
                      key={plan.id}
                      plan={plan}
                      isCurrentPlan={isSubscribed && currentTier === plan.tier}
                      onSubscribe={() => handleSubscribe(plan)}
                      isProcessing={isProcessing}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Membership Benefits</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <BenefitCard
                icon={<BookHeart className="h-10 w-10 text-primary" />}
                title="Free Book Rentals"
                description="Get free book rentals every month depending on your subscription tier."
              />
              <BenefitCard
                icon={<CreditCard className="h-10 w-10 text-primary" />}
                title="Exclusive Discounts"
                description="Enjoy discounts on all book purchases, from 5% up to 15% off."
              />
              <BenefitCard
                icon={<Truck className="h-10 w-10 text-primary" />}
                title="Free Shipping"
                description="Premium and Ultimate members get free shipping on all orders, with no minimum purchase."
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan: boolean;
  onSubscribe: () => void;
  isProcessing: boolean;
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({ 
  plan, isCurrentPlan, onSubscribe, isProcessing 
}) => {
  return (
    <Card className={`flex flex-col h-full ${plan.popular ? 'border-primary shadow-md' : ''} ${
      isCurrentPlan ? 'bg-primary/5 border-primary/40' : ''
    }`}>
      {plan.popular && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">
            /{plan.billingCycle === 'monthly' ? 'month' : 'year'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={onSubscribe} 
          disabled={isProcessing || isCurrentPlan}
          variant={isCurrentPlan ? "outline" : "default"}
        >
          {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
        </Button>
      </CardFooter>
    </Card>
  );
};

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default SubscriptionPage;
