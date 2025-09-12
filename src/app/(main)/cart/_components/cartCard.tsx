import { Trash } from "iconsax-react";
import { useCart } from "@/context/cartContext";
import { ICart } from "@/types/Cart.type";
import { removeCartItem, updateCartCount } from "@/lib/services/cart";
import { useEffect, useState } from "react";

export default function CartItemCard({ item }: { item: ICart }) {
  const { getCartData } = useCart();
  const [count, setCount] = useState<number>(item.count); // start with item count

  const handleRemove = async () => {
    await removeCartItem(item?.product?._id);
    getCartData();
  };

  const handleMinus = async () => {
    if (count > 1) {
      const data = await updateCartCount(item?.product?._id,);
      setCount(data?.data?.count ?? count - 1);
      getCartData();
    }
  };

  const handlePlus = async () => {
    const data = await updateCartCount(item?.product?._id);
    setCount(data?.data?.count ?? count + 1);
    getCartData();
  };

  useEffect(() => {
    setCount(item.count); // keep local state synced when props change
  }, [item.count]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl shadow-md gap-4">
      {/* Left: Product Image & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={item?.product?.imageCover}
          alt={item?.product?.title || "Product Image"}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{item?.product?.title}</h2>
          <p className="text-sm text-gray-500">{item?.product?.brand?.name}</p>
          <p className="text-sm text-gray-500">{item?.product?.brand?.category}</p>
          <p className="text-lg font-bold mt-1 text-green-500">${item?.price}</p>

          {/* Quantity (mobile only, under text) */}
          <div className="flex sm:hidden items-center border rounded-lg mt-2 w-fit">
            <button
              onClick={handleMinus}
              className="px-3 py-1 text-xl text-red-500 font-bold"
            >
              -
            </button>
            <span className="px-4">{count}</span>
            <button
              onClick={handlePlus}
              className="px-3 py-1 text-xl text-green-500 font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Desktop Quantity + Trash */}
      <div className="flex items-center gap-6">
        {/* Quantity (desktop only) */}
        <div className="hidden sm:flex items-center border rounded-lg">
          <button
            onClick={handleMinus}
            className="px-3 py-1 text-xl text-red-500 font-bold"
          >
            -
          </button>
          <span className="px-4">{count}</span>
          <button
            onClick={handlePlus}
            className="px-3 py-1 text-xl text-green-500 font-bold"
          >
            +
          </button>
        </div>

        {/* Trash: always at end */}
        <button className="cursor-pointer" onClick={handleRemove}>
          <Trash size="25" variant="Bold" color="red" />
        </button>
      </div>
    </div>
  );
}
