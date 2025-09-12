import React from "react";
import { getSpecificBrandProducts } from "@/lib/services/brands";
import { Iproduct } from "@/types/products.type";
import ProductCard from "@/app/(main)/products/_components/productCard";
import Link from "next/link";
import { ShoppingCart } from "iconsax-react";

interface Props {
  params: {
    id: string;
  };
}

async function Page(props: Props) {
  const { params } = props;
  const brandId = await params.id;
    const data = await getSpecificBrandProducts(brandId);

  if (data.data.length) {
    return (
      <div className="products mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {data.data.map((p: Iproduct) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="emptyMsg text-center w-full">
        <p className="text-4xl my-4 font-bold">No elements in this brand</p>
        <p className="text-sm mb-10">See another one</p>
        <Link
          href="/brands"
          className="w-40 bg-black text-white p-4 rounded-2xl mb-10 inline-block"
        >
          Go to brands
          <ShoppingCart className="inline-block mx-3" />
        </Link>
      </div>
    );
  }
}



export default Page;
