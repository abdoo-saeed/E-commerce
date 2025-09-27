"use client"
import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Custom Arrows
const NextArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-green-500 hover:text-white rounded-full p-2 shadow-md transition"
    >
      <ChevronRight size={22} />
    </button>
  )
}

const PrevArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-green-500 hover:text-white rounded-full p-2 shadow-md transition"
    >
      <ChevronLeft size={22} />
    </button>
  )
}

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots custom-dots",
  }

  const images = [
    "/assets/original-4e0e24e5a6295c4376c8b7a921bfdad6.webp",
    "/assets/original-22acd46c58d4fc105ca2154ede02c323.webp",
    "/assets/original-aec79b0d01e953da51578ca653859002.webp",
  ]

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="px-2">
            <Image
              src={src}
              alt={`Slider Image ${index + 1}`}
              width={1200}
              height={400}
              className="w-full h-[500px] object-cover rounded-2xl"
              priority={index === 0}
            />
          </div>
        ))}
      </Slider>

      {/* Custom dots styling */}
      <style jsx global>{`
        .custom-dots {
          bottom: -35px;
        }
        .custom-dots li button:before {
          font-size: 12px;
          color: #9ca3af; /* gray-400 */
          opacity: 1;
        }
        .custom-dots li.slick-active button:before {
          color: #22c55e; /* green-500 */
        }
      `}</style>
    </div>
  )
}
