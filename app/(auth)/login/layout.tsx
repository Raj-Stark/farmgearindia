import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import React, { ReactNode } from "react";
import "../../globals.css";
import Provider from "@/app/provider";

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

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased font-sans">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default LoginLayout;
