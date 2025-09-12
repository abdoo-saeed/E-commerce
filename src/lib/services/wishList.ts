import { getUserToken } from "../server.utils";


//add item to wishList
export async function addWishItem(productId:string) {
  const finalToken = await getUserToken();

  //fetch the data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`, {
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
  console.log(res);

  if (!res.ok) {
    return { error: res.statusText };
  }
  const  data  = await res.json();
  console.log(data);
  return data;
}



//get wishlist items
export default async function getWishList() {
  const finalToken = await getUserToken();

  //fetch the data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`, {
    method:"GET",
   
    headers: {
      token: finalToken,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  

  if (!res.ok) {
    return { error: res.statusText };
  }
  const  data  = await res.json();
  
  return data;
}




//remove item from wishList
export async function removeWishItem(id:string) {
  const finalToken = await getUserToken();

  //fetch the data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist/${id}`, {
    method:"DELETE",
   
    headers: {
      token: finalToken,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  console.log(res);

  if (!res.ok) {
    return { error: res.statusText };
  }
  const  data  = await res.json();
  console.log(data);
  return data;
}