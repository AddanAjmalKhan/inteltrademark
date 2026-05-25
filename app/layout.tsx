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
    <html lang="en" className={`${inter.variable} font-sans antialiased h-full overflow-x-hidden`}>
      <body className="min-h-screen flex flex-col bg-gray-100 dark:bg-stone-900 text-gray-900 dark:text-gray-100 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto relative overflow-x-hidden shadow-2xl flex flex-col min-h-screen bg-white dark:bg-stone-900">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
