export const revalidate = 10;
import React from "react";
import ProductCard from "@/components/custom/product-card";
import { ProductType } from "@/app/types";

async function getFeaturedProducts(): Promise<ProductType[]> {
  const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}product`;
  const res = await fetch(endpoint, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    console.error("Failed to fetch products:", res.statusText);
    return [];
  }

  const data: { products: ProductType[] } = await res.json();
  return data.products.filter((p) => p.featured);
}

const ProductsSection = async () => {
  const featuredProducts = await getFeaturedProducts();
  return (
    <section className="mt-8 px-4 sm:px-2 md:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
