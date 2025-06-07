"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  image: string[];
}

export function ImageCarousel({ image }: ImageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // track slide changes
  React.useEffect(() => {
    if (!api) return;

    setActiveIndex(api.selectedScrollSnap());
    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  // autoplay
  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % (image.length || 1);
      api.scrollTo(nextIndex);
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, [api, activeIndex, image.length]);

  return (
    <>
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {image.map((imgUrl, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
                  <img
                    src={imgUrl}
                    alt={`Image ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Bullets */}
      <div className="flex justify-center mt-3 gap-2">
        {image.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors duration-200",
              activeIndex === index
                ? "bg-black scale-110"
                : "bg-gray-400 hover:bg-gray-500"
            )}
          />
        ))}
      </div>
    </>
  );
}
