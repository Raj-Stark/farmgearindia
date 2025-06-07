"use client";
import React, { useState } from "react";
import { Typography } from "../ui/typography";
import { Input } from "../ui/input";
import { Heart, LogIn, Menu, Search, ShoppingCart, User } from "lucide-react";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai/react";
import { userAtom } from "@/app/atoms/userAtom";

const Navbar = () => {
  const router = useRouter();
  const user = useAtomValue(userAtom);

  const [open, setOpen] = useState(false);

  const handleRouteChange = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <header className="bg-background border-b border-border shadow-sm">
      <nav className="flex items-center justify-between gap-2 px-3 py-2 xl:container xl:mx-auto xl:px-6 xl:py-4">
        {/* Logo */}
        <Typography variant="h4" className="text-lg font-semibold">
          Farm Gear
        </Typography>

        {/* Search Input */}
        <div className="flex-1 mx-2 max-w-[200px] sm:max-w-[250px] md:max-w-[600px]">
          <Input
            placeholder="Search here..."
            className="h-8 rounded-md border border-border px-3 pl-9 text-sm shadow-sm placeholder:text-xs sm:h-9 sm:pl-10 md:w-full"
            suffix={
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            }
          />
        </div>

        {/* Desktop actions */}
        <div className="hidden xl:flex items-center gap-4">
          <Button variant="ghost" className="gap-1 hover:text-primary">
            <Heart size={20} />
            <Typography variant="small" className="font-semibold">
              Wishlist
            </Typography>
          </Button>
          <Button variant="ghost" className="gap-1 hover:text-primary">
            <ShoppingCart size={20} />
            <Typography variant="small" className="font-semibold">
              Cart
            </Typography>
          </Button>

          {user.isLoggedIn ? (
            <Button variant="default" onClick={() => router.push("/profile")}>
              <User size={18} />
              <Typography
                variant="small"
                className="text-background font-semibold"
              >
                {user.name}
              </Typography>
            </Button>
          ) : (
            <Button variant="default" onClick={() => router.push("/login")}>
              <Typography
                variant="small"
                className="text-background font-semibold"
              >
                Login/Register
              </Typography>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="xl:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Menu size={20} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader className="pb-0">
                <SheetTitle className="text-lg">Menu</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-4 p-4">
                <li
                  className="flex items-center gap-3 hover:text-primary cursor-pointer"
                  onClick={() => handleRouteChange("/wishlist")}
                >
                  <Heart size={18} />
                  <Typography variant="small">Wishlist</Typography>
                </li>
                <li
                  className="flex items-center gap-3 hover:text-primary cursor-pointer"
                  onClick={() => handleRouteChange("/cart")}
                >
                  <ShoppingCart size={18} />
                  <Typography variant="small">Cart</Typography>
                </li>
                <li
                  className="flex items-center gap-3 hover:text-primary cursor-pointer"
                  onClick={() =>
                    handleRouteChange(user.isLoggedIn ? "/profile" : "/login")
                  }
                >
                  {user.isLoggedIn ? (
                    <>
                      <User size={18} />
                      <Typography variant="small">{user.name}</Typography>
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      <Typography variant="small">Login/Register</Typography>
                    </>
                  )}
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
