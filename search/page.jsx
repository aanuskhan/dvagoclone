"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/app/adminSupabse/page";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .ilike("product_heading_title::text", `%${query.trim()}%`)
        .limit(20);
      console.log("Query", query);
      console.log("Data", data);
      console.log("Error", error);

      if (!error) setProducts(data || []);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold mb-4">
        Search results for: <span className="text-[#76bc21]">{query}</span>
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found for "{query}"</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/product/${product.slug}`)}
              className="border rounded-xl p-3 hover:shadow-lg cursor-pointer"
            >
              <img
                src={product.product_image_url}
                alt={product.product_heading_title}
                className="h-40 object-contain mx-auto"
              />
              <h3 className="text-sm mt-2 line-clamp-2">
                {product.product_heading_title}
              </h3>
              <p className="text-[#76bc21] font-bold mt-2">
                Rs. {product.price_rs}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
