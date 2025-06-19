"use client";

import Link from "next/link";
import { DisplayText } from "@/components/global/display-text";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();

  const heroNav = [
    { label: "Features", href: "/#features" },
    { label: "Product", href: "/#product" },
    { label: "Pricing", href: "/#pricing" },
  ];

  console.log("isSignedIn", isSignedIn);

  return (
    <div className="fixed z-40 flex h-min w-screen justify-center p-4">
      <div className="flex w-full items-center justify-center rounded-lg border-2 border-neutral-800 bg-neutral-900/70 px-4 py-2 text-neutral-50 backdrop-blur-lg md:w-fit md:rounded-full">
        <div className="jusitfy-between hidden h-full space-x-2 md:flex md:space-x-4">
          {heroNav.map((nav, index) => (
            <Link
              href={nav.href}
              key={index}
              className="flex items-center justify-center rounded-full p-2 leading-none transition-colors duration-100 hover:text-neutral-300 active:bg-neutral-50 active:text-neutral-950"
            >
              {nav.label}
            </Link>
          ))}
        </div>
        {isSignedIn ? (
          <Link
            href="/dashboard"
            className="w-full ps-6 m-0 hidden h-full space-x-2 md:flex"
          >
            <Button className="hidden md:block rounded-full cursor-pointer bg-primary text-white hover:bg-primary/80 active:bg-primary/90 transition-colors duration-200">
              Dashboard
            </Button>
          </Link>
        ) : (
          <Link
            href="/sign-in"
            className="w-full ps-6 m-0 hidden h-full space-x-2 md:flex"
          >
            <Button className="hidden md:block rounded-full cursor-pointer bg-primary text-white hover:bg-primary/80 active:bg-primary/90 transition-colors duration-200">
              Sign In
            </Button>
          </Link>
        )}

        <div className="ms-0 flex w-full flex-col md:hidden">
          <div className="flex w-full items-center justify-between">
            <DisplayText className="flex text-3xl relative italic font-bold tracking-tight ">
              <span className="text-neutral-50 z-20">re:</span>
              <span className="-ml-2 not-italic bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                j∗bs
              </span>
            </DisplayText>
            <div className="flex items-center gap-x-4">
              <button onClick={() => setIsOpen(!isOpen)}>
                <Menu className="text-neutral-50" size={24} />
              </button>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ marginLeft: 0 }}
          >
            <div className="mb-4 mt-4 flex w-full flex-col justify-end gap-y-2 border-t border-neutral-600 pt-4">
              {heroNav.map((nav, index) => (
                <Link
                  href={nav.href}
                  key={index}
                  className="rounded-full p-2 leading-none transition-colors duration-100 hover:text-neutral-300 active:bg-neutral-50 active:text-neutral-950"
                >
                  {nav.label}
                </Link>
              ))}
            </div>
            {isSignedIn ? (
              <Link href="/dashboard" className="w-full">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <Link href="/sign-in" className="w-full">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
