"use client";
import { wishListAtom } from "@/app/atoms/wishListAtom";
import ProductCard from "@/components/custom/product-card";
import SectionSeparator from "@/components/custom/section-seprator";
import { useAtomValue } from "jotai";
import React from "react";

const WishListPage = () => {
  const wishList = useAtomValue(wishListAtom);
  return (
    <article className="container mx-auto px-4">
      <div className="mt-2">
        <SectionSeparator sectionTitle="WishList" />
      </div>

      {/* Responsive layout: column on small screens, row on medium+ */}
      <section className="grid grid-cols-2 gap-x-2 gap-y-4  md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-6 ">
        {wishList.map((item) => {
          return <ProductCard key={item._id} product={item} />;
        })}
      </section>
    </article>
  );
};

export default WishListPage;
