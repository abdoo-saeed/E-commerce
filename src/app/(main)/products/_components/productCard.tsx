"use client"
import { Iproduct } from "@/types/products.type";
import { Heart, Star1 } from "iconsax-react";
import { useState } from "react";
import Link from "next/link";
import {addCartItem} from "@/lib/services/cart"
import { useCart } from "@/context/cartContext";
import { addWishItem } from "@/lib/services/wishList"
import { removeWishItem } from "@/lib/services/wishList"
import { HelpCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { getUserToken } from "@/lib/server.utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function ProductCard({ product }: { product: Iproduct }) {
  const [wish, setWish] = useState(false);



  const {getCartData} = useCart()
 

   const {status} =useSession()
   const router = useRouter()
  const handleAddToCart =async ()=>{
  
if(status === "authenticated"){
    await toast.promise(addCartItem(product?._id),{
      loading:"adding product..",
      success:"product added",
      error:"can not be added"
    })
    // console.log(data);
    getCartData()
  }else {
    toast.error("you must login first")
    router.replace("/Auth/login")
  }
  }


   const handleAddToWish =async ()=>{
  
if(status === "authenticated"){
    await toast.promise(addWishItem(product?._id),{
      loading:"adding product to wishlist..",
      success:"product added to wishlist",
      error:"can not be added"
    })
    // console.log(data);
    getCartData()
  }else {
    toast.error("you must login first")
    router.replace("/Auth/login")
  }
  }


  const handleRemoveWish =()=>{
    
    removeWishItem(product._id)
    toast.success("product deleted from the wishlist")
     
      
    
  }

  return (
    <div className="max-w-xl bg-gray-100 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-4 flex flex-col">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.imageCover}
          alt="Product"
          className="w-full h-48 object-cover rounded-xl"
        />

        {/* Wishlist Heart */}
        <button
          onClick={() => setWish(!wish)}
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            size={22}
            variant={wish ? "Bold" : "Linear"}
            color={wish ? "#ef4444" : "currentColor"}
            
            onClick={!wish?()=>handleAddToWish():()=>handleRemoveWish()}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <Link
          href={`/products/${product.id}`}
        >
          <h2 className="text-lg font-semibold text-gray-800 text-left">
          {product.title.split(" ").slice(0, 2).join(" ")}
        </h2></Link>
        
        <p className="text-md text-gray-500 mt-1 text-left">{product.brand.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star1
              key={i}
              size={18}
              variant="Bold"
              color={i < Math.round(product.ratingsAverage || 0) ? "#facc15" : "#d1d5db"}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            {product.ratingsAverage?.toFixed(1) || "0.0"}
          </span>
        </div>

        <p className="text-xl  font-bold text-green-600 mt-2 mb-3 text-left">
          ${product.price}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button onClick={handleAddToCart} className="cursor-pointer mt-auto w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition">
        Add to Cart
      </button>
    </div>
  );
}
