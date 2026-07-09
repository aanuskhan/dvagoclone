import Image from "next/image";
import Link from "next/link";

export default function CardBannerSimple() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4">
      <Link href="/offers/card-payment">
        <img
          src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Banners/card%20small%20web%20banner.jpg"
          alt="Card Payment Offer - up to 25% savings"
          width={1920}
          height={400} // set your actual banner height
          sizes="(max-width: 768px) 100vw, 1280px"
          className="w-full h-auto rounded-lg"
          loading="lazy"
        />
      </Link>
    </div>
  );
}
