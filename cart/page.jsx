"use client";
import { useCart } from "@/app/useCart/page";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/adminSupabse/page"; // added
import { useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const { cart, user, cartTotal, updateQty, removeItem, clearCart } = useCart();
  const [products, setProducts] = useState([]);

  const delivery = cartTotal > 0 ? 150 : 0;
  const total = cartTotal + delivery;

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <button
            onClick={() => router.push("./vitamins")}
            className="flex items-center gap-2 text-[#76bc21] mb-6"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
          <div className="bg-white rounded-lg p-12 text-center">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your Cart is Empty
            </h2>
            <Link
              href="/"
              className="inline-block bg-[#76bc21] text-white font-semibold px-8 py-3 rounded-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-[#76bc21]"></div>
            <h1 className="text-2xl font-semibold">
              Shopping Cart ({cart.length})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-red-500 text-sm flex items-center gap-1"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((product) => {
              const price = Number(product.price_rs) || 0;
              const qty = Number(product.quantity) || 1;
              const itemTotal = price * qty;

              return (
                <div
                  key={product.id}
                  className="bg-white border rounded-lg p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={product.product_image_url}
                      alt={product.product_heading_title}
                      className="w-20 h-20 object-contain bg-gray-50 rounded"
                    />

                    <div className="flex-1">
                      <h3 className="text-sm text-gray-700 mb-1">
                        {product.product_heading_title}
                      </h3>
                      <p className="text-lg font-semibold mb-3">
                        Rs. {price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQty(product.id, qty - 1)}
                            className="w-8 h-8 flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQty(product.id, qty + 1)}
                            className="w-8 h-8 flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold">
                        Rs. {itemTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    Rs. {cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold">
                    Rs. {delivery.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-[#76bc21]">
                  Rs. {total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() =>
                  router.push(user?.loggedIn ? "/checkout" : "/register")
                }
                className="w-full bg-[#76bc21] text-white font-semibold py-3 rounded-lg mb-3"
              >
                {user?.loggedIn ? "PROCEED TO CHECKOUT" : "LOGIN TO CHECKOUT"}
              </button>
              <Link
                href="/"
                className="block text-center text-[#76bc21] text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
