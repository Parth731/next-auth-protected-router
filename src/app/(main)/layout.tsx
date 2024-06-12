"use client";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "911",
//   description: "911"
// };
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }
  return <div>{children}</div>;
}
