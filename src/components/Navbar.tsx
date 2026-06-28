import { Link } from "wouter";
import { useScrollY } from "@/hooks/useScrollY";
import { useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const scrollY = useScrollY();
  const isScrolled = scrollY > 80;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#C9A84C]/30 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl font-serif font-bold text-white tracking-wider uppercase inline-block"
          >
            Property<span className="text-[#C9A84C]">PK</span>
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["Home", "Properties", "Services", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              data-testid={`link-nav-${item.toLowerCase()}`}
              className="text-sm font-medium text-white/80 hover:text-white relative group py-2 transition-colors"
            >
              {item}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="#contact"
            data-testid="link-nav-cta"
            className="relative overflow-hidden inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-black bg-[#C9A84C] transition-all duration-300 active:scale-95 group cursor-pointer"
          >
            <span className="absolute inset-0 bg-[#D4B96A] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-out z-0" />
            <span className="relative z-10 tracking-wide uppercase">Get an Evaluation</span>
          </Link>
        </div>

        {/* Hamburger Toggle */}
        <button
          data-testid="button-mobile-menu"
          className="md:hidden text-white p-2 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="w-6 h-[18px] flex flex-col justify-between">
            <span
              className="block h-[2px] bg-white origin-left transition-all duration-300 ease-in-out"
              style={{
                transform: mobileMenuOpen ? "rotate(45deg) scaleX(1.1)" : "rotate(0) scaleX(1)",
                width: "100%",
              }}
            />
            <span
              className="block h-[2px] bg-white transition-all duration-300 ease-in-out"
              style={{
                opacity: mobileMenuOpen ? 0 : 1,
                transform: mobileMenuOpen ? "scaleX(0)" : "scaleX(1)",
                transformOrigin: "right",
              }}
            />
            <span
              className="block h-[2px] bg-white origin-left transition-all duration-300 ease-in-out"
              style={{
                transform: mobileMenuOpen ? "rotate(-45deg) scaleX(1.1)" : "rotate(0) scaleX(1)",
                width: "100%",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden bg-[#0A0A0A] border-b border-[#C9A84C]/30"
      >
        <nav className="flex flex-col py-4 px-6 gap-4">
          {["Home", "Properties", "Services", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium text-white/80 hover:text-[#C9A84C] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 mt-4 text-sm font-bold text-black bg-[#C9A84C] uppercase tracking-wide transition-all active:scale-95"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get an Evaluation
          </Link>
        </nav>
      </motion.div>
    </header>
  );
}
