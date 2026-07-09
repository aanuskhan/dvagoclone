export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/products?select=slug`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    console.error("Supabase error:", await res.text());
    return [];
  }

  const products = await res.json();

  return products.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;
