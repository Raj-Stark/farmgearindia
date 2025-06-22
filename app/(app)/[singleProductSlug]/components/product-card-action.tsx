"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { cartAtom } from "@/app/atoms/cartAtom";
import { wishListAtom } from "@/app/atoms/wishListAtom";
import { ProductType } from "@/app/types";
import { toast } from "sonner";
import WhatsappBtn from "../../../../public/chat-on-whatsapp.png";
import { BUSINESS_WHATSAPP_NUMBER, DOMAIN_NAME } from "@/constant";
import { getWhatsappLink } from "@/utils/get-whatsapp-link";
import { userAtom } from "@/app/atoms/userAtom";

interface Props {
  product: ProductType;
}

const SUBCATEGORY_OPTIONS: Record<string, Record<string, string[]>> = {
  screen: {
    Material: [
      "Carbon Steel",
      "Mild Steel",
      "Stainless Steel",
      "Stainless Steel 304",
    ],
    Thickness: ["1mm", "1.2mm", "1.5mm", "2mm", "2.5mm"],
    HoleSize: ["0.6mm", "0.8mm", "0.9mm", "1.0mm", "1.1mm", "1.2mm"],
    Hardness: ["Plating Temper", "Electric Temper", "Nitrating Temper"],
    Color: ["Black", "Grey", "White", "Golden"],
  },
  pully: {
    Material: ["Mild Steel", "CI Casting"],
    Group: ["Flat", "A Group", "B Group", "C Group", "Pilot Bore"],
    BoreSize: [
      "Pilot Bore",
      "16 mm",
      "18 mm",
      "19 mm",
      "20 mm",
      "22 mm",
      "24 mm",
    ],
  },
  blade: {
    Material: ["Carbon Steel", "Mild Steel", "Stainless Steel"],
    Thickness: ["2mm", "3mm", "4mm", "5mm", "6mm", "8mm"],
    Hardness: ["Plating Temper", "Electric Temper", "Nitrating Temper"],
    Color: ["Black", "Grey", "White", "Golden"],
  },
  belt: {
    Group: ["Flat", "A Group", "B Group", "C Group", "Pilot Bore"],
  },
  bearing: {
    Size: [
      "Combine Bearing",
      "Shaft Bearing",
      "Machine Bearing",
      "Pully Bearing",
    ],
  },
  fan: {
    BoreSize: ["16mm", "18mm", "20mm", "22mm"],
    Model: ["Blower Fan", "6n40", "6n70", "6n100", "6n110", "6w400"],
  },
  shaft: {
    PulleySize: ["18mm", "19mm", "20mm", "22mm"],
    Material: ["Carbon Steel", "Mild Steel", "Stainless Steel"],
    Hardness: ["Electric Temper", "Nitrating Temper"],
  },
  hopper: {
    Shape: ["Round Hopper", "Square Hopper"],
    Material: ["Mild Steel", "Gl Steel"],
  },
  blower: {
    Model: ["6n40", "6n70", "6n100", "6w300"],
  },
  "nut-bolts": {
    Material: ["Mild Steel", "Gl Steel", "Stainless Steel"],
    Hardness: ["Plating Temper", "Electric Temper", "Nitrating Temper"],
  },
};

const ProductCardAction = ({ product }: Props) => {
  const router = useRouter();
  const { _id, slug, name, price, images, inventory, subcategory } = product;
  const user = useAtomValue(userAtom);

  const [quantity, setQuantity] = useState(1);
  const [cartData, setCartData] = useAtom(cartAtom);
  const [wishlist, setWishList] = useAtom(wishListAtom);

  const isInCart = cartData.some((item) => item.id === _id);
  const isInWishlist = wishlist.some((item) => item._id === _id);

  const subCategorySlug = subcategory.name.toLowerCase().trim();

  const [metadata, setMetadata] = useState<Record<string, string>>({});

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
    if (!user.isLoggedIn) {
      return toast.error("Make sure to Login first !!!");
    }

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
    if (!user.isLoggedIn) {
      return toast.error("Make sure to Login first !!!");
    }
    if (isInCart) {
      toast.error("Item already present in the cart");
      return;
    }

    if (
      SUBCATEGORY_OPTIONS[subCategorySlug] &&
      Object.entries(metadata).length < 1
    ) {
      toast.error("Please select product configurations.");
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
      metaData: metadata,
    };

    setCartData((prev) => [...prev, newCartItem]);
    setWishList((prev) => prev.filter((item) => item._id !== _id));
    router.push("/placeOrder");
    toast.success("Item added to cart successfully");
  };

  return (
    <>
      {SUBCATEGORY_OPTIONS[subCategorySlug] && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {Object.entries(SUBCATEGORY_OPTIONS[subCategorySlug]).map(
            ([label, values]) => (
              <div key={label}>
                <label className="block text-sm font-medium mb-1">
                  {label}
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={metadata[label] || ""}
                  onChange={(e) =>
                    setMetadata((prev) => ({
                      ...prev,
                      [label]: e.target.value,
                    }))
                  }
                >
                  <option value="">Select {label}</option>
                  {values.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )
          )}
        </div>
      )}
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
            text: `Hello, I would like to enquire about the ${name}. ${DOMAIN_NAME}/${slug}`,
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
