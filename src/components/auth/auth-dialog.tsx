"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

export function AuthDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error("Failed to sign in with Google");
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border border-emerald-100 shadow-glow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Welcome to Tradewise AI
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Sign in to access your personalized investment insights
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Button
            variant="outline"
            className="w-full border-emerald-200 hover:bg-emerald-50 text-gray-700 h-14 text-lg font-medium relative overflow-hidden transition-all hover:shadow-md"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            <FcGoogle className="mr-3 h-6 w-6" />
            {loading ? "Signing in..." : "Continue with Google"}
          </Button>

          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-emerald-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-emerald-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
} 