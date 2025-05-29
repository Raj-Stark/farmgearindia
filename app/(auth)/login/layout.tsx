import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import React, { ReactNode } from "react";
import "../../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FarmGear India - Login",
  description: "Login to your FarmGear account",
};

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
};

export default LoginLayout;
