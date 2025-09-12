import { getAllBrands } from "@/lib/services/brands";
import { IBrands } from "@/types/Brands.type";
import BrandCard from "./_components/brandCard";
export default async function Page() {

    const brands = await getAllBrands();

    return (
        <>
        <div className="text-center font-bold text-4xl my-6 text-green-600">
            ALL BRANDS
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3    gap-6 p-4 mt-6 max-w-7xl mx-auto">
                {brands.map((p: IBrands) => <BrandCard key={p._id} product={p} />)}
               </section>
               </>
        
    )
}


