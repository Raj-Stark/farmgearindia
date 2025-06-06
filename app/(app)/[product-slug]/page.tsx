"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Heart, Star, ShoppingCart } from "lucide-react";
import WhatsappBtn from "../../../public/chat-on-whatsapp.png";
import Image from "next/image";

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);
  const product = {
    name: "Sample Product",
    price: 499,
    images: ["/placeholder.svg"],
    rating: 4.2,
    reviewsCount: 32,
    inStock: true,
    description:
      "This is a demo product description with features and benefits.",
  };

  const increaseQty = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decreaseQty = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Image */}
        <Card className="overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={400}
            className="object-cover w-full h-auto"
          />
        </Card>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{product.rating}</span>
              <span>({product.reviewsCount} reviews)</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <span
              className={product.inStock ? "text-green-600" : "text-red-500"}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="text-2xl font-bold mt-4">₹ {product.price}</p>

          <Separator className="my-4" />

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <Separator className="my-4" />

          {/* Quantity Selector & Wishlist */}
          <div className="flex items-center space-x-4 mt-6">
            <div className="flex border rounded-md">
              <Button
                variant="ghost"
                onClick={decreaseQty}
                className=" font-bold text-xl"
              >
                -
              </Button>
              <div className="px-2 flex items-center justify-center">
                {quantity}
              </div>
              <Button
                variant="ghost"
                onClick={increaseQty}
                className=" font-bold text-xl"
              >
                +
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() => setInWishlist(!inWishlist)}
              className={inWishlist ? "text-red-500 border-red-500" : ""}
            >
              <Heart className="mr-2 h-4 w-4" />
              {inWishlist ? "Wishlisted" : "Add to Wishlist"}
            </Button>
          </div>

          {/* WhatsApp & Buy Now */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://wa.me/919999999999?text=Hello%2C%20I%20want%20to%20enquire%20about%20Sample%20Product"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={WhatsappBtn}
                alt="Chat on WhatsApp"
                width={160}
                height={32}
              />
            </a>

            <Button className="flex gap-2 items-center">
              <ShoppingCart className="h-4 w-4" />
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
