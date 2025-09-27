
import React from 'react'
import   ProductCardSkeleton  from './productCardSkelaton';

interface ProductGridSkeletonProps {
    count?: number;
}

function ProductGridSkeleton({ count =40 }: ProductGridSkeletonProps) {

   return (
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-4 mt-10 mx-2 ">
           {Array.from({ length: count }).map((_, index) => (
               <ProductCardSkeleton key={index} />
           ))}
       </div>
   )
}

export default ProductGridSkeleton
