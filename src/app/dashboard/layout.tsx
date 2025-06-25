import type { Metadata } from "next";
import { AppSidebar } from "@/components/global/app-sidebar";
import { SiteHeader } from "@/components/global/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/client";
import { user } from "@/server/db/schema";

export const metadata: Metadata = {
  title: "re:j∗bs - Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkUser = await currentUser();
  const res = await client.user.getDbUser.$get({
    clerkId: clerkUser?.id || "",
  });
  const user = await res.json();

  return (
    <SidebarProvider>
      <AppSidebar user={user || ({} as user)} />
      <SidebarInset className="max-h-full flex flex-col">
        <SiteHeader />
        <div className="pt-8 h-full">{children}</div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
