import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { AuthProvider } from "@/lib/hooks/use-auth";
import { Toaster } from "sonner";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App-sidebar";
export const metadata: Metadata = {
  title: "Tradewise AI - Smart Investing Platform",
  description: "AI-powered insights for retail investors",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <AuthProvider>
          <Toaster />
    
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />

            {children}
          </main>
        </SidebarProvider>
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
