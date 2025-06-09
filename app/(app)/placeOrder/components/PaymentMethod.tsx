"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function PaymentMethodSection() {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <section className="border p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-2">Payment method</h2>
      <RadioGroup
        defaultValue="cod"
        onValueChange={(value) => setPaymentMethod(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod">Cash on Delivery</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="razorpay" id="razorpay" />
          <Label htmlFor="razorpay">RazorPay</Label>
        </div>
      </RadioGroup>
      {paymentMethod === "razorpay" && (
        <Input
          type="number"
          placeholder="Enter mobile number"
          className="mt-3 w-full border rounded px-2 py-1"
        />
      )}
    </section>
  );
}
