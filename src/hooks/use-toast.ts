
import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

export const useToast = () => {
  return {
    toast: (options: ToastOptions | string) => {
      if (typeof options === 'string') {
        // If it's just a string, treat it as the description
        return sonnerToast(options);
      } else {
        // Format the title and description to work with sonner
        const { title, description, action, variant } = options;
        
        // If we have both title and description, combine them
        if (title && description) {
          return sonnerToast(title, {
            description,
            action,
          });
        }
        
        // If we only have title, use it as the main message
        if (title) {
          return sonnerToast(title, { action });
        }
        
        // If we only have description, use it as the main message
        if (description) {
          return sonnerToast(description, { action });
        }
        
        // Fallback to an empty toast
        return sonnerToast("", { action });
      }
    },
    // This array helps maintain compatibility with the existing API
    toasts: [] as any[],
  };
};

// Export the direct sonnerToast function
export { sonnerToast as toast };
