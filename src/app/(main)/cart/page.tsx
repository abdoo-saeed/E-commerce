"use client"
import { useEffect } from "react"
import { useCart } from "@/context/cartContext"
import CartItemCard from "./_components/cartCard"
import { ICart } from "@/types/Cart.type"
import { removeCartItem } from "@/lib/services/cart"
import OrderSummary from "./_components/orderSummary"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { cart, getCartData } = useCart()
  const products = cart?.data?.products ?? []

  // redirect لو المستخدم مش عامل login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Auth/login")
      router.refresh();
    }
  }, [status, router])

  // تحميل بيانات الكارت بعد التأكد إن المستخدم authenticated
  useEffect(() => {
    if (status === "authenticated") {
      getCartData()
    }
  }, [status, getCartData])

  const handleRemoveCart = async () => {
    await removeCartItem()
    getCartData()
  }

  // loading مؤقت لحد ما السيشن أو الكارت يجهز
  if (status === "loading" || !cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading cart...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-bold text-4xl">Your Cart</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-2xl"
            onClick={handleRemoveCart}
          >
            Clear all items
          </button>
        </div>

        {/* Cart Content */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-3xl font-semibold text-black mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Add some products to see them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <section className="md:col-span-1 lg:col-span-2 flex flex-col gap-4">
              {products.map((item: ICart) => (
                <CartItemCard key={item._id} item={item} />
              ))}
            </section>

            {/* Order Summary */}
            <aside className="md:col-span-1 lg:col-span-1">
              <OrderSummary />
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
