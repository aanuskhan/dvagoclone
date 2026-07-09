import Image from "next/image";

export default function DvagoBanner() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="relative">
        <img
          src="https://dvago-assets.s3.ap-southeast-1.amazonaws.com/Banners/category%20small%20web%20banner.jpg"
          alt="Banner Image"
          width={1920}
          height={0}
          sizes="(max-width: 320px) 280px, (max-width: 640px) 600px, 100vw"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
}
