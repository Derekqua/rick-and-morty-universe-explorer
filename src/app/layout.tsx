import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick & Morty Universe Explorer",
  description: "Explore characters and universes from Rick & Morty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navbar */}
        <nav className="border-b py-4">
          <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
            <Link href="/" className="font-bold">R&M Explorer</Link>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-500 hover:text-black">Explorer</Link>
              <Link href="/dashboard" className="text-gray-500 hover:text-black">Dashboard</Link>
            </div>
          </div>
        </nav>
      
        {children}
      </body>
    </html>
  );
}
