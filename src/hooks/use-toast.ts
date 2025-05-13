
import { toast as sonnerToast, type Toast as SonnerToast } from "sonner";

type ToastOptions = {
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

export const useToast = () => {
  return {
    toast: (options: SonnerToast | string | ToastOptions) => {
      if (typeof options === 'string') {
        return sonnerToast(options);
      } else if ('title' in options) {
        // It's a SonnerToast object
        return sonnerToast(options);
      } else {
        // It's our custom ToastOptions
        return sonnerToast(options.description || '', {
          action: options.action,
        });
      }
    },
    // This array helps maintain compatibility with the existing API
    toasts: [] as any[],
  };
};

// Export the direct sonnerToast function
export { sonnerToast as toast };
