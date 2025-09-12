
import { getUserToken } from "../server.utils";
import { redirect } from "next/navigation";

import { CheckoutFormData } from "@/types/Checkout.type";

//get userCart function
export async function getUserCart() {
  const token = await getUserToken();

  //fetch the data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`, {
    method:"GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  // console.log(res);

  if (!res.ok) {
    return { error: res.statusText };
  }
  const  data  = await res.json();
  // console.log(data);
  return data;
}

//=====================================================================================

//add item to cart
export async function addCartItem(productId:string) {
  const finalToken = await getUserToken();

  //fetch the data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`, {
    method:"POST",
    body:JSON.stringify(
      {
        productId
      }),
    headers: {
      token: finalToken,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  // console.log(res);

  if (!res.ok) {
    return { error: res.statusText };
  }
  const  data  = await res.json();
  // console.log(data);
  return data;
}


//=====================================================================================

//remove item from cart
export async function removeCartItem(id?:string) {
  const token = await getUserToken();

  //fetch the data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${id ? id : ''}`, {
    method:"DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  // console.log(res);

  if (!res.ok) {
    return { error: res.statusText };
  }
  const  data  = await res.json();
  // console.log(data);
  return data;
}

//=====================================================================================

//cash payment
export async function checkoutCOD(cartId:string, formData:CheckoutFormData) {
  const token = await getUserToken();

  //fetch the data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/${cartId}`, {
    method:"POST",
    body:JSON.stringify(formData),
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  // console.log(res);

  if (!res.ok) {
    return { error: res.statusText };
  }
  const  data  = await res.json();
  // console.log(data);
  return data;
}

//=====================================================================================

//credit payment
export async function checkoutCredit(cartId:string, formData:CheckoutFormData) {
  const token = await getUserToken();

  //fetch the data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_REDIRECT_URL}`, {
    method:"POST",
    body:JSON.stringify(formData),
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  // console.log(res);

  if (!res.ok) {
    return { error: res.statusText };
  }
  const  data  = await res.json();
  // console.log(data);
  redirect(data?.session.url)
  return data;
}

//=====================================================================================

// update cart count
export async function updateCartCount(id?:string) {
  const token = await getUserToken();

  //fetch the data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${id}`, {
    method:"PUT",
    body:JSON.stringify({
      count : "1"
    }),
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  // console.log(res);

  if (!res.ok) {
    return { error: res.statusText };
  }
  const  data  = await res.json();
  // console.log(data);
  return data;
}