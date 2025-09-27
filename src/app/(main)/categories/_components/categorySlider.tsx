"use client"

import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronLeft, ChevronRight } from "lucide-react"

import CategoryCard from "@/app/(main)/categories/_components/categoryCard"
import { ICategories } from "@/types/Categories.type"

interface Props {
  categories: ICategories[]
}

// Custom Arrows
const NextArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-green-500 hover:text-white transition"
      onClick={onClick}
    >
      <ChevronRight size={22} />
    </button>
  )
}

const PrevArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-green-500 hover:text-white transition"
      onClick={onClick}
    >
      <ChevronLeft size={22} />
    </button>
  )
}

const CategoriesSlider = ({ categories }: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, 
          centerMode: false, 
          arrows: false, 
        },
      },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Shop by <span className="text-green-600">Category</span>
      </h2>

      {/* Slider */}
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="px-2">
           
            <div className="w-full">
              <CategoryCard product={category} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CategoriesSlider
