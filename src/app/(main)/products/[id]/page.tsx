import { getProductDetails } from "@/lib/services/products"
import { getSpecieficCategory } from "@/lib/services/categories"
import { notFound } from "next/navigation"
import ProductDetails from "../_components/productDetails"
import ProductCard from "@/app/(main)/products/_components/productCard"
import { Iproduct } from "@/types/products.type"

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params

  // Get product details
  const product = await getProductDetails(id)
  if (!product) {
    notFound()
  }

  // Get related products by category
  const relatedProducts: Iproduct[] = await getSpecieficCategory(product.category._id)

  // Exclude the current product and take only 6
  const filteredProducts = relatedProducts
    .filter((p) => p._id !== product._id)
    .slice(0, 6)

  return (
    <div className="max-w-6xl mx-auto ">
      {/* Main product details */}
      <ProductDetails product={product} />

      {/* More you may like */}
      {filteredProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-4xl font-bold m-15 text-center">More you may like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-5">
            {filteredProducts.map((p) => (
              <ProductCard product={p} key={p._id || p.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
