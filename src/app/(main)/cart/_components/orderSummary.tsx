"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cartContext"
import { checkoutCOD, checkoutCredit } from "@/lib/services/cart"
import { CheckoutFormData } from "@/types/Checkout.type"
import { useRouter } from "next/navigation"
import { useState } from "react"

// schema
const formSchema = z.object({
  details: z.string().min(5, "Details must be at least 5 characters"),
  phone: z.string().min(11).max(11),
  city: z.string().min(2, "City is required"),
  payment_method: z.enum(["cod", "credit"]),
})

// type from schema
type orderData = z.infer<typeof formSchema>

export default function OrderSummary() {
  const { cart, getCartData } = useCart()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<orderData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      payment_method: "cod",
    },
  })

  // handle checkout submit
  const handleCheckOut = async (data: orderData) => {
    setLoading(true)
    const formData: CheckoutFormData = {
      shippingAddress: {
        details: data.details,
        phone: data.phone,
        city: data.city,
      },
    }

    try {
      if (data.payment_method === "cod") {
        await checkoutCOD(cart?.cartId, formData)
        getCartData()
      } else {
        await checkoutCredit(cart?.cartId, formData)
      }
      router.push("/thank-you") // redirect after checkout
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCheckOut)}
          className="space-y-8 w-full max-w-md my-10 bg-white p-8 rounded-2xl shadow-md border border-gray-100"
        >
          <h3 className="text-center text-2xl font-bold text-green-600 mb-4">
            Checkout
          </h3>

          {/* cart summary==================================== */}
          <div className="bg-gray-50 p-4 rounded-xl border">
            <p className="font-semibold text-gray-700">
              Number of items:{" "}
              <span className="text-green-600">{cart?.numOfCartItems ?? 0}</span>
            </p>
            <p className="font-semibold text-gray-700 mt-2">
              Total price:{" "}
              <span className="text-green-600 text-lg">
                ${cart?.data?.totalCartPrice ?? 0}
              </span>
            </p>
          </div>

          {/* details Field ===========================*/}
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order details</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Street address, building number..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* phone Field================================ */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="01*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* city Field==================================== */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Giza" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* payment method buttons========================================= */}
          <div className="flex gap-4">
            {["cod", "credit"].map((method) => (
              <FormField
                key={method}
                control={form.control}
                name="payment_method"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Button
                        type="button"
                        variant={field.value === method ? "default" : "outline"}
                        className="w-full"
                        onClick={() => field.onChange(method)}
                      >
                        {method === "cod" ? "Cash on Delivery" : "Credit Card"}
                      </Button>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Go To Checkout"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
