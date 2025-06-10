"use client";
import React, { useState } from "react";
import { Typography } from "../ui/typography";
import { Input } from "../ui/input";
import {
  Heart,
  LogIn,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
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
import { wishListAtom } from "@/app/atoms/wishListAtom";
import { cartAtom } from "@/app/atoms/cartAtom";
import { Badge } from "@/components/ui/badge";
import SearchOverlay from "./search-overlay";

const Navbar = () => {
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const wishList = useAtomValue(wishListAtom);
  const cartList = useAtomValue(cartAtom);

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleRouteChange = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      <header className="bg-background border-b border-border shadow-sm z-40 relative">
        <nav className="flex items-center justify-between gap-2 px-3 py-2 xl:container xl:mx-auto xl:px-6 xl:py-4">
          {/* Logo */}
          <Typography
            variant="h4"
            className="text-lg font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Farm Gear
          </Typography>

          {/* Search input/icon */}
          <div className="flex justify-between">
            <div className="flex-1 mx-2 max-w-[200px] sm:max-w-[250px] md:max-w-[600px]">
              <div className="relative hidden sm:block">
                <Input
                  placeholder="Search here..."
                  className="h-8 rounded-md border border-border px-3 pl-9  text-sm shadow-sm placeholder:text-xs sm:h-9 sm:pl-10 md:w-full cursor-pointer"
                  onFocus={() => setSearchOpen(true)}
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
              </div>
              {/* Mobile icon only */}
              <Button
                size="icon"
                variant="ghost"
                className="sm:hidden"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={20} />
              </Button>
            </div>

            {/* Desktop actions */}
            <div className="hidden xl:flex items-center gap-4">
              <Button
                variant="ghost"
                className="relative gap-1 hover:text-primary"
                onClick={() => router.push("/wishlist")}
              >
                <Heart size={20} />
                {wishList.length > 0 && (
                  <Badge className="absolute -top-1 -right-2 bg-primary text-white text-[10px] h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                    {wishList.length}
                  </Badge>
                )}
                <Typography variant="small" className="font-semibold">
                  Wishlist
                </Typography>
              </Button>

              <Button
                variant="ghost"
                className="relative gap-1 hover:text-primary"
                onClick={() => router.push("/placeOrder")}
              >
                <ShoppingCart size={20} />
                {cartList.length > 0 && (
                  <Badge className="absolute -top-1 -right-2 bg-primary text-white text-[10px] h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                    {cartList.length}
                  </Badge>
                )}
                <Typography variant="small" className="font-semibold">
                  Cart
                </Typography>
              </Button>

              {user.isLoggedIn ? (
                <Button
                  variant="default"
                  onClick={() => router.push("/profile")}
                  className="cursor-pointer"
                >
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
                      className=" "
                      onClick={() => handleRouteChange("/wishlist")}
                    >
                      <div className="flex items-center gap-3 hover:text-primary cursor-pointer relative w-fit pr-6">
                        {wishList.length > 0 && (
                          <Badge className="absolute -top-1 -right-2 bg-primary text-white text-[10px] h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                            {wishList.length}
                          </Badge>
                        )}
                        <Heart size={18} />
                        <Typography variant="small">Wishlist</Typography>
                      </div>
                    </li>
                    <li
                      className=""
                      onClick={() => handleRouteChange("/placeOrder")}
                    >
                      <div className="flex items-center gap-3 hover:text-primary cursor-pointer relative w-fit pr-6">
                        {cartList.length > 0 && (
                          <Badge className="absolute -top-1 -right-2 bg-primary text-white text-[10px] h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center">
                            {cartList.length}
                          </Badge>
                        )}
                        <ShoppingCart size={18} />
                        <Typography variant="small">Cart</Typography>
                      </div>
                    </li>
                    <li
                      className="flex items-center gap-3 hover:text-primary cursor-pointer"
                      onClick={() =>
                        handleRouteChange(
                          user.isLoggedIn ? "/profile" : "/login"
                        )
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
                          <Typography variant="small">
                            Login/Register
                          </Typography>
                        </>
                      )}
                    </li>
                  </ul>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
