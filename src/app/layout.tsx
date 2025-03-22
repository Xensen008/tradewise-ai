"use client"
import "@/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { AuthProvider } from "@/lib/hooks/use-auth";
import { Toaster } from "sonner";
import { usePathname, useRouter } from 'next/navigation';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App-sidebar";
import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect } from "react";

const metadata: Metadata = {
  title: "Tradewise AI - Smart Investing Platform",
  description: "AI-powered insights for retail investors",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

// Create a wrapper component for protected layout
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // If user is authenticated and on landing page, redirect to dashboard
      if (user && pathname === '/') {
        router.push('/dashboard');
      }
      // If user is not authenticated and trying to access protected routes
      // if (!user && pathname !== '/') {
      //   router.push('/');
      // }
    }
  }, [user, isLoading, pathname, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render layout based on authentication and route
  if (!user && pathname === '/') {
    // Landing page layout without sidebar
    return <main>{children}</main>;
  }

  // Protected routes layout with sidebar
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <AuthProvider>
          <Toaster />
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main>
//         <SidebarTrigger />
//         {children}
//       </main>
//     </SidebarProvider>
//   )
// }
