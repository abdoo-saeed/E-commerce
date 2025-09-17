
import React from 'react'
import   ProductCardSkeleton  from './productCardSkelaton';

interface ProductGridSkeletonProps {
    count?: number;
}

function ProductGridSkeleton({ count =40 }: ProductGridSkeletonProps) {

   return (
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4 mt-10 px-3 ">
           {Array.from({ length: count }).map((_, index) => (
               <ProductCardSkeleton key={index} />
           ))}
       </div>
   )
}

export default ProductGridSkeleton
