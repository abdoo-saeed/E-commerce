import { getAllProducts } from "@/lib/services/products";
import ProductCard from "./productCard";
import { Iproduct } from "@/types/products.type";
async function ProductGrid() {

    //import get all products from services
    const products = await getAllProducts();

   return (
  // Product List => map to each product
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-4 mt-10 mx-2">
  {products.map((p: Iproduct) => (
    <ProductCard key={p._id} product={p} />
  ))}
</section>

)

}

export default ProductGrid
