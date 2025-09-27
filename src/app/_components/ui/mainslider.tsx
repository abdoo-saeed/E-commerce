"use client"
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    // nextArrow:true ,
    // prevArrow: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,

        //  autoplaySpeed:1000,
        // autoplay: true,
   
  };
  return (  
    <Slider className="p-6 rounded-3xl" {...settings}>
      <div className="w-2xl rounded-2xl px-8 ">

  <Image
    src="/assets/original-4e0e24e5a6295c4376c8b7a921bfdad6.webp"
    alt="Slider Image 1"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full rounded-2xl  h-[400px] object-center "
  />
</div>
     
      
     
     
        <div className="w-2xl px-8">
  <Image
    src="/assets/original-22acd46c58d4fc105ca2154ede02c323.webp"
    alt="Slider Image 1"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full rounded-2xl h-[400px] object-center "
  />
</div>
        <div className="w-2xl px-8" >
  <Image
    src="/assets/original-aec79b0d01e953da51578ca653859002.webp"
    alt="Slider Image 1"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full rounded-2xl h-[400px] object-center "
  />
</div>
     
    </Slider>
  );
}