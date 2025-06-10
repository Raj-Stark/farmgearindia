"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { cartAtom } from "@/app/atoms/cartAtom";
import { formatCurrency } from "@/utils/format-currency";
import { Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";

export default function CartSummary() {
  const [cartItems, setCartItems] = useAtom(cartAtom);

  const increment = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              cartTotal: (item.quantity + 1) * item.price,
            }
          : item
      )
    );
  };

  const decrement = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? {
                ...item,
                quantity: item.quantity - 1,
                cartTotal: (item.quantity - 1) * item.price,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Product removed successfully");
  };

  return (
    <aside className="border p-4 rounded-xl max-h-[86vh] overflow-y-scroll shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">My Order</h2>
      <div className="space-y-6">
        {cartItems.length === 0 && (
          <p className="font-semibold">No products found. Add some</p>
        )}
        {cartItems.map((item) => (
          <div className="relative  md:pt-4" key={item.id}>
            <div
              className="flex items-start gap-4 border-b pb-4 md:mt-1 "
              key={item.id}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={70}
                height={70}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold text-sm sm:text-base">
                  {item.title}
                </div>

                <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Price: {formatCurrency(item.price)}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => decrement(item.id)}
                    className="w-7 h-7"
                  >
                    <Minus size={14} />
                  </Button>
                  <span className="text-sm sm:text-base px-1">
                    {item.quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => increment(item.id)}
                    className="w-7 h-7"
                  >
                    <Plus size={14} />
                  </Button>
                </div>

                <div className="mt-2 text-xs sm:text-sm font-medium text-primary">
                  Total: {formatCurrency(item.cartTotal)}
                </div>
              </div>

              {/* Remove Icon */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="absolute top-0 right-0 text-red-500"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        ))}

        <hr className="h-[2px] my-6 bg-gray-300 border-0 dark:bg-gray-700" />
      </div>
    </aside>
  );
}
