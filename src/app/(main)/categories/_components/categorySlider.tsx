"use client"

import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import CategoryCard from "@/app/(main)/categories/_components/categoryCard"
import { ICategories } from "@/types/Categories.type"

interface Props {
  categories: ICategories[]
}

const CategoriesSlider = ({ categories }: Props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // how many cards per view
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1},
      },
    ],
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="px-3">
            <CategoryCard product={category} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CategoriesSlider
