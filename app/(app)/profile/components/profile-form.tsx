"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Typography } from "@/components/ui/typography";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { toast } from "sonner";
import Spinner from "@/components/custom/Spinner";

interface FormData {
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

const ProfileForm = () => {
  const getCurrentUserEndpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}user/getCurrentUser`;
  const updateUserEndpoint = `${process.env.NEXT_PUBLIC_LOCAL_URL}user/updateUser`;

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name || "");
      setValue("email", userData.email || "");
      setValue("street", userData?.address?.street || "");
      setValue("city", userData?.address?.city || "");
      setValue("state", userData?.address?.state || "");
      setValue("zip", userData?.address?.zip || "");
      setValue("country", userData?.address?.country || "");
      setValue("phone", userData?.phone || "");
    }
  }, [userData, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const address = {
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
      };
      await axios.patch(
        updateUserEndpoint,
        { name: data.name, email: data.email, phone: data.phone, address },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("User successfully updated!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.msg || "Failed to update user!";
        toast.error(errorMessage);
      } else {
        toast.error("Failed to update user!");
      }
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  if (isLoading) return <Spinner width={30} height={30} />;
  if (isError) return <Typography>Error loading user data</Typography>;

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow">
      <Typography variant="h3">Your Profile</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 "
      >
        {/* Name */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                placeholder="Enter your full name"
                className="w-full h-10 mt-2"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full h-10 mt-2"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <Label htmlFor="street">Address</Label>
          <Controller
            name="street"
            control={control}
            rules={{ required: "Street is required" }}
            render={({ field }) => (
              <Textarea
                {...field}
                id="street"
                placeholder="123 Farm Lane"
                className="w-full h-20 mt-2 resize-none"
              />
            )}
          />
          {errors.street && (
            <p className="text-red-600 text-sm">{errors.street.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <Input
                {...field}
                id="phone"
                placeholder="(555) 123-4567"
                className="w-full h-10 mt-2"
              />
            )}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Zip */}
        <div>
          <Label htmlFor="zip">Pincode</Label>
          <Controller
            name="zip"
            control={control}
            rules={{ required: "Pincode is required" }}
            render={({ field }) => (
              <Input
                {...field}
                id="zip"
                placeholder="Enter your pincode"
                className="w-full h-10 mt-2"
              />
            )}
          />
          {errors.zip && (
            <p className="text-red-600 text-sm">{errors.zip.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city">City</Label>
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <Input
                {...field}
                id="city"
                placeholder="Enter your city"
                className="w-full h-10 mt-2"
              />
            )}
          />
          {errors.city && (
            <p className="text-red-600 text-sm">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <Label htmlFor="state">State</Label>
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field }) => (
              <Input
                {...field}
                id="state"
                placeholder="Enter your state"
                className="w-full h-10 mt-2"
              />
            )}
          />
          {errors.state && (
            <p className="text-red-600 text-sm">{errors.state.message}</p>
          )}
        </div>

        {/* Country */}
        <div className="md:col-span-2">
          <Label htmlFor="country">Country</Label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <Input
                {...field}
                id="country"
                placeholder="Enter your country"
                className="w-full h-10 mt-2"
              />
            )}
          />
          {errors.country && (
            <p className="text-red-600 text-sm">{errors.country.message}</p>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button
            type="submit"
            variant={"destructive"}
            className="bg-green-500 hover:bg-green-600"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
