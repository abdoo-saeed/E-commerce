"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SearchNormal1, ShoppingCart, Menu } from "iconsax-react";
import { useSession, signOut } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "../../../context/cartContext";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Navbar() {
  const { status, data } = useSession();

  const { cartCount,getCartData } = useCart();

  useEffect(()=>{
    getCartData();

  },[])

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Brand */}
        <div className="text-2xl font-bold text-green-500">
          <Link href={"/"}>MY BRAND</Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="space-x-6 font-medium text-gray-700">
              <NavigationMenuItem>
                
                  <NavigationMenuLink className="hover:text-green-500">
                    <Link href={"/"}>
                    Home
                    </Link>
                  </NavigationMenuLink>
                
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={"/categories"}>
                  <NavigationMenuLink className="hover:text-green-500">
                    Categories
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={"/wishList"}>
                  <NavigationMenuLink className="hover:text-green-500">
                    Wishlist
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={"/brands"}>
                  <NavigationMenuLink className="hover:text-green-500">
                    Brands
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right (Search + Cart + Auth) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Input placeholder="Search..." className="pl-10 pr-4 w-56" />
            <SearchNormal1
              size="18"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Cart */}
          <Link href={"/cart"} className="relative">
            <ShoppingCart size="28" color="green" className=" cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          <div>
            {status === "loading" ? (
              <Skeleton className="h-5 w-12 bg-gray-400" />
            ) : status === "authenticated" ? (
              <Button
                variant="ghost"
                className="text-green-600 font-semibold cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/Auth/login" })}
              >
                Logout
              </Button>
            ) : (
              <Link href={"/Auth/login"}>
                <Button
                  variant="ghost"
                  className="text-green-600 font-semibold cursor-pointer"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Nav Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Menu size="30" color="green" className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-green-600 text-xl font-bold">
                  MyBrand
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <ul className="flex flex-col space-y-4 text-gray-700 font-medium ms-4">
                  <li>
                    <Link className="hover:text-green-500 " href={"/"}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-green-500" href={"/categories"}>
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-green-500" href={"/wishList"}>
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-green-500" href={"/brands"}>
                      Brands
                    </Link>
                  </li>
                </ul>

                {/* Search */}
                <div className="relative p-3">
                  <Input placeholder="Search..." className="pl-10 pr-4" />
                  <SearchNormal1
                    size="18"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                
                {/* Cart */}
                <div className="w-10">
                <Link href={"/cart"} className="relative ">
                  <ShoppingCart
                    size="28"
                    color="green"
                    className="ms-2 cursor-pointer"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                </div>

                {/* Auth */}
                <div className="p-3">
                  {status === "loading" ? (
                    <Skeleton className="h-5 w-12 bg-gray-400" />
                  ) : status === "authenticated" ? (
                    <Button
                      className="w-full cursor-pointer "
                      onClick={() => signOut({ callbackUrl: "/Auth/login" })}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Link href={"/Auth/login"}>
                      <Button className="w-full cursor-pointer">Login</Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
