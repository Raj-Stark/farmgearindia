import SectionSeparator from "@/components/custom/section-seprator";
import HeroSection from "./components/hero-section";
import CategorySection from "./components/category-section";
import ProductsSection from "./components/products-section";

export default function page() {
  return (
    <main>
      <HeroSection />
      <article className="container mx-auto ">
        <div className="my-10">
          <SectionSeparator sectionTitle="Explore Our Categories" />
        </div>
        <CategorySection />

        <div className="my-10">
          <SectionSeparator sectionTitle="Our Popular Products" />
        </div>
        <ProductsSection />
      </article>
    </main>
  );
}
