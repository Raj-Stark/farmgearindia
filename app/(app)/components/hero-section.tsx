import Image from "next/image";
import React from "react";
import farm from "../../../public/agriculture.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="w-full h-[300px] xl:h-[600px] relative overflow-hidden">
      <Image
        src={farm}
        alt="Farm background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
        <h1 className="text-white text-2xl md:text-6xl font-bold animate-slide-up opacity-0 delay-100">
          Enhance Your Farm’s Productivity
        </h1>
        <p className="text-white text-sm md:text-xl mt-2 max-w-xl animate-slide-up opacity-0 delay-200">
          Discover cutting-edge machinery designed to optimize your farming
          operations and maximize yields.
        </p>
        <Button className="mt-6 bg-primary hover:bg-black text-white text-sm md:text-base px-4 md:px-6 py-2 rounded-md shadow-md transition-transform duration-300 hover:scale-105">
          Explore Our Products
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
