"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function WishItemCardSkeleton() {
  return (
    <div className="my-6 max-w-xl bg-gray-100 rounded-2xl shadow-md overflow-hidden p-4 flex flex-col">
      {/* Product Image */}
      <div className="relative">
        <Skeleton className="w-full h-48 rounded-xl" />

        <div className="absolute top-3 right-3">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      <div className="mt-4 text-center w-full">
        <Skeleton className="h-5 w-40 mb-2" /> 
        <Skeleton className="h-4 w-24 mb-3" />
        
    
        <div className="flex items-center gap-2 justify-start mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded" />
          ))}
          <Skeleton className="h-4 w-10" />
        </div>

       
        <Skeleton className="h-6 w-20 mb-4" />
      </div>

      
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  )
}
