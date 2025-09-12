
import MainSlider from "./_components/ui/mainslider";
import { Suspense } from "react";
import  ProductGridSkeleton  from "./(main)/products/_components/productGridSkelaton";
import ProductGrid from "./(main)/products/_components/productGrid";
import { getUserCart } from "@/lib/services/cart";


export default async function Home() {

const cartData = await getUserCart() 
console.log(cartData);
 

  return (

   
    <main>

      
       <MainSlider />
       
       <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGrid />
       </Suspense>

    </main>
  

  );
}
