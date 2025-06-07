"use client";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import WhatsappBtn from "../../../../public/chat-on-whatsapp.png";
import Image from "next/image";

const ProductCardAction = () => {
  const [quantity, setQuantity] = useState(1);
  const [inWishlist, setInWishlist] = useState(false);

  const increaseQty = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decreaseQty = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <>
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
    </>
  );
};

export default ProductCardAction;
