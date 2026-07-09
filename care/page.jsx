"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CareByCondition() {
  const scrollRef = useRef(null);
  const conditions = [
    {
      id: 1,
      name: "Hair Fall",
      img: "https://apidb.dvago.pk/Images/Category/Logo/4hair-care.png",
      link: "/condition/hair-fall",
    },
    {
      id: 2,
      name: "Cough & Cold",
      img: "https://apidb.dvago.pk/Images/Category/Logo/4cough-relief.png",
      link: "/condition/cough-cold",
    },
    {
      id: 3,
      name: "Bones & Joints Pain",
      img: "https://apidb.dvago.pk/Images/Category/Logo/4bones-joints-care.png",
      link: "/condition/bones-joints-pain",
    },
    {
      id: 4,
      name: "Acne",
      img: "https://apidb.dvago.pk/Images/Category/Logo/4acne.png",
      link: "/condition/acne",
    },
    {
      id: 5,
      name: "Pain & Body Aches",
      img: "https://apidb.dvago.pk/Images/Category/Logo/4body-pain.png",
      link: "/condition/pain-body-aches",
    },
    {
      id: 6,
      name: "Sleep Disorders",
      img: "https://apidb.dvago.pk/Images/Category/Logo/4sleep-health.png",
      link: "/condition/sleep-disorders",
    },
    {
      id: 7,
      name: "Fever Relief",
      img: "https://apidb.dvago.pk/Images/Category/Logo/4pain-fever-relief.png",
      link: "/condition/fever-relief",
    },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-[#76bc21] mb-6">
        Care By Condition
      </h2>

      {/* Conditions Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-2 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {conditions.map((condition) => (
            <Link
              key={condition.id}
              href={condition.link}
              className="flex-shrink-0 w-[160px] md:w-[180px] relative group"
            >
              {/* Arch Shape Container */}
              <div className="relative h-[200px] md:h-[220px] bg-[#f3e8f7] rounded-t-full overflow-hidden">
                <img
                  src={condition.img}
                  alt={condition.name}
                  className="w-full h-full object-cover object-top"
                />

                {/* Bottom Label with Triangle */}
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="bg-[#e8d7f0] h- flex flex-col items-center justify-center py-2">
                    <p className="text-[#5a3d6b] font-semibold text-sm text-center px-2 leading-tight">
                      {condition.name}
                    </p>
                  </div>

                  {/* Triangle with Arrow */}
                  <div className="relative bg-[#e8d7f0] h-6 flex justify-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l- border-l-transparent border-r- border-r-transparent border-t- border-t-[#e8d7f0]"></div>
                    <div className="mt-1">
                      <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                      >
                        <path
                          d="M10 1L15 6L10 11M15 6H1"
                          stroke="#5a3d6b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Left Green Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-9 h-9 rounded-full bg-[#76bc21] text-white flex items-center justify-center hover:bg-[#5a9518] transition shadow-lg z-10"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Green Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-9 h-9 rounded-full bg-[#76bc21] text-white flex items-center justify-center hover:bg-[#5a9518] transition shadow-lg z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
