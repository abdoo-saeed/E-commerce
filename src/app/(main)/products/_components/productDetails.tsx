"use client"
import React from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { Iproduct } from "@/types/products.type"
import Image from "next/image"
import { Package, Flame, Star } from "lucide-react"

function ProductDetails({ product }: { product: Iproduct }) {
  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={product.images[i]} alt={`thumb-${i}`} />
        </a>
      )
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className="mt-10 mb-10 mx-auto max-w-4xl  lg:w-4xl bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Image Slider */}
      <div className="slider-container pb-4 overflow-hidden">
        <Slider {...settings}>
          {product.images.map((img, i) => (
            <div key={i} className="flex items-center justify-center">
              <img
                src={img}
                alt={`product-${i}`}
                className="w-full h-96 object-cover rounded-xl bg-gray-50"
              />
            </div>
          ))}
        </Slider>

        {/* Custom styles for thumbnails */}
        <style jsx global>{`
          .slick-dots {
            position: relative;
            bottom: 0 !important;
            margin-top: 1rem;
          }
          .slick-dots li {
            width: 60px;
            height: 60px;
            margin: 0 6px;
          }
          .slick-dots li img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.5rem;
            border: 2px solid transparent;
            transition: all 0.3s ease;
          }
          .slick-dots li.slick-active img {
            border-color: #22c55e; /* Tailwind green */
            transform: scale(1.05);
          }
        `}</style>
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col justify-between mt-6">
        <div>
          {/* Brand */}
          {product.brand && (
            <div className="flex items-center gap-2 mb-4">
              {product.brand.image && (
                <Image
                  src={product.brand.image}
                  alt={product.brand.name}
                  width={40}
                  height={40}
                  className="rounded-full border"
                />
              )}
              <span className="font-semibold text-gray-700">
                {product.brand.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2">
            {product.title.split(" ").slice(0, 3).join(" ")}
          </h2>

          {/* Ratings */}
          <div className="flex items-center mb-2">
            <Star className="text-yellow-400 fill-yellow-400" size={20} />
            <span className="ml-2 text-gray-600 text-sm">
              {product.ratingsAverage} ({product.ratingsQuantity} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-3xl font-semibold text-green-600 mb-4 mt-5">
            ${product.price}
          </p>

          {/* Description */}
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>

          {/* Stock + Sold */}
          <div className="flex items-center gap-6 text-sm text-gray-700 mb-4 mt-5">
            <span className="flex items-center gap-2">
              <Package size={18} className="text-green-500" />
              <b>{product.quantity} in stock</b>
            </span>
            <span className="flex items-center gap-2">
              <Flame size={18} className="text-red-500" />
              <b>{product.sold} sold</b>
            </span>
          </div>
        </div>

        {/* Add to Cart */}
        <button className="cursor-pointer w-full bg-green-600 text-white py-3 rounded-full mt-4 hover:bg-green-700 transition flex items-center justify-center gap-2">
          🛒 Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
