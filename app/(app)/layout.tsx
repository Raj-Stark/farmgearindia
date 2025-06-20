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
  title: {
    default: "Spare Parts Bharat – Mill & Farming Machinery Spare Parts",
    template: "%s | Spare Parts Bharat",
  },
  description:
    "Premium spare parts for milling and farming machinery. OEM & aftermarket parts — fast shipping across India.",
  metadataBase: new URL("https://www.sparepartsbharat.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Spare Parts Bharat – Mill & Farming Machinery Parts",
    description:
      "High-quality spare parts for agricultural and milling equipment. Genuine OEM & aftermarket options.",
    url: "https://www.sparepartsbharat.com",
    siteName: "Spare Parts Bharat",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://www.sparepartsbharat.com/agriculture.jpg",
        width: 1200,
        height: 630,
        alt: "Spare Parts Bharat logo and equipment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spare Parts Bharat – Mill & Farming Machinery Parts",
    description:
      "Premium spare parts for milling and farming machinery. OEM & aftermarket options.",
    images: ["https://www.sparepartsbharat.com/agriculture.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
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
