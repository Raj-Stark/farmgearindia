import Image from "next/image";
import { Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import fallbackImage from "../../public/farm-machine.jpg";
import StarRating from "./star-rating";
import { ProductType } from "@/app/types";
import { formatCurrency } from "@/utils/format-currency";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, images, numOfReviews, averageRating } = product;

  const productImage = images?.[0] || fallbackImage;

  return (
    <Card className="w-full p-0 shadow-md pb-2">
      {/* Image Section */}
      <div className="relative h-[200px] md:h-[240px] w-full rounded-t-xl overflow-hidden">
        <Image src={productImage} alt={name} fill className="object-cover" />
        <CardAction className="absolute top-2 right-2 z-10">
          <button className="rounded-full bg-white p-1 shadow hover:bg-muted transition">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </button>
        </CardAction>
      </div>

      {/* Product Info */}
      <CardContent className="space-y-1 px-1 md:px-3 md:space-y-2">
        <CardTitle className="text-xs md:text-lg font-semibold leading-tight">
          {name}
        </CardTitle>

        <div className="flex items-center gap-1 text-yellow-500 text-xs">
          <StarRating ratingValue={String(averageRating) || ""} />
          <span className="text-muted-foreground text-[8px] md:text-xs ml-1">
            ({numOfReviews ?? 0} reviews)
          </span>
        </div>

        <p className="text-emerald-600 font-bold text-lg">
          {formatCurrency(price)}
        </p>
      </CardContent>

      {/* CTA */}
      <CardFooter className="px-1 py-0 md:px-3">
        <Button variant={"default"} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
