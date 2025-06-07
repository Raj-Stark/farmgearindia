"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { cartAtom } from "@/app/atoms/cartAtom";
import { wishListAtom } from "@/app/atoms/wishListAtom";
import { ProductType } from "@/app/types";
import { toast } from "sonner";
import WhatsappBtn from "../../../../public/chat-on-whatsapp.png";
import { BUSINESS_WHATSAPP_NUMBER, DOMAIN_NAME } from "@/constant";
import { getWhatsappLink } from "@/utils/get-whatsapp-link";

interface Props {
  product: ProductType;
}

const ProductCardAction = ({ product }: Props) => {
  const router = useRouter();
  const { _id, name, price, images, inventory } = product;

  const [quantity, setQuantity] = useState(1);
  const [cartData, setCartData] = useAtom(cartAtom);
  const [wishlist, setWishList] = useAtom(wishListAtom);

  const isInCart = cartData.some((item) => item.id === _id);
  const isInWishlist = wishlist.some((item) => item._id === _id);

  const increaseQty = () => {
    if (quantity < inventory) {
      setQuantity((q) => q + 1);
    } else {
      toast.error("Cannot exceed available inventory");
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    } else {
      toast.error("Quantity cannot be less than 1");
    }
  };

  const handleWishlistToggle = () => {
    if (isInCart) {
      toast.error("Item already present inside Wishlist");
      return;
    }

    if (isInWishlist) {
      setWishList((prev) => prev.filter((item) => item._id !== _id));
      toast.success("Item removed from Wishlist");
    } else {
      setWishList((prev) => [...prev, product]);
      toast.success("Item added to Wishlist");
    }
  };

  const handleCartUpdate = () => {
    if (isInCart) {
      toast.error("Item already present in the cart");
      return;
    }

    const newCartItem = {
      id: _id,
      title: name,
      image: images[0],
      price,
      inventory,
      quantity,
      cartTotal: price * quantity,
    };

    setCartData((prev) => [...prev, newCartItem]);
    setWishList((prev) => prev.filter((item) => item._id !== _id));
    router.push("/cart");
    toast.success("Item added to cart successfully");
  };

  return (
    <>
      {/* Quantity & Wishlist */}
      <div className="flex items-center space-x-4 mt-6">
        <div className="flex border rounded-md">
          <Button
            variant="ghost"
            onClick={decreaseQty}
            className="font-bold text-xl"
          >
            -
          </Button>
          <div className="px-2 flex items-center justify-center">
            {quantity}
          </div>
          <Button
            variant="ghost"
            onClick={increaseQty}
            className="font-bold text-xl"
          >
            +
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={handleWishlistToggle}
          className={isInWishlist ? "text-red-500 border-red-500" : ""}
        >
          <Heart className="mr-2 h-4 w-4" />
          {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
        </Button>
      </div>

      {/* WhatsApp & Buy Now */}
      <div className="flex items-center gap-4 mt-6">
        <a
          href={getWhatsappLink(BUSINESS_WHATSAPP_NUMBER, {
            text: `Hello, I would like to enquire about the ${name}. ${DOMAIN_NAME}/${_id}`,
          })}
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

        <Button className="flex gap-2 items-center" onClick={handleCartUpdate}>
          <ShoppingCart className="h-4 w-4" />
          Buy Now
        </Button>
      </div>
    </>
  );
};

export default ProductCardAction;
