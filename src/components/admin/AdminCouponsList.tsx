
import React, { useState } from 'react';
import { Coupon, Trash2, Edit, Calendar, Percent } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { coupons as mockCoupons } from '@/data/products';

const AdminCouponsList = () => {
  const [coupons, setCoupons] = useState([...mockCoupons]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<string | null>(null);
  const [addCouponOpen, setAddCouponOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      code: '',
      discountValue: 0,
      discountType: 'percentage',
      validUntil: '',
      minOrderValue: 0,
    }
  });

  const filteredCoupons = coupons.filter(coupon => 
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCoupon = (couponCode: string) => {
    setCouponToDelete(couponCode);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (couponToDelete) {
      setCoupons(coupons.filter(coupon => coupon.code !== couponToDelete));
      toast({
        title: "Coupon deleted",
        description: "The coupon has been successfully removed.",
      });
      setDeleteConfirmOpen(false);
      setCouponToDelete(null);
    }
  };

  const onSubmit = (data: any) => {
    const newCoupon = {
      code: data.code.toUpperCase(),
      discountType: data.discountType as 'percentage' | 'fixed',
      discountValue: Number(data.discountValue),
      validUntil: data.validUntil ? new Date(data.validUntil).toISOString() : undefined,
      minOrderValue: data.minOrderValue ? Number(data.minOrderValue) : undefined
    };

    setCoupons([...coupons, newCoupon]);
    toast({
      title: "Coupon created",
      description: `${newCoupon.code} has been added to the system.`,
    });
    setAddCouponOpen(false);
    form.reset();
  };

  return (
    <div>
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Manage Coupons</CardTitle>
              <CardDescription>
                Create, edit, and remove discount coupons.
              </CardDescription>
            </div>
            <Button onClick={() => setAddCouponOpen(true)}>
              Add New Coupon
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <Input
              placeholder="Search coupons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon) => (
                <div key={coupon.code} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-lg flex items-center">
                      <Coupon className="h-4 w-4 mr-2" />
                      {coupon.code}
                    </h3>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm mb-3">
                    <p className="flex items-center text-muted-foreground">
                      <Percent className="h-4 w-4 mr-1" />
                      {coupon.discountType === 'percentage' ? 'Percentage discount' : 'Fixed amount discount'}
                    </p>
                    
                    {coupon.validUntil && (
                      <p className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Valid until: {new Date(coupon.validUntil).toLocaleDateString()}
                      </p>
                    )}
                    
                    {coupon.minOrderValue && (
                      <p className="text-muted-foreground">
                        Min. order: ${coupon.minOrderValue.toFixed(2)}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 justify-end mt-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteCoupon(coupon.code)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full py-4 text-center text-muted-foreground">No coupons found matching your search criteria.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this coupon? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Coupon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Coupon Dialog */}
      <Dialog open={addCouponOpen} onOpenChange={setAddCouponOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Coupon</DialogTitle>
            <DialogDescription>
              Add a new coupon code for customer discounts.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="SUMMER20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="discountValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Value</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min={0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="percentage">Percentage (%)</option>
                          <option value="fixed">Fixed Amount ($)</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="validUntil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valid Until (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minOrderValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Value (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Create Coupon</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCouponsList;
