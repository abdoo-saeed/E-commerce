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




// schema
const formSchema = z.object({
  details: z.string().min(5),
  phone: z.string().min(11).max(11),
  city: z.string(),
  payment_method: z.enum(["cod", "credit"]), //restrict to only "cod" | "credit"
})

// type from schema
type orderData = z.infer<typeof formSchema>

export default function OrderSummary() {
  const { cart } = useCart()

 
  const form = useForm<orderData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // default values to solve undefined error
      details: "",
      phone: "",
      city: "",
      payment_method: "cod",
    },
  })

  const router = useRouter()
   const { getCartData } = useCart();

  // handle checkout submit
  const handleCheckOut = (data: orderData) => {
    const formData:CheckoutFormData = {
      shippingAddress: {
        details: data.details,
        phone: data.phone,
        city: data.city,
      },
    }


    if (data.payment_method === "cod") {
      console.log("cod")
      checkoutCOD(cart?.cartId, formData)
      getCartData()

    } else {
      console.log("credit")
      checkoutCredit(cart?.cartId, formData)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCheckOut)}
          className="space-y-8 max-w-96 mx-auto my-20 bg-white p-6 rounded-2xl"
        >
          <h3 className="text-center font-bold text-green-500 bg-gray-100 p-2 rounded-2xl">
            checkout
          </h3>

          {/* cart summary ======================================================== */}
          <div className="bg-gray-100 p-2 rounded-xl">
            <p className="font-bold">
              number of items :{" "}
              <span className="text-green-500">{cart?.numOfCartItems} items</span>
            </p>
            <p className="font-bold">
              total price :{" "}
              <span className="text-green-500">
                $ {cart?.data?.totalCartPrice ?? 0}
              </span>
            </p>
          </div>

          {/* details Field ======================================================== */}
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>order details</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* phone Field ======================================================== */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>your phone</FormLabel>
                <FormControl>
                  <Input placeholder="01*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* city Field ======================================================== */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>your city</FormLabel>
                <FormControl>
                  <Input placeholder="giza" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* payment_method Field radio button (COD)======================================================== */}
          <div className="flex justify-around gap-4">
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>COD</FormLabel>
                  <FormControl>
                    <input
                      type="radio"
                      value="cod"
                      checked={field.value === "cod"} 
                      onChange={field.onChange}
                      className="size-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* payment_method Field radio button (CREDIT)======================================================== */}
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CREDIT</FormLabel>
                  <FormControl>
                    <input
                      type="radio"
                      value="credit"
                      checked={field.value === "credit"} 
                      onChange={field.onChange}
                      className="size-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="cursor-pointer" type="submit">
            Go To Checkout
          </Button>
        </form>
      </Form>
    </div>
  )
}
