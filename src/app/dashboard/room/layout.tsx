import type { Metadata } from "next";

// import { currentUser } from "@clerk/nextjs/server";
// import { client } from "@/lib/client";

export const metadata: Metadata = {
  title: "re:j∗bs - Rooms",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const clerkUser = await currentUser();
  // const res = await client.user.getDbUser.$get({
  //   clerkId: clerkUser?.id || "",
  // });
  // const user = await res.json();

  return <>{children}</>;
}
