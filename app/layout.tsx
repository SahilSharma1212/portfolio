import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "./_components/MotionProvider";
export const metadata: Metadata = {
  title: "Sahil Sharma",
  description: "This is the portfolio website of Sahil Sharma, and aslo place to some small lightweight ui components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased selection:bg-neutral-600 selection:text-white`}
      >
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
