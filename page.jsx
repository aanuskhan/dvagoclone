import Link from "next/link";
import Nav from "./header/page";
import HeroCarousel from "./check/page";
import CategoriesCarousel from "./categories/page";
import DvgoBanner from "./banner/page";
import TopSellingItems from "./top/page";
import CardBannerSimple from "./card/page";
import Deals from "./deals/page";
import AppDownloadPromo from "./scan/page";
import TopItems from "./featured/page";
import CareByCondition from "./care/page";
import Blogs from "./blogs/page";
import AboutSection from "./details/[slug]/page";
import Footer from "./footer/page";

export default function Home() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <section className="pt-50">
        <HeroCarousel />
      </section>
      <article className="pt-5">
        <CategoriesCarousel />
      </article>
      <aside className="pt-5">
        <DvgoBanner />
      </aside>
      <article className="pt-5">
        <TopSellingItems />
      </article>
      <aside className="pt-5">
        <CardBannerSimple />
      </aside>
      <article className="pt-5">
        <Deals />
      </article>
      <aside className="pt-5">
        <AppDownloadPromo />
      </aside>
      <article className="pt-5">
        <TopItems />
      </article>
      <aside className="pt-5">
        <CareByCondition />
      </aside>
      <aside className="pt-5">
        <Blogs />
      </aside>
      <div className="pt-5">
        <AboutSection />
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
