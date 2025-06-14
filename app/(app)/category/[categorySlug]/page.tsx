import { Category } from "@/app/types";
import CategoryCard from "@/components/custom/category-card";
import SectionSeparator from "@/components/custom/section-seprator";
import axios from "axios";
import React from "react";

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

async function getSubcategories(parentSlug: string): Promise<Category[]> {
  try {
    const response = await axios.get<{ categories: Category[] }>(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}categories/parent/${parentSlug}`
    );
    return response.data.categories;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const subcategories = await getSubcategories(params.categorySlug);

  return (
    <section className="container mx-auto  min-h-[calc(100vh-52px)] px-4">
      <div className="mt-2">
        <SectionSeparator sectionTitle="Categories" />
      </div>

      {subcategories.length === 0 ? (
        <p className="text-center text-gray-500">No subcategories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subcategories.map((subcategory) => (
            <CategoryCard
              key={subcategory._id}
              category={subcategory}
              path={`/category/${params.categorySlug}/${subcategory.slug}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryPage;
