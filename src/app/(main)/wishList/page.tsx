
import getWishList from "@/lib/services/wishList"
import { IWish } from "@/types/WishList.type"
import WishItemCard from "./_components/wishLIstCard"

import Link from "next/link"
import {ShoppingCart} from 'iconsax-react'


export default async function Page() {

    
      const response = await getWishList()
     const products: IWish[] = response?.data 
      
     console.log(products);
     
   
    
    
    if (products?.length) {
        return (
          <div className="products mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-4">
            {products.map((p: IWish) => (
              <WishItemCard product={p} key={p._id} />
            ))}
          </div>
        );
      } else {
        return (
          <div className="emptyMsg text-center w-full">
            <p className="text-4xl my-4 font-bold">No elements in the wish list</p>
            <p className="text-4xl my-4 font-bold">make sure you are logged in first</p>
            
            <Link
              href="/Auth/login"
              className="w-40 bg-black text-white p-4 rounded-2xl mb-10 inline-block me-2"
              
            >
              LOGIN
              
            </Link>
            <Link
              href="/"
              className="w-40 bg-black text-white p-4 rounded-2xl mb-10 inline-block"
            >
              Go to Home
              
            </Link>
          </div>
        );
      }
    
    


   
   
}


