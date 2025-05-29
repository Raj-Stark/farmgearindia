import React from "react";
import { Star, Star as StarOutline } from "lucide-react";

interface Props {
  ratingValue: string;
}

const StarRating = ({ ratingValue }: Props) => {
  const rating = Math.floor(parseFloat(ratingValue)); // Remove decimals
  const totalStars = 5;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: totalStars }).map((_, i) => {
        if (i <= rating) {
          return (
            <Star
              key={i}
              className="w-3 h-3 md:w-4 md:h-4 fill-yellow-500 text-yellow-500"
            />
          );
        } else {
          return (
            <StarOutline
              key={i}
              className="w-3 h-3 md:w-4 md:h-4 text-yellow-500"
            />
          );
        }
      })}
    </div>
  );
};

export default StarRating;
