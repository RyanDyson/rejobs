import type { Metadata } from "next";
import { AppSidebar } from "@/components/global/app-sidebar";
import { SiteHeader } from "@/components/global/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { Providers } from "@/components/global/providers";

import "../globals.css";

export const metadata: Metadata = {
  title: "re:Interview - Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark antialiased">
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="max-h-full flex flex-col">
              <SiteHeader />
              {children}
            </SidebarInset>
            <Toaster />
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
