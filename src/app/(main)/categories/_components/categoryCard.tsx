import { ICategories } from "@/types/Categories.type"
import Image from "next/image";
import Link from "next/link";
function CategoryCard({product}:{product:ICategories}) {

    return (
        <>
        <Link href={`/categories/${product._id}`}>
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-green-500 transition-shadow duration-300 cursor-pointer bg-white">
      {/* Image */}
      <div className="w-full h-56">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={224}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Category name */}
      <div className="p-4 text-center font-semibold text-gray-800">
        {product.slug}
      </div>
    </div>
    </Link>
    </>
    )
}


export default CategoryCard
