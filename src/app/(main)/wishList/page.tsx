
import getWishList from "@/lib/services/wishList"
import { IWish } from "@/types/WishList.type"
import WishItemCard from "./_components/wishLIstCard"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation" 
import { getServerSession } from "next-auth"
import Link from "next/link"



export default async function Page() {

  
   const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/Auth/login")
  }
    
      const response = await getWishList()
     const products: IWish[] = response?.data 
      
     console.log(products);
     
   
    
    
    if (products?.length) {
        return (<>
          <div className="text-center font-bold text-4xl my-6 text-green-600">
        Your Wishlist
      </div>
          
          <div className="products mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-5 ms-10 gap-4">
            {products.map((p: IWish) => (
              <WishItemCard product={p} key={p._id} />
            ))}
          </div>
          </>
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


