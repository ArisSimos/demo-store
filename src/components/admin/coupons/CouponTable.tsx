
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Coupon } from './types';

interface CouponTableProps {
  coupons: Coupon[];
  onDeleteCoupon: (coupon: Coupon) => void;
}

const CouponTable: React.FC<CouponTableProps> = ({ 
  coupons, 
  onDeleteCoupon 
}) => {
  return (
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
          {coupons.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No coupons found
              </TableCell>
            </TableRow>
          ) : (
            coupons.map((coupon) => (
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
                    onClick={() => onDeleteCoupon(coupon)}
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
  );
};

export default CouponTable;
