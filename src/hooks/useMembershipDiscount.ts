import { useSubscription } from "@/context/SubscriptionContext";
import { CartItem } from "@/types";

/**
 * Calculates the total membership discount for the given cart items.
 * Only applies to non-rental, non-membership items.
 */
export function useMembershipDiscount(items: CartItem[]): number {
  const { isSubscribed, benefits } = useSubscription();

  if (!isSubscribed || !benefits.discountPercentage) return 0;

  return items.reduce((total, item) => {
    // Only apply discount to purchases (not rentals or memberships)
    if (!item.isRental && !item.isMembership) {
      const price = item.product.salePrice || item.product.price;
      return total + (price * item.quantity * (benefits.discountPercentage / 100));
    }
    return total;
  }, 0);
}
