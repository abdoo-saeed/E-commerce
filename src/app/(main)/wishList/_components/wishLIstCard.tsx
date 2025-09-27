"use client"
import { Star1, MinusCirlce } from "iconsax-react";
import Link from "next/link";
import { addCartItem } from "@/lib/services/cart";
import { useCart } from "@/context/cartContext";
import { removeWishItem } from "@/lib/services/wishList";
import { toast } from "sonner";
import { IWish } from "@/types/WishList.type";
import { useRouter } from "next/navigation";

export default function WishItemCard({ product }: { product: IWish }) {
  const { getCartData } = useCart();
  const router = useRouter();

  const handleAddToCart = async () => {
    await toast.promise(addCartItem(product?._id), {
      loading: "Adding product...",
      success: "Product added to cart",
      error: "Failed to add product",
    });
    getCartData();
  };

  const handleRemoveWish = async () => {
    await removeWishItem(product._id);
    toast.success("Removed from wishlist");
    router.refresh();
  };

  return (
    <div className="group my-6 max-w-xs sm:max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 p-4 flex flex-col relative">
      {/* Product Image */}
      <div className="relative p-3">
        <img
          src={product?.imageCover}
          alt={product?.title || "Product"}
          className="w-full h-48 object-cover  rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Remove from Wishlist Button */}
        <button
          onClick={handleRemoveWish}
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md transform scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:bg-red-100"
        >
          <MinusCirlce size="28" color="#e11d48" />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`}>
          <h2 className="text-lg font-semibold text-gray-800 truncate hover:text-green-600 transition-colors text-left">
            {product?.title}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 mt-1 text-left">{product?.brand?.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star1
              key={i}
              size={18}
              variant="Bold"
              color={i < Math.round(product?.ratingsAverage || 0) ? "#facc15" : "#d1d5db"}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            {product?.ratingsAverage?.toFixed(1) || "0.0"}
          </span>
        </div>

        {/* Price */}
        <p className="text-xl font-bold text-green-600 mt-3 text-left">
          ${product?.price}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="cursor-pointer mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
      >
        Add to Cart
      </button>
    </div>
  );
}