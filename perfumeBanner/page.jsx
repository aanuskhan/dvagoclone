"use client";
import Link from "next/link";

export default function PerfumeBanner() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
      {/* Background Image */}
      <img
        src="https://www.dvago.pk/assets/perfume-banner.png"
        alt="Perfume Banner"
        className="w-full h-full object-cover"
      />
    </div>
    //
  );
}
