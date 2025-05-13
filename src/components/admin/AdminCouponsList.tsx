
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { SAMPLE_COUPONS, Coupon } from './coupons/types';
import CouponTable from './coupons/CouponTable';
import DeleteCouponDialog from './coupons/DeleteCouponDialog';
import AddCouponDialog from './coupons/AddCouponDialog';
import SearchBar from './coupons/SearchBar';

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
      toast(`Coupon ${couponToDelete.code} has been removed.`, {
        description: "Coupon deleted successfully."
      });
    }
    setIsDeleteDialogOpen(false);
    setCouponToDelete(null);
  };

  const handleAddCoupon = () => {
    // Validate form
    if (!newCoupon.code || !newCoupon.discountValue || !newCoupon.expiryDate) {
      toast("Validation error", {
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
        code: newCoupon.code || '',
        discountType: newCoupon.discountType || 'percentage',
        discountValue: newCoupon.discountValue || 0,
        expiryDate: newCoupon.expiryDate || '',
        isActive: newCoupon.isActive || false
      }
    ]);
    
    setIsAddDialogOpen(false);
    toast(`Coupon ${newCoupon.code} has been created.`, {
      description: "New coupon created successfully."
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
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Coupon
        </Button>
      </div>

      <CouponTable 
        coupons={filteredCoupons}
        onDeleteCoupon={handleDeleteCoupon}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteCouponDialog 
        coupon={couponToDelete}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={confirmDelete}
      />

      {/* Add Coupon Dialog */}
      <AddCouponDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newCoupon={newCoupon}
        setNewCoupon={setNewCoupon}
        onAddCoupon={handleAddCoupon}
      />
    </div>
  );
};

export default AdminCouponsList;
