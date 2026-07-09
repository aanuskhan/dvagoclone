"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("dvago_cart") || "[]");
    if (savedCart.length === 0) {
      router.push("/cart");
      return;
    }
    setCart(savedCart);

    // Pre-fill name/phone if user is logged in
    const user = JSON.parse(localStorage.getItem("dvago_user") || "null");
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
      }));
    }
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }

    // Here you can send order to Supabase if you want
    // await supabase.from("orders").insert([{...form, items: cart }]);

    alert("Your order is confirmed!");
    localStorage.removeItem("dvago_cart");
    router.push("/");
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.price_rs || 0) * item.qty,
    0,
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Form */}
        <div className="md:col-span-2 bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#76bc21]"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#76bc21]"
                placeholder="03XXXXXXXXX"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Delivery Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="3"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#76bc21]"
                placeholder="House #, Street, City"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#76bc21] text-white py-3 rounded-lg font-semibold hover:bg-[#5a9518] transition"
            >
              Confirm Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white border rounded-xl p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            {cart.map((item) => (
              <div key={item.slug} className="flex justify-between">
                <span className="truncate w-40">{item.name}</span>
                <span>x{item.qty}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-[#76bc21]">Rs. {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
