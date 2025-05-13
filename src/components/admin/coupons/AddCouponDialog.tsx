
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Coupon } from './types';

interface AddCouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newCoupon: Partial<Coupon>;
  setNewCoupon: React.Dispatch<React.SetStateAction<Partial<Coupon>>>;
  onAddCoupon: () => void;
}

const AddCouponDialog: React.FC<AddCouponDialogProps> = ({
  open,
  onOpenChange,
  newCoupon,
  setNewCoupon,
  onAddCoupon
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onAddCoupon}>Create Coupon</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCouponDialog;
