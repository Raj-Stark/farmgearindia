"use client";

import { load } from "@cashfreepayments/cashfree-js";
import { cartAtom } from "@/app/atoms/cartAtom";
import { paymentMethodAtom } from "@/app/atoms/paymentMethodAtom";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format-currency";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { isBillingInfoValidAtom } from "@/app/atoms/billingatom";
import axios from "axios";

export default function OrderSummary() {
  const cartItems = useAtomValue(cartAtom);
  const paymentMethod = useAtomValue(paymentMethodAtom);
  const isBillingValid = useAtomValue(isBillingInfoValidAtom);
  const router = useRouter();

  const shippingFeePerItem = 1;
  const shippingFee = cartItems.reduce(
    (sum, item) => sum + shippingFeePerItem * item.quantity,
    0
  );
  const subtotal = cartItems.reduce((sum, item) => sum + item.cartTotal, 0);
  const total = subtotal + shippingFee;

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}order`,
        {
          items: cartItems.map((item) => ({
            product: item.id,
            amount: item.quantity,
          })),
          tax: 0,
          shippingFee,
          paymentMode: paymentMethod,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: async (data) => {
      if (paymentMethod === "online" && data.sessionId) {
        try {
          const cashfree = await load({
            mode: "production",
          });

          await cashfree.checkout({
            paymentSessionId: data.sessionId,
            redirectTarget: "_modal",
          });
        } catch (e) {
          console.error("Cashfree SDK Error", e);
          toast.error("Failed to load payment gateway.");
        }
      } else {
        toast.success("Order placed successfully!");
        router.push("/thank-you");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.msg || "Something went wrong");
    },
  });

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
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>{formatCurrency(shippingFee)}</span>
        </div>

        <hr />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <Button
        className="mt-4 w-full"
        onClick={() => mutate()}
        disabled={isPending || !isBillingValid}
      >
        {isPending ? "Placing Order..." : "Place Order"}
      </Button>
    </section>
  );
}
