"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { toast } from "sonner" 

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
})

type FormData = z.infer<typeof formSchema>

export default function Page() {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: FormData) {
    const userData = await signIn("credentials", {
      email: data?.email,
      password: data?.password,
      redirect: false,
    })

    if (!userData?.ok) {
      toast.error("Login failed! Please check your email or password.") 
    } else {
      toast.success("Welcome back!") 
      router.push("/")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-96 mx-auto my-20 bg-white p-6 rounded-2xl"
      >
        <h3 className="text-center font-bold text-green-500 bg-gray-100 p-2 rounded-2xl">
          login
        </h3>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-end">
          <Link
            className="underline text-blue-600 font-semibold"
            href={"/Auth/register"}
          >
            did not have an account
          </Link>
        </div>

        <Button className="cursor-pointer" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
