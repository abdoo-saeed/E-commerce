"use client"

import WishItemCardSkeleton from "./_components/wishlistCardSkelaton"

export default function CategoriesPageSkeleton() {
  return (
    <>
      <div className="text-center font-bold text-4xl my-6 text-green-600">
        Your Wishlist
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 mt-6 max-w-5xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <WishItemCardSkeleton key={i} />
        ))}
      </section>
    </>
  )
}
