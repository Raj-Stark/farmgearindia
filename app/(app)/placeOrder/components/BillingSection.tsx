"use client";

import Spinner from "@/components/custom/Spinner";
import { Typography } from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { isBillingInfoValidAtom } from "@/app/atoms/billingatom";

export default function BillingSection() {
  const getCurrentUserEndpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}user/getCurrentUser`;
  const router = useRouter();
  const setIsBillingValid = useSetAtom(isBillingInfoValidAtom);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => {
      const response = await axios.get(getCurrentUserEndpoint, {
        withCredentials: true,
      });
      return response.data.user;
    },
  });

  // 🔁 Validate billing info on load
  if (userData) {
    const valid =
      !!userData.name &&
      !!userData.email &&
      !!userData.phone &&
      !!userData.address?.street &&
      !!userData.address?.city &&
      !!userData.address?.state &&
      !!userData.address?.zip &&
      !!userData.address?.country;

    setIsBillingValid(valid);
  }

  return (
    <section className="border p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-2">Billing Address</h2>
      {isLoading ? (
        <Spinner width={20} height={20} />
      ) : (
        <div className="space-y-1 text-sm">
          <div className="font-medium">{userData?.name}</div>
          <div>
            {userData?.address?.street}, {userData?.address?.city},{" "}
            {userData?.address?.state} - {userData?.address?.zip},{" "}
            {userData?.address?.country}
          </div>
          <div>
            {userData?.email}, {userData?.phone}
          </div>
        </div>
      )}

      {isError && (
        <Typography variant="small" className="text-red-400">
          Something gone wrong. Try again later.
        </Typography>
      )}

      <div
        className="text-right mt-2 text-sm text-blue-500 cursor-pointer"
        onClick={() => router.push("/profile")}
      >
        Edit
      </div>
    </section>
  );
}
