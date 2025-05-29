import React from "react";
import ProductCard from "@/components/custom/product-card";

const ProductsSection = () => {
  return (
    <section className="py-8 px-0">
      <div className="grid grid-cols-2 gap-x-1 gap-y-4 md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-6 ">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
