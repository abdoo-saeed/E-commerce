"use client";
import { useEffect } from "react";
import Link from "next/link";
import { SearchNormal1, ShoppingCart, Menu, Home2, Category, Heart, Shop } from "iconsax-react";
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
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { status } = useSession();
  const { cartCount, getCartData } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Brand */}
        <div className="text-2xl font-bold text-green-500 flex items-center gap-2">
          <span className="w-6 h-6 bg-green-500 rounded-full"></span>
          <Link href={"/"}>MY BRAND</Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="space-x-6 font-medium text-gray-700">
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={`hover:text-green-500 ${
                    pathname === "/" ? "text-green-600 font-semibold" : ""
                  }`}
                >
                  <Link href={"/"}>Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={"/categories"}>
                  <NavigationMenuLink
                    className={`hover:text-green-500 ${
                      pathname === "/categories"
                        ? "text-green-600 font-semibold"
                        : ""
                    }`}
                  >
                    Categories
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={"/wishList"}>
                  <NavigationMenuLink
                    className={`hover:text-green-500 ${
                      pathname === "/wishList"
                        ? "text-green-600 font-semibold"
                        : ""
                    }`}
                  >
                    Wishlist
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={"/brands"}>
                  <NavigationMenuLink
                    className={`hover:text-green-500 ${
                      pathname === "/brands"
                        ? "text-green-600 font-semibold"
                        : ""
                    }`}
                  >
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
            <Input
              placeholder="Search..."
              className="pl-10 pr-4 w-56 rounded-full border-gray-300"
            />
            <SearchNormal1
              size="18"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Cart */}
          <Link href={"/cart"} className="relative">
            <ShoppingCart size="28" color="green" className="cursor-pointer" />
            {status === "authenticated" &&  cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
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

        {/* Mobile Nav Trigger + Cart */}
        <div className="md:hidden flex items-center gap-4">
          {/* Cart */}
          <Link href={"/cart"} className="relative">
            <ShoppingCart size="28" color="green" className="cursor-pointer" />
            {status === "authenticated" &&  cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Menu */}
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
                  <li className="flex items-center gap-2">
                    <Home2 size="20" className="text-green-500" />
                    <Link
                      className={`hover:text-green-500 ${
                        pathname === "/" ? "text-green-600 font-semibold" : ""
                      }`}
                      href={"/"}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Category size="20" className="text-green-500" />
                    <Link
                      className={`hover:text-green-500 ${
                        pathname === "/categories"
                          ? "text-green-600 font-semibold"
                          : ""
                      }`}
                      href={"/categories"}
                    >
                      Categories
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart size="20" className="text-green-500" />
                    <Link
                      className={`hover:text-green-500 ${
                        pathname === "/wishList"
                          ? "text-green-600 font-semibold"
                          : ""
                      }`}
                      href={"/wishList"}
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shop size="20" className="text-green-500" />
                    <Link
                      className={`hover:text-green-500 ${
                        pathname === "/brands"
                          ? "text-green-600 font-semibold"
                          : ""
                      }`}
                      href={"/brands"}
                    >
                      Brands
                    </Link>
                  </li>
                </ul>

                {/* Search */}
                <div className="relative p-3">
                  <Input
                    placeholder="Search..."
                    className="pl-10 pr-4 rounded-full border-gray-300"
                  />
                  <SearchNormal1
                    size="18"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                {/* Auth */}
                <div className="p-3">
                  {status === "loading" ? (
                    <Skeleton className="h-5 w-12 bg-gray-400" />
                  ) : status === "authenticated" ? (
                    <Button
                      className="w-full cursor-pointer"
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
