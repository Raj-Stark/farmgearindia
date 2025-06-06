import { Category } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import axios from "axios";

async function getCategories(): Promise<Category[]> {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}categories`;
    const response = await axios.get<{ categories: Category[] }>(endpoint);
    return response.data.categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}
const CategorySection = async () => {
  const categories = await getCategories();
  return (
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-2  gap-2 md:gap-4">
        {categories.map((category) => (
          <Card
            key={category._id}
            className="relative p-0 overflow-hidden group min-h-[280px] justify-end"
          >
            <Image
              src={category.image ?? ""}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 z-10" />

            <CardContent className="absolute bottom-16 z-20 text-white">
              <CardTitle className="text-lg font-bold">
                {category.name}
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
