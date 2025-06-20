import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/components/custom/navbar";
import "../globals.css";
import Provider from "../provider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/custom/footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spare Parts Bharat",
  description: "Premium farming machinery",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased font-sans">
        <Provider>
          <Navbar />
          {children}
        </Provider>
        <Footer />
        <Toaster richColors position="top-left" expand={true} />
      </body>
    </html>
  );
}
