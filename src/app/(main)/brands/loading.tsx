"use client"

import CategoryCardSkeleton from "@/app/(main)/categories/_components/categoryCardSkelaton"

export default function CategoriesPageSkeleton() {
  return (
    <>
      <div className="text-center font-bold text-4xl my-6 text-green-600">
        ALL CATEGORIES
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 mt-6 max-w-5xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </section>
    </>
  )
}
