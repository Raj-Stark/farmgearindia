"use client";

import {
  FacebookIcon,
  InstagramIcon,
  SendIcon,
  ShieldCheckIcon,
  TwitterIcon,
} from "lucide-react";
import footerLogo from "../../public/footer-logo.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-6 px-6 md:px-20 mt-10">
      <div className="mx-auto max-w-screen-2xl grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-12">
        {/* Column 1: Logo & About */}
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-4">
            <Image
              src={footerLogo}
              alt="FarmGear Logo"
              width={140} // default on desktop
              height={100}
              className="w-28 md:w-36 h-auto object-contain"
              priority
            />
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Empowering modern farmers with rugged, reliable gear designed for
            productivity and performance.
          </p>

          <div className="mt-6 space-y-3 text-sm text-gray-400">
            <div className="flex justify-center md:justify-start items-start gap-3">
              <ShieldCheckIcon className="w-5 h-5 mt-1" />
              <span>65/1 Road Belgachia, Howrah - 711108</span>
            </div>
            <div className="flex justify-center md:justify-start items-start gap-3">
              <SendIcon className="w-5 h-5 mt-1" />
              <a href="tel:+917080672653" className="hover:underline">
                +91-708-067-2653
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Categories */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition">
              Spare Parts
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Farm Machine
            </li>
          </ul>
        </div>

        {/* Column 3: Social */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Follow us</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="#" aria-label="Facebook">
              <FacebookIcon className="w-6 h-6 hover:text-gray-300 transition" />
            </a>
            <a href="#" aria-label="Instagram">
              <InstagramIcon className="w-6 h-6 hover:text-gray-300 transition" />
            </a>
            <a href="#" aria-label="Twitter">
              <TwitterIcon className="w-6 h-6 hover:text-gray-300 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">Spare Parts Bharat</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
