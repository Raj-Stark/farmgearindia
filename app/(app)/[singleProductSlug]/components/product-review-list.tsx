"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Review } from "@/app/types";

interface Props {
  reviews: Review[];
}

const ProductReviewList = ({ reviews }: Props) => {
  if (!reviews.length) {
    return (
      <div className="mt-8 text-center text-lg md:text-2xl text-zinc-500 dark:text-zinc-400">
        No reviews yet.
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-6">
      <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
        Customer Reviews
      </h3>

      {reviews.map((review) => (
        <div key={review._id} className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {review.userId.name
                  .split(" ")
                  .map((n) => n[0])

                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-zinc-800 dark:text-white">
                  {review.userId.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <Star
                    key={val}
                    className={`h-4 w-4 ${
                      val <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-700"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>

          <Separator />
        </div>
      ))}
    </div>
  );
};

export default ProductReviewList;
