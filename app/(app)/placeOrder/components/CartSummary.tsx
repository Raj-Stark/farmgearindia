"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAtomValue } from "jotai";
import { cartAtom } from "@/app/atoms/cartAtom";
import { formatCurrency } from "@/utils/format-currency";

export default function CartSummary() {
  const cartItems = useAtomValue(cartAtom);

  return (
    <aside className="border p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-2">My Order</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Image
              src={item.image}
              alt={item.title}
              width={60}
              height={60}
              className="rounded"
            />
            <div>
              <div>{item.title}</div>
              <div className="text-sm text-gray-500">
                Quantity · {item.quantity}
              </div>
              <div className="text-sm text-gray-500">
                Price. {formatCurrency(item.price)}
              </div>
              <div className="text-sm ">
                Total Price · {formatCurrency(item.cartTotal)}
              </div>
            </div>
          </div>
        ))}

        <hr className="h-[2px] my-8 bg-gray-400 border-0 dark:bg-gray-700" />
      </div>
    </aside>
  );
}
