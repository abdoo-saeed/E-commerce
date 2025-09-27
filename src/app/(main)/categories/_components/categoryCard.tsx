"use client"

import { ICategories } from "@/types/Categories.type"
import Image from "next/image";
import Link from "next/link";
function CategoryCard({product}:{product:ICategories}) {

    return (
        <>
        <Link href={`/categories/${product._id}`}>
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-green-500 transition-shadow duration-300 cursor-pointer bg-white">
      {/* Image */}
      <div className="w-full h-full flex flex-col items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 sm:h-48 object-cover rounded-xl"
        />
      </div>

      {/* Category name */}
      <div className="mt-2 text-center font-medium text-sm sm:text-base">
        {product.slug}
      </div>
    </div>
    </Link>
    </>
    )
}


export default CategoryCard
