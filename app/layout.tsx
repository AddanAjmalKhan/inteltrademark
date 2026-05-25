import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";





export const metadata: Metadata = {
  title: "Intel Trademark",
  description: "Premium trademark services"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased h-full`}>
      <body className="min-h-screen flex flex-col bg-white dark:bg-stone-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
