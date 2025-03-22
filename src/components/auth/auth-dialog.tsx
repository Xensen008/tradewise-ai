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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/client";
import { Phone } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function AuthDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
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
  };

  const handlePhoneSignIn = async () => {
    if (!phoneNumber) {
      toast.error("Please enter a phone number");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      toast.error("Failed to send verification code");
      console.error(error);
    } else {
      toast.success("Verification code sent!");
      setShowVerification(true);
    }
  };

  const verifyCode = async () => {
    if (!verificationCode) {
      toast.error("Please enter the verification code");
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: verificationCode,
      type: "sms",
    });

    if (error) {
      toast.error("Invalid verification code");
      console.error(error);
    } else {
      toast.success("Successfully signed in!");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in to Tradewise AI</DialogTitle>
          <DialogDescription>
            Choose your preferred method to sign in or create an account.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="google" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          <TabsContent value="google" className="mt-4">
            <Button
              className="w-full"
              variant="outline"
              onClick={handleGoogleSignIn}
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Continue with Google
            </Button>
          </TabsContent>
          <TabsContent value="phone" className="mt-4">
            {!showVerification ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="phone"
                      placeholder="+1234567890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={handlePhoneSignIn}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Send Code
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    placeholder="Enter code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={verifyCode}
                >
                  Verify Code
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 