import React from "react";
import ProductCard from "@/components/custom/product-card";
import { ProductType } from "@/app/types";
import axios from "axios";

async function getFeaturedProducts(): Promise<ProductType[]> {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}product`;
    const response = await axios.get<{ products: ProductType[] }>(endpoint);
    return response.data.products.filter((p) => p.featured);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

const ProductsSection = async () => {
  const featuredProducts = await getFeaturedProducts();
  return (
    <section className="py-8 px-0">
      <div className="grid grid-cols-2 gap-x-1 gap-y-4 md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-6 ">
        {featuredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
