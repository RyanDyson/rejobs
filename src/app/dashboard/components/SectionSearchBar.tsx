"use clinent";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SectionSearchBar({
  placeholder = "Search...",
  value,
  onChange,
  className,
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-primary" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 bg-pink-50 active:border-primary focus-visible:border-primary focus:ring-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-primary data-[state=disabled]:bg-secondary data-[state=disabled]:text-muted-foreground data-[state=disabled]:placeholder:text-muted-foreground data-[state=disabled]:cursor-not-allowed dark:data-[state=disabled]:bg-secondary dark:data-[state=disabled]:text-muted-foreground dark:data-[state=disabled]:placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
}
