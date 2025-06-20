"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface BreadcrumbSegment {
  label: string;
  href: string;
  isLast: boolean;
}

const BreadCrumbGenerator = (pathname: string): BreadcrumbSegment[] => {
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbSegment[] = [];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (!segment) continue;

    const href = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;

    if (segment === "room" && i + 1 < segments.length) {
      const slug = segments[i + 1];
      if (!slug) continue;

      const combinedHref = "/" + segments.slice(0, i + 2).join("/");
      const combinedIsLast = i + 1 === segments.length - 1;

      const formattedSlug = slug
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      breadcrumbs.push({
        label: `Room - ${formattedSlug}`,
        href: combinedHref,
        isLast: combinedIsLast,
      });

      i++;
    } else {
      const label = segment
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      breadcrumbs.push({
        label,
        href,
        isLast,
      });
    }
  }

  return breadcrumbs;
};

export function SiteHeader() {
  const pathname = usePathname();
  const breadcrumbs = BreadCrumbGenerator(pathname);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="py-1 flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 ">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {breadcrumb.isLast ? (
                    <BreadcrumbPage className="text-base font-medium">
                      {breadcrumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={breadcrumb.href}
                      className="text-base font-medium hover:text-foreground"
                    >
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!breadcrumb.isLast && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
