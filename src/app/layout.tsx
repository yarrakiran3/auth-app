import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./ui/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Secure Next.js Authentication App",
  description: "A modern authentication app built with Next.js, NextAuth.js, and PostgreSQL. Supports OAuth providers like Google, GitHub, and LinkedIn for seamless and secure login.",
  authors:{name:"Yarra Kiran Kumar"},
  keywords:["Next.js authentication","NextAuth.js","secure login app", "secure authentication system"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-mono)] antialiased p-4 dark:text-white `}
      >
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
