"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Category } from "@/app/types";
import { useRouter } from "next/navigation";

interface Props {
  category: Category;
  path?: string;
}

const CategoryCard = ({ category, path }: Props) => {
  const router = useRouter();
  return (
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
        <CardTitle className="text-lg font-bold">{category.name}</CardTitle>
      </CardContent>

      <CardFooter className="absolute bottom-4 z-20">
        <Button
          className="bg-green-700 hover:bg-green-800 text-white text-sm shadow-md"
          onClick={() => {
            router.push(path ?? "");
          }}
        >
          View More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
