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

const keywords =
  "spare parts, farm spare parts, farm tools, spare parts bharat, sparepartsbharat, sparepartsbharat.com";

export const metadata: Metadata = {
  title: "FarmGear India",
  description: "Premium farming machinery and spare parts",
  keywords: keywords,
  openGraph: {
    title: "FarmGear India",
    description: "Premium farming machinery and spare parts",
    images: [],
    url: "https://www.sparepartsbharat.com/",
  },
  twitter: {
    title: "FarmGear India",
    description: "Premium farming machinery and spare parts",
    images: [],
    card: "summary_large_image",
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
