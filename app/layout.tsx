import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RiHome4Line } from "react-icons/ri";
import { GrDocumentDownload } from "react-icons/gr";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sahil Sharma",
  description: "This is a portfolio website for Sahil, LinkedIN: https://www.linkedin.com/in/sahil-sharma-a839b125a/ Github: https://github.com/Sahilsharma12121",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased selection:bg-[#635a5b] selection:text-white overflow-x-hidden custom-scrollbar`}
    >
      <body className="w-screen">
        {children}
      </body>
    </html >
  );
}
