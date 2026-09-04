import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "rafitojuan",
  description: "Windows 11 OS Simulator Portfolio - Rafito Juan",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-hidden select-none bg-black">
        {children}
      </body>
    </html>
  );
}
