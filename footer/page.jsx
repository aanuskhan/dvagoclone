import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function DvagoFooter() {
  return (
    <footer className="bg-[#76bc21] text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo + Tagline + Social */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <h2 className="text-4xl font-black tracking-tight">
                D<span className="inline-block">♡</span>AGO
              </h2>
            </Link>
            <p className="text-sm font-semibold mb-1">
              Pharmacy & Wellness Experts
            </p>
            <p className="text-xs mb-6 leading-snug">
              Pakistan's most trusted pharmacy
              <br />
              chain delivering nationwide
            </p>

            <div>
              <p className="text-sm font-semibold mb-3">Follow us</p>
              <div className="flex gap-3">
                <Link
                  href="https://facebook.com/dvago"
                  target="_blank"
                  className="hover:opacity-80"
                >
                  <FaFacebookF size={18} />
                </Link>
                <Link
                  href="https://twitter.com/dvago"
                  target="_blank"
                  className="hover:opacity-80"
                >
                  <FaTwitter size={18} />
                </Link>
                <Link
                  href="https://instagram.com/dvago"
                  target="_blank"
                  className="hover:opacity-80"
                >
                  <FaInstagram size={18} />
                </Link>
                <Link
                  href="https://youtube.com/dvago"
                  target="_blank"
                  className="hover:opacity-80"
                >
                  <FaYoutube size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-base mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/medicine" className="hover:underline">
                  Medicine
                </Link>
              </li>
              <li>
                <Link
                  href="/category/a-to-z-medicine"
                  className="hover:underline"
                >
                  A to Z Medicine
                </Link>
              </li>
              <li>
                <Link
                  href="/category/baby-mother-care"
                  className="hover:underline"
                >
                  Baby & Mother Care
                </Link>
              </li>
              <li>
                <Link
                  href="/category/nutrition-supplements"
                  className="hover:underline"
                >
                  Nutrition & Supplements
                </Link>
              </li>
              <li>
                <Link
                  href="/category/food-beverage"
                  className="hover:underline"
                >
                  Food & Beverage
                </Link>
              </li>
              <li>
                <Link
                  href="/category/devices-appliances"
                  className="hover:underline"
                >
                  Devices & Appliances
                </Link>
              </li>
              <li>
                <Link
                  href="/category/personal-care"
                  className="hover:underline"
                >
                  Personal Care
                </Link>
              </li>
              <li>
                <Link
                  href="/category/otc-health-need"
                  className="hover:underline"
                >
                  OTC And Health Need
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="font-semibold text-base mb-4">Navigate</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/feedback" className="hover:underline">
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="/instant-order" className="hover:underline">
                  Instant Order
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:underline">
                  Deals
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:underline">
                  Stores
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:underline">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-base mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faqs" className="hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:underline">
                  Terms Of Service
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:underline">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:underline">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact Us</h3>
            <div className="text-sm space-y-3">
              <p className="leading-relaxed">
                1st Floor, Plot No. 1 Shaheed-e-Millat
                <br />
                Road, Modern Society MCHS, Karachi,
                <br />
                Sindh 75100, Pakistan
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a href="tel:021111138246" className="hover:underline">
                  (021) 11 11 DVAGO (38246)
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:feedback@dvago.pk" className="hover:underline">
                  feedback@dvago.pk
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <p className="text-xs text-center md:text-left">
            © 2026 DVAGO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
