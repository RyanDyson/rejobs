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
import { House, Briefcase, Receipt, Gauge } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { type user } from "@/server/db/schema";

type AppSidebarProps = { user: user } & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Gauge,
    },
    {
      title: "Rooms",
      url: "/dashboard/room",
      icon: House,
    },
    {
      title: "Jobs (Coming Soon)",
      url: "./",
      icon: Briefcase,
    },
    {
      title: "Applications (Coming Soon)",
      url: "./",
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
              <Link href="/dashboard" className="flex items-center gap-2">
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
        <SidebarMenu className="p-2 flex gap-4 flex-row">
          <UserButton />
          <DisplayText className="text-left flex flex-col w-full h-full justify-start text-xs font-semibold gap-y-0.5">
            <span>{user?.username || "No username"}</span>
            <span>{user?.email || "No email"}</span>
          </DisplayText>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
