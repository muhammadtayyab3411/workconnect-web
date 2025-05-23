import React from "react";
import { X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
  // No need to use the auth context logout function as we're handling logout manually
  // const { logout } = useAuth();

  const handleLogout = () => {
    // First close the dialog to avoid React router hooks issues
    onOpenChange(false);
    
    // Use a small timeout to ensure the dialog is closed
    setTimeout(() => {
      // First clear any auth data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
      
      // Then perform a hard navigation to login page
      window.location.href = '/auth/login';
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden rounded-lg">
        <DialogHeader className="p-6 pb-2">
          <div className="absolute right-4 top-4">
            <DialogClose asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-center">
              Logout Confirmation
            </DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription className="px-6 pb-2 text-center text-zinc-600 text-sm">
          Are you sure you want to logout from your account? 
          You will need to log back in to access your account.
        </DialogDescription>
        <DialogFooter className="p-6 pt-4 flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 border-zinc-200 text-zinc-800"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 