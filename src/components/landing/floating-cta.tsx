"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/dashboard">
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6 py-3"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Start Practicing
        </Button>
      </Link>
    </div>
  );
}
