import { ProductType } from "@/app/types";
import axios from "axios";
import React from "react";
import ProductCard from "@/components/custom/product-card";
import SectionSeparator from "@/components/custom/section-seprator";

interface SubcategoryPageProps {
  params: {
    subCategorySlug: string;
  };
}

async function getProductsBySlug(slug: string): Promise<ProductType[]> {
  try {
    const response = await axios.post<{ products: ProductType[] }>(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}product/filter`,
      {
        categorySlugs: [slug],
      }
    );
    return response.data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

const SubCategoryProducts = async ({ params }: SubcategoryPageProps) => {
  const { subCategorySlug } = params;

  let products: ProductType[] = [];

  try {
    products = await getProductsBySlug(subCategorySlug);
  } catch (err) {
    return (
      <section className="container mx-auto px-4 py-8">
        <p className="text-center text-red-600 font-medium">
          Failed to load products. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 min-h-[calc(100vh-52px)]">
      <div className="mt-2">
        <SectionSeparator sectionTitle="Sub-Categories Products" />
      </div>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-2 gap-y-4  md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-6 ">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SubCategoryProducts;
