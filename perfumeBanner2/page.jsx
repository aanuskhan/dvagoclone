"use client";
import Link from "next/link";

export default function ScentsForHimBanner() {
  return (
    <div className="relative w-full h-[350px] md:h-[450px] rounded-lg overflow-hidden mb-8">
      {/* Background Image */}
      <img
        src="https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2Fscents%2520for%2520him.jpeg&w=1400&q=75"
        alt="Scents for Him"
        className="w-full h-full object-cover"
      />

      {/* Right Side Text Overlay */}
    </div>
  );
}
