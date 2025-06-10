import BillingSection from "./components/BillingSection";
import CartSummary from "./components/CartSummary";
import OrderSummary from "./components/OrderSummary";
import PaymentMethodSection from "./components/PaymentMethod";

export default function page() {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4 min-h-screen">
      <CartSummary />
      <div className="space-y-6">
        <BillingSection />
        <PaymentMethodSection />
        <OrderSummary />
      </div>
    </div>
  );
}
