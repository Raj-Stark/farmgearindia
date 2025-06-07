"use client";

import { userAtom } from "@/app/atoms/userAtom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai/react";
import { User, History, Heart, ShoppingCart, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileSideBar() {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}auth/logout`;

      const response = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error("Something went wrong !!!");
      }

      return response.data;
    },
    onSuccess: () => {
      setUser({
        isLoggedIn: false,
        name: "",
        userId: "",
      });

      router.push("/");
    },
    onError: () => {},
  });

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
        <li
          className="flex items-center gap-3 text-red-500 cursor-pointer"
          onClick={() => logout()}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </li>
      </ul>
    </section>
  );
}
