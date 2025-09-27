"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import getWishList from "@/lib/services/wishList";
import { IWish } from "@/types/WishList.type";
import WishItemCard from "./_components/wishLIstCard";
import WishItemCardSkeleton from "./_components/wishlistCardSkelaton";


export default function Page() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <WishItemCardSkeleton/>;
  }

  if (status === "authenticated") {
    
    return <WishListContent />;
  }

  return null;
}

async function WishListContent() {
  const response = await getWishList();
  const products: IWish[] = response?.data;

  if (products?.length) {
    return (
      <div className="products mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-10 ms-10 gap-4">
        {products.map((p: IWish) => (
          <WishItemCard product={p} key={p._id} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="emptyMsg text-center w-full">
        <p className="text-4xl my-4 font-bold">No elements in the wish list</p>
      </div>
    );
  }
}
