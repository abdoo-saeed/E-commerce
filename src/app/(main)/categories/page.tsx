import { Category } from "iconsax-react";
import ProductCardSkeleton from "../products/_components/productCardSkelaton";
import CategoryCard from "./_components/categoryCard";
import { getAllCategories } from "@/lib/services/categories";

import { ICategories } from "@/types/Categories.type";



export default async function Page() {

     const category =await getAllCategories()
     console.log(category)
    return (
        <>
        <div className="text-center font-bold text-4xl my-6 text-green-600">
            ALL CATEGORIES
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 p-4 mt-6 max-w-5xl mx-auto">
                {category.map((p: ICategories) => <CategoryCard key={p._id} product={p} />)}
               </section>
               </>
    )
}


