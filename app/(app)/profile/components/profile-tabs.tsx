"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from "./profile-form";
import OrderHistory from "./order-history";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { userAtom } from "@/app/atoms/userAtom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "@/components/custom/Spinner";

const ProfileTabs = () => {
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
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <div className="flex justify-between items-center ">
          <TabsList className="w-full">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="logout" onClick={() => logout()}>
              Logout
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>

        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="orders">
          <Spinner width={8} height={8} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
