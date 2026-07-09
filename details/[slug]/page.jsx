"use client";
import { useState } from "react";
import Nav from "@/app/header/page";
export default function AboutSection() {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <header className="pb-50">
        <Nav />
      </header>
      <div className="max-w-screen-xl mx-auto px-4 py-8 bg-[#f8f8f8] ">
        <div className="bg-white p-6 md:p-8 rounded-lg">
          {/* Heading */}
          <h2 className="text-lg md:text-xl font-semibold text-[#76bc21] mb-4">
            DVAGO - Pakistan's Best Online Pharmacy & Medical Store
          </h2>

          {/* Paragraph Text */}
          <div className="text-gray-600 text-sm leading-relaxed">
            <p>
              Our primary goal, being Pakistan's best and trusted pharmacy and
              healthcare platform, is to offer the facility of online{" "}
              <span className="text-[#76bc21] underline">buying medicines</span>
              , and{" "}
              <span className="text-[#76bc21] underline">health products</span>{" "}
              from different parts of the country without any barriers. Now you
              don't need to walk around the supermart or buy medicine by
              queueing up to vendors again. You can buy your pharmaceuticals,
              healthcare, and consumer care items online through our
              user-friendly Website or DVAGO App from the comfort of your home
              with up to 15% discount and FREE delivery* (on order value above
              Rs.5000).
            </p>

            {/* Hidden content */}
            {showMore && (
              <p className="mt-4 text-gray-500">
                DVAGO has an integrated list of all prescriptions along with OTC
                products of all known brands and generic medicines which are
                original and proven to be reliable, health and beauty goods,
                wellness supplements, baby & mother care, personal care, and
                medical devices. Our qualified pharmacists verify every
                prescription and ensure you get authentic medicines delivered at
                your doorstep. With 24/7 customer support, easy returns, and
                secure payment options, DVAGO makes healthcare accessible for
                everyone across Pakistan.VAGO has an integrated list of all
                prescriptions along with OTC products of all known brands and
                generic medicines which are original and proven to be reliable,
                health and herbal goods, children’s vitamins, diapers, milk
                powder, and nutritional supplements. Customers today can reach
                out to the shop through a variety of channels: an extensive
                product catalog, comparison of prices, and online shopping, with
                just a few clicks. The providers make sure that the products
                that customers access are real and are directly sourced from
                manufacturers who have already been vetted and recognized, this
                is to ensure that the platform has no counterfeit products.
              </p>
            )}
          </div>

          {/* Show More Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-6 py-2 border border-gray-400 rounded-full text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
