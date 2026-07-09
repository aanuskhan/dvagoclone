"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      img: "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2FWeb%2520Banner%2Fcac%2520new%2520webb%2520banner.jpg&w=1280&q=50",
      title: "Stay Energized Everyday",
      subtitle: "With a Free Glass on Every Purchase",
      bg: "from-orange-400 to-orange-300",
      link: "/vitamins",
    },
    {
      id: 2,
      img: "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2FWeb%2520Banner%2FIcan%2520new%2520web%2520banner.png&w=1280&q=50",
      title: "Take Care of Your Health",
      subtitle: "Premium Healthcare Products",
      bg: "from-green-400 to-green-300",
      link: "/medicine",
    },
    {
      id: 3,
      img: "https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2FWeb%2520Banner%2Fluckycore%2520web%2520banner.png&w=1280&q=50",
      title: "Baby Care Essentials",
      subtitle: "Everything for Your Little One",
      bg: "from-blue-400 to-blue-300",
      link: "/category/baby-care",
    },
    {
      id: 4,
      img: "https://img.freepik.com/premium-psd/3d-render-medical-equipment-concept-banner_382786-7.jpg",
      title: "Medical Devices",
      subtitle: "Accurate & Reliable",
      bg: "from-purple-400 to-purple-300",
      link: "/category/devices",
    },
  ];

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <Link
            key={slide.id}
            href={slide.link}
            className="min-w-full relative block"
          >
            <div
              className={`w-full h-[280px] md:h-[400px] bg-gradient-to-r ${slide.bg} flex items-center justify-between px-8 md:px-16`}
            >
              {/* Left Text */}
              <div className="text-white max-w-xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl font-semibold drop-shadow">
                  {slide.subtitle}
                </p>
              </div>

              {/* Right Image */}
              <div className="hidden md:block">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="h-[300px] object-contain"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
