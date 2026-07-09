"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/adminSupabse/page";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Medicine", "Multivitamins", "perfume", "others"];

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || user.user_metadata.role !== "admin") {
      router.push("/atif?type=admin");
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function toggleCategory(cat) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  async function uploadImage(file) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) throw error;

    // fixed bucket name here
    const { data } = supabase.storage.from("products").getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !price) return alert("Product title and price are required");

    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { error } = await supabase.from("product").insert([
        {
          product_heading_title: name, // fixed: was set to price before
          price_rs: parseFloat(price),
          available_stock: parseInt(stock),
          product_image_url: imageUrl,
          store_categories: selectedCategories, // added: saves categories
        },
      ]);

      if (error) throw error;

      alert("Product published successfully!");
      setName("");
      setPrice("");
      setStock("0");
      setImageFile(null);
      setImagePreview("");
      setSelectedCategories([]);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/adminLogin");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm bg-white border rounded-lg hover:bg-gray-100"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-2">Publish New Product</h2>
          <p className="text-sm text-gray-500 mb-6">
            Add images and more, set pricing, manage stock values, and link to
            multiple structure product categories.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Product Title */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                PRODUCT HEADING TITLE *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Scc 1000 Plus Effervescent Orange Flavor Tablet (5 Bottles × 20 Tablets)"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  PRICE (RS.) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  AVAILABLE STOCK *
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                PRODUCT IMAGE URL *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3 w-24 h-24 object-cover rounded-lg border"
                />
              )}
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                ASSIGNED STORE CATEGORIES - SELECT ALL THAT APPLY
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 text-white py-2.5 rounded-lg font-medium hover:bg-pink-700 disabled:bg-pink-300 disabled:cursor-not-allowed transition"
            >
              {loading ? "Publishing..." : "Publish Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
