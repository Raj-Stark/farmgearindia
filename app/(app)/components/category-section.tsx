import { Category } from "@/app/types";
import React from "react";
import axios from "axios";
import CategoryCard from "@/components/custom/category-card";

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
    <section className=" px-4 sm:px-2 md:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-2  gap-2 md:gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            path={`category/${category.slug}`}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
