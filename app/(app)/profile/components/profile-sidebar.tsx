import { User, History, Heart, ShoppingCart, LogOut } from "lucide-react";

export default function ProfileSideBar() {
  return (
    <section className="w-full md:max-w-[300px] h-min bg-white rounded-xl shadow p-4">
      <ul className="space-y-6 text-base md:text-lg font-medium text-gray-700">
        <li className="flex items-center gap-3 text-green-600">
          <User className="w-5 h-5" />
          <span>My Profile</span>
        </li>
        <li className="flex items-center gap-3 text-green-600">
          <History className="w-5 h-5" />
          <span>Order History</span>
        </li>
        <li className="flex items-center gap-3 text-green-600">
          <Heart className="w-5 h-5" />
          <span>Wishlist</span>
        </li>
        <li className="flex items-center gap-3 text-green-600">
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
        </li>
        <hr className="my-2" />
        <li className="flex items-center gap-3 text-red-500">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </li>
      </ul>
    </section>
  );
}
