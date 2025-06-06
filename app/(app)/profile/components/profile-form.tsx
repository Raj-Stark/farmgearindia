import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Typography } from "@/components/ui/typography";
import { Textarea } from "@/components/ui/textarea";

const ProfileForm = () => {
  return (
    <div className=" mx-auto bg-white p-6 rounded-lg shadow">
      <Typography variant="h3">Your Profile</Typography>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4  text-primary">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            className="w-full  h-10 mt-2"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full  h-10  mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            placeholder="123 Farm Lane"
            className="w-full h-20 mt-2"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="(555) 123-4567"
            className="w-full  h-10  mt-2"
          />
        </div>
        <div>
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            placeholder="Enter your pincode"
            className="w-full  h-10  mt-2"
          />
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Enter your city"
            className="w-full  h-10  mt-2"
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            placeholder="Enter your state"
            className="w-full  h-10  mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="Enter your country"
            className="w-full  h-10  mt-2"
          />
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
