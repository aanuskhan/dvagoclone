import Footer from "@/app/footer/page";

import { notFound } from "next/navigation";
import Link from "next/link";
import ProductActions from "./ProductActions";

export const revalidate = 60;

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = await getProductBySlug(decodedSlug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="container  py-6 px-4 mt-10 mb-5">
        {/* Breadcrumb */}
        <div className="text-base font-bold text-black mb-4">
          <Link href="/">Home</Link> &gt; {product.category || "Uncategorized"}{" "}
          &gt;{" "}
          <Link href={`/anus/${encodeURIComponent(product.slug)}`}>
            {product.product_heading_title}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image */}
          <div>
            <img
              src={
                product.product_image_url || "https://via.placeholder.com/400"
              } //placeholder.jpg
              alt={product.product_heading_title}
              className="w-200 h-150 object-contain rounded-lg"
            />
          </div>

          {/* Right: Details */}
          <div>
            <h1 className=" text-5xl font-semibold mb-2 mt-10">
              {product.product_heading_title}
            </h1>

            <p className="text-base text-gray-600 my-6">
              AVALIABLE_STOCK:{""}
              <span className="text-blue-600">{product.avaliable_stock}</span>
            </p>

            <p className="text-3xl font-bold mb-4">
              Rs. {product.price_rs || "0"}
            </p>

            <p className="text-lg mb-10">Per Bottle</p>

            <ProductActions product={product} />
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">
            {product.product_heading_title} Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {product.description || "No description available"}
          </p>
        </div>
      </div>
      <footer className="pt-5">
        <Footer />
        <p className="text-red-500 text-center text-sm pt-5 pb-5">
          <b>Disclaimer:</b> Our official website is www.dvago.pk and our
          official mobile app is Dvago – Pharmacy & Health by Novacare (Pvt)
          Ltd.We are not liable for orders placed through unauthorized
          platforms.Stay vigilant against scams. Report any fraudulent websites,
          apps, or numbers falsely claiming association with Dvago to (021)
          11-11-38246 immediately. Thank you.
        </p>
      </footer>
    </>
  );
}
// Fixed fetch function for Supabase
async function getProductBySlug(slug) {
  const SUPABASE_URL = "https://gpkgtpzjwpwvjvfwtxrp.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_SFfh5C5jJtVMahNP-pL5oQ_ydODPx8D";
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/product?slug=eq.${slug}&select=*`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data[0] || null;
}
