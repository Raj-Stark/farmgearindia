"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Typography } from "../ui/typography";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { ProductType } from "@/app/types";
import Image from "next/image";

const SearchOverlay = ({ onClose }: { onClose: () => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchValue = useDebounce(searchTerm, 300);
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchProducts", debouncedSearchValue],
    queryFn: async () => {
      if (!debouncedSearchValue?.trim()) return { products: [] };
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}product/searchProducts?keyword=${debouncedSearchValue}`;
      try {
        const response = await axios.get(endpoint);
        return response.data;
      } catch (err) {
        console.error(err);
        return { products: [] };
      }
    },
    enabled: Boolean(debouncedSearchValue),
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl rounded-lg p-6 relative max-h-[70vh] overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-8">
          <Button
            size="icon"
            variant={"ghost"}
            className="absolute top-3 right-3 cursor-pointer"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
          <Input
            autoFocus
            placeholder="Search products..."
            className="w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Typography variant="small">
          Showing results for: <strong>{searchTerm}</strong>
        </Typography>

        {isLoading && (
          <div className="mt-4 text-sm">
            <Spinner width={8} height={8} />
          </div>
        )}
        {error && (
          <p className="mt-4 text-sm text-red-500">Something went wrong</p>
        )}

        <div className="mt-4 space-y-4">
          {data?.products?.length > 0
            ? data.products.map((product: ProductType) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => {
                    router.push(`/${product.slug}`);
                    onClose();
                  }}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <Typography variant="small" className="font-medium">
                    {product.name}
                  </Typography>
                </div>
              ))
            : !isLoading &&
              debouncedSearchValue && (
                <Typography variant="small" className="font-medium">
                  No products found.
                </Typography>
              )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
