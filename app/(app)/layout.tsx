import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/components/custom/navbar";
import "../globals.css";
import Provider from "../provider";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FarmGear India",
  description: "Premium farming machinery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased font-sans">
        <Navbar />
        <Provider>{children}</Provider>
        <Toaster richColors position="top-left" expand={true} />
      </body>
    </html>
  );
}
