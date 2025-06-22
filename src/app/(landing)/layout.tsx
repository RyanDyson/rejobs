import type { Metadata } from "next";
import { Providers } from "@/components/global/providers";
import { Navbar } from "./components/Navbar";

import "../globals.css";

export const metadata: Metadata = {
  title: "re:j∗bs",
  description: "Defeat the allegations. Get a j∗b.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
