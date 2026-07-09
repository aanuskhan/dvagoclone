"use client";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CategoriesCarousel() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const categories = [
    {
      name: "Perfumes",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4sb64N6lQe6-mP_He9SG7SHW7HoqejfGpbUhY4F-RZg1jezyiYaKKdNQ&s=10",
      link: "perfume",
    },
    {
      name: "Medicine",
      img: "https://b2976109.smushcdn.com/2976109/wp-content/uploads/2019/04/tablets_750.jpg?lossy=2&strip=1&webp=1",
      link: "medicine",
    },
    {
      name: "Multivitamins",
      img: "https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/1000000029850.png",
      link: "vitamins",
    },

    {
      name: "Nebulizer",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY7kwo79RqmkFwQrbHwLFnSzpfQOxva0JNfxlh3w0Xl1Z3QUsoTDyI9hk&s=10",
      link: "others",
    },
    {
      name: "Baby Care",
      img: "https://www.meiji.com/global/food/common/img/milk-formula/milk_formula_08.jpg",
      link: "others",
    },
    {
      name: "Skin Care",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2SgUp9PVyRMNb8heHFPYBGnXhxgULBYSnCHvNngPdrwAp7-wLvpgDJA&s=10",
      link: "others",
    },
    {
      name: "Labs",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy7q6vDcVJ-ICOMYlF1i2ycRAxfZUS47Dp_KvbpncJs380l4EIGZiHV9xf&s=10",
      link: "others",
    },
    {
      name: "Food & Beverages",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNMfbAd3MGnw1NigC01Jy41Ma8fl5nfkceU7ZDIhItg9cvcqQr7czrldc&s=10",
      link: "/category/food-beverages",
    },
    {
      name: "Cough & Cold",
      img: "https://www.medisei.gr/801-thickbox_default/cough-relief-syrup.jpg",
      link: "/category/cough-cold",
    },
  ];

  // Auto scroll every 3 seconds
  useEffect(() => {
    if (isHovered) return; // Pause on hover

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        // If reached end, go back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 170, behavior: "smooth" }); // 150px card + 20px gap
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Header with arrows */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#76bc21]">Categories</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full bg-[#76bc21] text-white flex items-center justify-center hover:bg-[#5a9518] transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full bg-[#76bc21] text-white flex items-center justify-center hover:bg-[#5a9518] transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.link}
            className="flex-shrink-0 w-[150px] group"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
              <div className="h-[100px] flex items-center justify-center mb-3">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <p className="text-center text-sm text-gray-700 font-medium group-hover:text-[#00A651]">
                {cat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
