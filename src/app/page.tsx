
import MainSlider from "./_components/ui/mainslider";
import { Suspense } from "react";
import  ProductGridSkeleton  from "./(main)/products/_components/productGridSkelaton";
import ProductGrid from "./(main)/products/_components/productGrid";
import { getUserCart } from "@/lib/services/cart";
import { getAllCategories } from "@/lib/services/categories";
import CategoriesSlider from "./(main)/categories/_components/categorySlider";


export default async function Home() {

const cartData = await getUserCart() 
console.log(cartData);
 const categories = await getAllCategories()

  return (

   
    <main>

      
       <MainSlider />
       <CategoriesSlider categories={categories} />
       
       <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGrid />
       </Suspense>

    </main>
  

  );
}
