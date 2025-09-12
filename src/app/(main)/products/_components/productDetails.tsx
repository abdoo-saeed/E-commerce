"use client"
import React from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; // carousel component
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Iproduct } from '@/types/products.type';
import Image from 'next/image';



function ProductDetails({product}:{product:Iproduct}) {
 

  const settings = {
    customPaging: function(i: number) {
      return (
        <div>
        <a >
          <img src={`${product.images[i + 1]}`} />
        </a>
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="mt-10 mb-10 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Image Slider */}
      <div className="slider-container pb-4">
      <Slider {...settings} >
        <div className=''>
          <img src={product.images[0]} />
        </div>
        <div>
          <img src={product.images[1]} />
        </div>
        <div>
          <img src={product.images[2]} />
        </div>
        <div>
          <img src={product.images[3]} />
        </div>
      </Slider>
    </div>
      

      {/* Right: Product Info */}
      <div className="flex flex-col justify-between mt-10">
        <div>
          <h2 className="text-xl font-bold mb-2">{product.title.split(" ").slice(0, 3).join(" ")}</h2>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 text-lg">★ ★ ★ ★ ☆</span>
            <span className="ml-2 text-gray-600 text-sm">{product.ratingsAverage} ({product.ratingsQuantity}  views) </span>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-4 mt-5">${product.price}</p>
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-gray-600 text-sm mb-4">
            {product.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-700 mb-4 mt-5">
            <span>📦 Available Stock: <b>{product.quantity} units</b></span>
            <span>🔥 Total Sold: <b>{product.sold} units</b></span>
          </div>
        </div>

        <button className="cursor-pointer w-full bg-black text-white py-3 rounded-full mt-4 hover:bg-gray-800 transition">
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails
