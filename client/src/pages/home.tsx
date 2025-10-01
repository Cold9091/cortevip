import { useEffect } from "react";
import Hero from "@/components/hero";
import PricingTables from "@/components/pricing-tables";
import PromotionalPackages from "@/components/promotional-packages";
import Location from "@/components/location";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = target.getAttribute("href")?.slice(1);
        const element = document.getElementById(id || "");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <PricingTables />
      <PromotionalPackages />
      <Location />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
