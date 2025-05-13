
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/toast"
import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  // Use SonnerToaster directly
  return <SonnerToaster position="bottom-right" />
}
