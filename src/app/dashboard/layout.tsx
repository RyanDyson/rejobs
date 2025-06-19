import type { Metadata } from "next";
import { AppSidebar } from "@/components/global/app-sidebar";
import { SiteHeader } from "@/components/global/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="max-h-full flex flex-col">
        <SiteHeader />
        {children}
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
