"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Link from "next/link";
import { DisplayText } from "./display-text";
import { House, Briefcase, Receipt } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { Skeleton } from "../ui/skeleton";

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebarProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await client.user.getUser.$get();
      return await res.json();
    },
  });

  const navItems = [
    {
      title: "Rooms",
      url: "/rooms",
      icon: House,
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: Briefcase,
    },
    {
      title: "Applications",
      url: "/applications",
      icon: Receipt,
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="flex items-center gap-2">
                <DisplayText className="flex text-xl relative italic font-bold tracking-tight ">
                  <span className="text-neutral-50 z-20">re:</span>
                  <span className="not-italic bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                    j∗bs
                  </span>
                </DisplayText>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <NavMain items={navItems} />
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="p-2">
          <UserButton />
          <div className="text-sm text-stone-300">
            {isLoading ? (
              <Skeleton className="w-32 h-4" />
            ) : (
              <DisplayText className="text-sm">
                <span>
                  {data?.[0]?.username || "No username"}
                  {data?.[0]?.email || "No email"}
                </span>
              </DisplayText>
            )}
          </div>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
