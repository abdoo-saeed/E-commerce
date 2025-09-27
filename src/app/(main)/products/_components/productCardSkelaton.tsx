"use client"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductCardSkeleton() {
  return (
    <div className="max-w-xl bg-gray-100 rounded-2xl shadow-md overflow-hidden p-4 flex flex-col relative">
      {/* Product Image */}
      <div className="relative">
        <Skeleton className="w-full h-48 rounded-xl" />

        {/* Wishlist Heart */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <Skeleton className="h-5 w-2/3 mb-2 rounded mx-auto" />
        <Skeleton className="h-4 w-1/2 mb-3 rounded mx-auto" />

        {/* Rating */}
        <div className="flex items-center gap-2 justify-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded" />
          ))}
          <Skeleton className="h-4 w-8 rounded" />
        </div>

        {/* Price */}
        <Skeleton className="h-6 w-1/3 mx-auto rounded" />
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4">
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  )
}
