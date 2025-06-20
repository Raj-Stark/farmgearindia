"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from "./profile-form";
import OrderHistory from "./order-history";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSetAtom } from "jotai";
import { userAtom } from "@/app/atoms/userAtom";
import { wishListAtom } from "@/app/atoms/wishListAtom";
import { cartAtom } from "@/app/atoms/cartAtom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "@/components/custom/Spinner";

const ProfileTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const [selectedTab, setSelectedTab] = useState("profile");

  useEffect(() => {
    if (pathname === "/profile" && !searchParams.get("tab")) {
      router.replace("/profile?tab=profile");
    }
  }, [pathname, searchParams, router]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "profile" || tab === "orders" || tab === "logout") {
      setSelectedTab(tab);
    } else {
      setSelectedTab("profile");
    }
  }, [searchParams]);

  const setUser = useSetAtom(userAtom);
  const setWishList = useSetAtom(wishListAtom);
  const setCart = useSetAtom(cartAtom);

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}auth/logout`;
      const response = await axios.get(endpoint, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status !== 200) throw new Error("Something went wrong!");
      return response.data;
    },
    onSuccess: () => {
      setUser({ isLoggedIn: false, name: "", userId: "" });
      setWishList([]);
      setCart([]);
      router.push("/");
    },
  });

  const handleTabChange = (value: string) => {
    if (value === "logout") {
      logout();
      return;
    }
    router.replace(`?tab=${value}`);
  };

  return (
    <div className="space-y-8">
      <Tabs
        value={selectedTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full flex gap-4 bg-muted p-3 rounded-xl justify-start">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-3 rounded-lg text-base font-medium transition-colors hover:bg-white/80"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 py-3 rounded-lg text-base font-medium transition-colors hover:bg-white/80"
          >
            Order History
          </TabsTrigger>
          <TabsTrigger
            value="logout"
            className="ml-auto text-red-600 hover:text-red-700 px-6 py-3 text-base font-medium rounded-lg transition-colors"
          >
            Logout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="mt-6">
            <ProfileForm />
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="mt-6">
            <OrderHistory />
          </div>
        </TabsContent>

        {isLoggingOut && (
          <TabsContent value="logout">
            <div className="flex justify-center py-10">
              <Spinner width={8} height={8} />
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
