"use client"
import { Iproduct } from "@/types/products.type";
import { Heart, Star1 } from "iconsax-react";
import { useState } from "react";
import Link from "next/link";
import { addCartItem } from "@/lib/services/cart";
import { useCart } from "@/context/cartContext";
import { addWishItem, removeWishItem } from "@/lib/services/wishList";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Iproduct }) {
  const [wish, setWish] = useState(false);
  const { getCartData } = useCart();
  const { status } = useSession();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (status === "authenticated") {
      await toast.promise(addCartItem(product?._id), {
        loading: "Adding product...",
        success: "Product added",
        error: "Failed to add",
      });
      getCartData();
    } else {
      toast.error("You must login first");
      router.replace("/Auth/login");
    }
  };

  const handleToggleWish = async () => {
    if (status !== "authenticated") {
      toast.error("You must login first");
      router.replace("/Auth/login");
      return;
    }

    if (!wish) {
      await toast.promise(addWishItem(product?._id), {
        loading: "Adding to wishlist...",
        success: "Added to wishlist",
        error: "Failed to add",
      });
    } else {
      await removeWishItem(product._id);
      toast.success("Removed from wishlist");
    }
    setWish(!wish);
  };

  return (
    <div className="group max-w-xs sm:max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 p-4 flex flex-col relative">
      {/* Product Image */}
      <div className="relative p-3">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-52 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist Heart */}
        <button
          onClick={handleToggleWish}
          className="
            absolute top-3 right-3 bg-white p-2 rounded-full shadow-md
            opacity-100 translate-y-0
            md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0
            transition-all duration-300 ease-in-out hover:bg-red-50
          "
        >
          <Heart
            size={22}
            variant={wish ? "Bold" : "Linear"}
            color={wish ? "#ef4444" : "currentColor"}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`}>
          <h2 className="text-lg font-semibold text-gray-800 truncate hover:text-green-600 transition-colors text-left">
            {product.title}
          </h2>
        </Link>

        {/* Brand with logo */}
        <div className="flex items-center gap-2 mt-1">
          {product.brand?.image && (
            <img
              src={product.brand.image}
              alt={product.brand.name}
              className="w-6 h-6 rounded-full object-contain border"
            />
          )}
          <p className="text-sm text-gray-500">{product.brand?.name}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star1
              key={i}
              size={18}
              variant="Bold"
              color={
                i < Math.round(product.ratingsAverage || 0)
                  ? "#facc15"
                  : "#d1d5db"
              }
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            {product.ratingsAverage?.toFixed(1) || "0.0"}
          </span>
        </div>

        {/* Price */}
        <p className="text-xl font-bold text-green-600 mt-3 text-left">
          ${product.price}
        </p>
      </div>

      {/* Add to Cart button */}
      <button
        onClick={handleAddToCart}
        className="
          cursor-pointer mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700
          opacity-100 translate-y-0
          md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0
          transition-all duration-300 ease-in-out
        "
      >
        🛒 Add to Cart
      </button>
    </div>
  );
}
