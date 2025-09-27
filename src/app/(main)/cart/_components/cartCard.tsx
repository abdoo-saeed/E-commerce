"use client";

import { Trash } from "iconsax-react";
import { useCart } from "@/context/cartContext";
import { ICart } from "@/types/Cart.type";
import { removeCartItem, updateCartCount } from "@/lib/services/cart";
import { useEffect, useState } from "react";

export default function CartItemCard({ item }: { item: ICart }) {
  const { getCartData } = useCart();
  const [count, setCount] = useState<number>(item.count);

  const handleRemove = async () => {
    await removeCartItem(item?.product?._id);
    getCartData();
  };

  const handleMinus = async () => {
    if (count > 1) {
      const data = await updateCartCount(item?.product?._id, count - 1);
      setCount(data?.data?.count ?? count - 1);
      getCartData();
    }
  };

  const handlePlus = async () => {
    const data = await updateCartCount(item?.product?._id, count + 1);
    setCount(data?.data?.count ?? count + 1);
    getCartData();
  };

  useEffect(() => {
    setCount(item.count);
  }, [item.count]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 gap-6">
      {/* Left: Image + Info */}
      <div className="flex items-start gap-5 w-full sm:w-auto">
        <img
          src={item?.product?.imageCover}
          alt={item?.product?.title || "Product Image"}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-md border border-gray-100"
        />

        <div className="flex flex-col justify-between flex-1">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
            {item?.product?.title}
          </h2>
          <p className="text-sm text-gray-500">{item?.product?.brand?.name}</p>
          <p className="text-xs text-gray-400">{item?.product?.brand?.category}</p>
          <p className="sm:hidden mt-2 text-lg font-bold text-green-600">${item?.price}</p>
        </div>
      </div>

      {/* Right: Price + Quantity + Trash */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
       
        <p className="hidden sm:block text-xl font-semibold text-green-600">${item?.price}</p>

        
        <div className="flex items-center border rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={handleMinus}
            className="px-3 py-1 text-lg text-red-500 hover:bg-red-50 transition font-bold"
          >
            −
          </button>
          <span className="px-4 text-gray-800 font-medium">{count}</span>
          <button
            onClick={handlePlus}
            className="px-3 py-1 text-lg text-green-600 hover:bg-green-50 transition font-bold"
          >
            +
          </button>
        </div>

       
        <button
          className="p-2 rounded-full hover:bg-red-50 transition cursor-pointer"
          onClick={handleRemove}
        >
          <Trash size="24" variant="Bold" color="#dc2626" />
        </button>
      </div>
    </div>
  );
}
