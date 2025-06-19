import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">re:interview</h3>
            <p className="text-zinc-400 mb-6 max-w-md">
              Master your interviews with AI agents that adapt to your needs.
              Practice presentations, job interviews, and more in a safe
              environment.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-zinc-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-400 text-sm">
            © 2025 re:interview. All rights reserved.
          </p>
          <p className="text-zinc-400 text-sm mt-2 md:mt-0">
            Built with ❤️ for better interviews
          </p>
        </div>
      </div>
    </footer>
  );
}
