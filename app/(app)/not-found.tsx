"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center px-4 py-8">
      <div className="max-w-xl">
        <h1 className="text-6xl font-extrabold text-green-700 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Oops! Page not found</h2>
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <Link href="/">
          <Button className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
