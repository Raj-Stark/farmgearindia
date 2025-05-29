import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const categories = [
  {
    title: "Tractors",
    image: "/categories/tractors.jpg",
  },
  {
    title: "Harvesters",
    image: "/categories/harvesters.jpg",
  },
  {
    title: "Planting & Seeding",
    image: "/categories/planting.jpg",
  },
  {
    title: "Irrigation Systems",
    image: "/categories/irrigation.jpg",
  },
];

const CategorySection = () => {
  return (
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {categories.map((category) => (
          <Card
            key={category.title}
            className="relative p-0 overflow-hidden group min-h-[280px] justify-end"
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* Content */}
            <CardContent className="absolute bottom-16 z-20 text-white">
              <CardTitle className="text-lg font-bold">
                {category.title}
              </CardTitle>
            </CardContent>

            <CardFooter className="absolute bottom-4 z-20">
              <Button className="bg-green-700 hover:bg-green-800 text-white text-sm shadow-md">
                View More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
