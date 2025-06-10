"use client";

import { cartAtom } from "@/app/atoms/cartAtom";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format-currency";
import { useAtomValue } from "jotai";

export default function OrderSummary() {
  const cartItems = useAtomValue(cartAtom);

  return (
    <section className="border p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-2">Order Summary</h2>

      <div className="space-y-1 text-sm">
        {cartItems.map((item) => (
          <div className="flex justify-between" key={item.id}>
            <span>{item.title}</span>
            <span>{formatCurrency(item.cartTotal)}</span>
          </div>
        ))}

        <hr />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>
            {formatCurrency(
              cartItems.reduce((sum, item) => sum + item.cartTotal, 0)
            )}
          </span>
        </div>
      </div>
      <Button className="mt-4 w-full">Place Order</Button>
    </section>
  );
}
