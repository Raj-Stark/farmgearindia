"use client";

import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  SendIcon,
  ShieldCheckIcon,
  TwitterIcon,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-4 px-6 md:px-16 mt-7">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h2 className="text-lg font-bold mb-2">FarmGear</h2>
          <p className="text-sm text-gray-400">
            Empowering modern farmers with rugged, reliable gear designed for
            productivity and performance.
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-4">Use Cases</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Marketers</li>
            <li>Small Business</li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Spare Parts</li>
            <li>Farm Machine</li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-4">Follow us</h3>
          <div className="flex space-x-4">
            <FacebookIcon className="w-5 h-5 text-white hover:text-gray-300" />
            <ShieldCheckIcon className="w-5 h-5 text-white hover:text-gray-300" />
            <SendIcon className="w-5 h-5 text-white hover:text-gray-300" />
            <InstagramIcon className="w-5 h-5 text-white hover:text-gray-300" />
            <TwitterIcon className="w-5 h-5 text-white hover:text-gray-300" />
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} FarmGear India. All rights reserved.
      </p>
    </footer>
  );
}
