
import { toast as sonnerToast } from "sonner";
import type { ToastProps } from "@/components/ui/toast";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
};

export const useToast = () => {
  return {
    toast: (options: ToastOptions) => {
      return sonnerToast(options.title, {
        description: options.description,
        action: options.action,
      });
    },
    // This array helps maintain compatibility with the existing API
    toasts: [] as ToastProps[],
  };
};

export { sonnerToast as toast };

