"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import { paymentMethodAtom } from "@/app/atoms/paymentMethodAtom";

export default function PaymentMethodSection() {
  const [paymentMethod, setPaymentMethod] = useAtom(paymentMethodAtom);

  return (
    <section className="border p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-2">Payment Method</h2>

      <RadioGroup
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value as "cod" | "online")}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod">Cash on Delivery</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="online" id="online" />
          <Label htmlFor="online">Online Payment (Cashfree)</Label>
        </div>
      </RadioGroup>
    </section>
  );
}
