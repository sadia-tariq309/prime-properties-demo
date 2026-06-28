import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { FeaturedProperties } from "@/components/PropertyCard";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactForm } from "@/components/ContactForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

function addRipple(e: React.MouseEvent<HTMLElement>, color = "rgba(201,168,76,0.35)") {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  const ripple = document.createElement("span");
  ripple.style.cssText = `
    position:absolute;width:${size}px;height:${size}px;
    left:${x}px;top:${y}px;
    border-radius:50%;
    background:${color};
    transform:scale(0);
    animation:ripple-expand 0.55s ease-out forwards;
    pointer-events:none;z-index:99;
  `;
  el.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

function SectionHeader({
  eyebrow,
  title,
  alignment = "center",
}: {
  eyebrow: string;
  title: string;
  alignment?: "center" | "left";
}) {
  const words = title.split(" ");

  return (
    <div className={`mb-16 ${alignment === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center gap-4 mb-4 ${alignment === "center" ? "justify-center" : ""}`}
      >
        <div className="w-12 h-px bg-[#C9A84C]" />
        <span className="text-[#C9A84C] font-semibold tracking-[0.2em] text-sm uppercase">
          {eyebrow}
        </span>
        {alignment === "center" && <div className="w-12 h-px bg-[#C9A84C]" />}
      </motion.div>

      <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight overflow-hidden">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.65,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}

export default function Home() {
  const [propertiesRef, propertiesInView] = useInView();
  const [servicesRef, servicesInView] = useInView();
  const [testimonialsRef, testimonialsInView] = useInView();
  const [faqRef, faqInView] = useInView();
  const [contactRef, contactInView] = useInView();

  return (
    <main className="min-h-screen bg-[#0A0A0A] selection:bg-[#C9A84C] selection:text-black">
      <Navbar />
      <Hero />
      <StatsBar />

      {/* Featured Properties */}
      <section id="properties" className="py-24 bg-[#0A0A0A] relative z-20" ref={propertiesRef}>
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader eyebrow="Featured Listings" title="Discover Premium Properties" />
          <FeaturedProperties inView={propertiesInView} />
          <div className="mt-16 text-center">
            <button
              data-testid="button-view-all-properties"
              onClick={(e) => addRipple(e, "rgba(201,168,76,0.25)")}
              className="relative overflow-hidden px-8 py-4 border border-[#C9A84C] text-[#C9A84C] font-medium tracking-wide uppercase group active:scale-[0.97] transition-transform duration-100 cursor-pointer"
            >
              <span className="absolute inset-0 bg-[#C9A84C] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-400 ease-out z-0" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                View All Properties
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-[#080808] relative z-20" ref={servicesRef}>
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader eyebrow="Our Services" title="Everything You Need" />
          <ServicesSection inView={servicesInView} />
        </div>
      </section>

      {/* Testimonials */}
      <section id="about" className="py-24 bg-[#0A0A0A] relative z-20 overflow-hidden" ref={testimonialsRef}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A84C]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <SectionHeader eyebrow="Testimonials" title="What Our Clients Say" />
          <TestimonialsSlider inView={testimonialsInView} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#080808] relative z-20" ref={faqRef}>
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
          <FaqAccordion inView={faqInView} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-[#0A0A0A] relative z-20" ref={contactRef}>
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeader eyebrow="Get In Touch" title="Contact Our Experts" alignment="left" />
          <ContactForm inView={contactInView} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
