"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";

interface FormData {
  rating: number;
  comment: string;
}

interface Props {
  productId: string;
}

const RATING_LABELS = ["Terrible", "Poor", "Okay", "Good", "Excellent"];

const ProductReviewForm = ({ productId }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
    mode: "onBlur",
  });

  const currentRating = watch("rating");

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}review`,
        {
          productId,
          comment: data.comment,
          rating: data.rating,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      reset();
      toast.success("🎉 Your review has been submitted!");
    },
    onError: (error) => {
      reset();

      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.msg || error.message || "Something went wrong!";
        toast.error(`❌ ${message}`);
      } else {
        toast.error("❌ An unexpected error occurred.");
      }
    },
  });

  const onSubmit = (data: FormData) => {
    submitReview(data);
  };

  return (
    <div className="mt-10 rounded-lg border border-gray-200 bg-white dark:bg-zinc-900 shadow-sm px-4 py-4">
      <h2 className="text-2xl font-semibold mb-2 text-zinc-800 dark:text-white">
        Write a Review
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Rating */}
        <div>
          <Label className="text-base text-zinc-700 dark:text-zinc-300 mb-2 block">
            Overall Rating
          </Label>
          <Controller
            name="rating"
            control={control}
            rules={{
              required: "Please select a rating",
              min: { value: 1, message: "Rating must be at least 1 star" },
            }}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    onClick={() => field.onChange(value)}
                    className={clsx(
                      "w-5 h-5 cursor-pointer transition-transform hover:scale-110",
                      value <= field.value
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300 dark:text-gray-700"
                    )}
                  />
                ))}
                {currentRating > 0 && (
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 ml-2">
                    {RATING_LABELS[currentRating - 1]}
                  </span>
                )}
              </div>
            )}
          />
          {errors.rating && (
            <p className="text-sm text-red-500 mt-1">{errors.rating.message}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <Label
            htmlFor="comment"
            className="text-base text-zinc-700 dark:text-zinc-300 mb-2 block"
          >
            Tell us more
          </Label>
          <Controller
            name="comment"
            control={control}
            rules={{
              required: "Please share your experience",
              maxLength: {
                value: 800,
                message: "Comment must be under 800 characters",
              },
            }}
            render={({ field }) => (
              <Textarea
                id="comment"
                {...field}
                placeholder="What did you like or dislike? Would you recommend it?"
                className="min-h-[90px] text-base"
              />
            )}
          />
          {errors.comment && (
            <p className="text-sm text-red-500 mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="w-full sm:w-1/2 md:w-[200px]">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-11 text-base"
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductReviewForm;
