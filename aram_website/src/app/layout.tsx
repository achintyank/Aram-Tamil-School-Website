import type { Metadata } from "next";
import { Geist, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoTamil = Noto_Sans_Tamil({
  variable: "--font-noto-tamil",
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aram Tamil School | California Tamil Academy",
  description:
    "Aram Tamil School — a branch of the California Tamil Academy. Information about classes, teachers, events, and announcements for our students and staff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${notoTamil.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-gradient-to-br from-white via-sky-50 to-sky-200 bg-fixed">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
