"use client";
import PerfumeBanner from "../perfumeBanner/page";
import ScentsForHimBanner from "../perfumeBanner2/page";
import PerfumeDeals from "../perfumeProduct/page";
import DvagoFooter from "../footer/page";
import React from "react";

export default function perfume() {
  return (
    <>
      <PerfumeBanner />
      <ScentsForHimBanner />
      <PerfumeDeals />
      <DvagoFooter />
    </>
  );
}
