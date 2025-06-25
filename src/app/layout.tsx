import "./globals.css";

import type { Metadata } from "next";
import { Providers } from "@/components/global/providers";

export const metadata: Metadata = {
  title: "re:j∗bs",
  description: "Defeat the allegations. Get a j∗b.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
