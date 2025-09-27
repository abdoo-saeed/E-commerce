"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white">
      {/* Image Skeleton */}
      <div className="w-full h-56">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Text Skeleton */}
      <div className="p-4 text-center">
        <Skeleton className="h-5 w-24 mx-auto" />
      </div>
    </div>
  )
}
