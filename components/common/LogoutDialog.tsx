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
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout actions here
    // For now, we'll just redirect to login page
    router.push("/auth/login");
    onOpenChange(false);
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
        <div className="px-6 pb-2">
          <p className="text-center text-zinc-600 text-sm">
            Are you sure you want to logout from your account? 
            You will need to log back in to access your account.
          </p>
        </div>
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