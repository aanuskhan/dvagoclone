import Image from "next/image";
import Link from "next/link";

export default function AppDownloadPromo() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4">
      <Link href="/app-download">
        <img
          src="https://www.dvago.pk/_next/image?url=https%3A%2F%2Fdvago-assets.s3.ap-southeast-1.amazonaws.com%2FBanners%2FApp%2520download%2520%252B%2520300%2520rs%2520promo%2520small%2520.jpeg&w=1400&q=75"
          alt="Get Rs. 300 on Dvago App Download"
          width={1920}
          height={400} // your banner height
          sizes="(max-width: 768px) 100vw, 1280px"
          className="w-full h-auto rounded-lg hover:opacity-90 transition"
          loading="lazy"
        />
      </Link>
    </div>
  );
}
