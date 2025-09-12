import { getProductDetails}  from "@/lib/services/products"
import { get } from 'http'
import { notFound } from 'next/navigation'
import React from 'react'
import ProductDetails from "../_components/productDetails"


export default async function Page({params}:{params:{id:string}}) {

 const data = await params
 const id = await data.id

 const details =await getProductDetails(id)
 console.log(details)

    return (
        <ProductDetails product={details} />
    )
}


