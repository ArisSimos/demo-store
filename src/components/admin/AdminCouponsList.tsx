
import React, { useState } from 'react';
import { Search, Trash2, Plus, Ticket } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

// Sample coupon data structure (replace with your actual data)
interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expiryDate: string;
  isActive: boolean;
}

const SAMPLE_COUPONS: Coupon[] = [
  { 
    id: '1', 
    code: 'SUMMER20', 
    discountType: 'percentage', 
    discountValue: 20, 
    expiryDate: '2025-08-31',
    isActive: true
  },
  { 
    id: '2', 
    code: 'WELCOME10', 
    discountType: 'fixed', 
    discountValue: 10, 
    expiryDate: '2025-12-31',
    isActive: true
  },
  { 
    id: '3', 
    code: 'FLASH25', 
    discountType: 'percentage', 
    discountValue: 25, 
    expiryDate: '2025-06-01',
    isActive: false
  }
];

const AdminCouponsList = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(SAMPLE_COUPONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({
    code: '',
    discountType: 'percentage',
    discountValue: 10,
    expiryDate: '',
    isActive: true
  });

  // Filter coupons based on search query
  const filteredCoupons = coupons.filter(coupon => 
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteCoupon = (coupon: Coupon) => {
    setCouponToDelete(coupon);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (couponToDelete) {
      // In a real application, you would call an API to delete the coupon
      setCoupons(coupons.filter(c => c.id !== couponToDelete.id));
      toast({
        title: "Coupon deleted",
        description: `Coupon ${couponToDelete.code} has been removed.`
      });
    }
    setIsDeleteDialogOpen(false);
    setCouponToDelete(null);
  };

  const handleAddCoupon = () => {
    // Validate form
    if (!newCoupon.code || !newCoupon.discountValue || !newCoupon.expiryDate) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields."
      });
      return;
    }

    // In a real application, you would call an API to add the coupon
    const id = `temp-${Date.now()}`;
    setCoupons([
      ...coupons, 
      { 
        id, 
        code: newCoupon.code,
        discountType: newCoupon.discountType || 'percentage',
        discountValue: newCoupon.discountValue || 0,
        expiryDate: newCoupon.expiryDate || '',
        isActive: newCoupon.isActive || false
      }
    ]);
    
    setIsAddDialogOpen(false);
    toast({
      title: "Coupon created",
      description: `Coupon ${newCoupon.code} has been created.`
    });
    
    // Reset form
    setNewCoupon({
      code: '',
      discountType: 'percentage',
      discountValue: 10,
      expiryDate: '',
      isActive: true
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search coupons..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Coupon
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No coupons found
                </TableCell>
              </TableRow>
            ) : (
              filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>
                    {coupon.discountType === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                  </TableCell>
                  <TableCell>
                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                  </TableCell>
                  <TableCell>{new Date(coupon.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={coupon.isActive ? "default" : "outline"}
                      className={coupon.isActive ? "bg-green-500" : ""}
                    >
                      {coupon.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteCoupon(coupon)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Coupon</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the coupon "{couponToDelete?.code}"? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Coupon Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Coupon</DialogTitle>
            <DialogDescription>
              Create a new discount coupon for your customers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="code" className="text-right">Code</label>
              <Input 
                id="code" 
                className="col-span-3" 
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                placeholder="e.g., SUMMER25"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Type</label>
              <div className="col-span-3 flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={newCoupon.discountType === 'percentage'}
                    onChange={() => setNewCoupon({...newCoupon, discountType: 'percentage'})}
                  />
                  <span>Percentage</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    checked={newCoupon.discountType === 'fixed'}
                    onChange={() => setNewCoupon({...newCoupon, discountType: 'fixed'})}
                  />
                  <span>Fixed Amount</span>
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="value" className="text-right">Value</label>
              <div className="col-span-3 flex items-center">
                {newCoupon.discountType === 'fixed' && <span className="mr-2">$</span>}
                <Input 
                  id="value" 
                  type="number" 
                  value={newCoupon.discountValue?.toString() || ''}
                  onChange={(e) => setNewCoupon({...newCoupon, discountValue: parseFloat(e.target.value)})}
                />
                {newCoupon.discountType === 'percentage' && <span className="ml-2">%</span>}
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="expiry" className="text-right">Expiry Date</label>
              <Input 
                id="expiry" 
                type="date" 
                className="col-span-3"
                value={newCoupon.expiryDate}
                onChange={(e) => setNewCoupon({...newCoupon, expiryDate: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Status</label>
              <div className="col-span-3 flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={newCoupon.isActive}
                  onChange={(e) => setNewCoupon({...newCoupon, isActive: e.target.checked})}
                />
                <label htmlFor="isActive">Active</label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCoupon}>Create Coupon</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCouponsList;
