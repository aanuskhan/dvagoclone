"use client";
import Link from "next/link";

export default function BlogsSection() {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Cough Syrups In Pakistan",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQftXtjaRe3dZBadY9PnDIPZWOINLBg-JTxhkhuyI4sNIH_XLAX7OnmXVE&s=10",
      link: "/blog/top-10-cough-syrups-in-pakistan",
    },
    {
      id: 2,
      title: "Top 10 Medicated Whitening Creams In...",
      img: "https://chiltanpure.com/cdn/shop/files/skin-brightening-cream-anti-aging-brightens-skin-treats-acne-fade-hyperpigmentation-best-seller-920241.jpg?v=1722571281",
      link: "/blog/top-10-medicated-whitening-creams",
    },
    {
      id: 3,
      title: "Are Soft Drinks Safe During Pregnancy?",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvlSrdMA-h9NrQtvEvVUMiiNfYIAh0lDEZV_W3LvEfNE1VvN2WO5yembk&s=10",
      link: "/blog/are-soft-drinks-safe-during-pregnancy",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-[#76bc21]">Blogs</h2>
        <Link
          href="/blog"
          className="bg-[#76bc21] text-white px-5 py-1.5 rounded-md text-sm font-medium hover:bg-[#5a9518] transition"
        >
          VIEW ALL
        </Link>
      </div>

      {/* Blog Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={blog.link}
            className="flex items-center gap-4 group"
          >
            {/* Green Circular Image */}
            <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden relative bg-[#76bc21]/80">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
              <div className="absolute inset-0 bg-[#76bc21]/60"></div>
            </div>

            {/* Blog Title */}
            <h3 className="text-gray-700 text-sm md:text-base font-medium leading-snug group-hover:text-[#76bc21] transition">
              {blog.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
