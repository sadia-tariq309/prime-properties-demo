import { Search, TrendingUp, Scale, Building2, Key, Paintbrush } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const services = [
  {
    icon: Search,
    title: "Property Search",
    desc: "Personalized property hunting tailored to your exact lifestyle and investment requirements."
  },
  {
    icon: TrendingUp,
    title: "Investment Consulting",
    desc: "Expert analysis on high-yield real estate opportunities across Pakistan's major cities."
  },
  {
    icon: Scale,
    title: "Legal Assistance",
    desc: "Complete legal verification, documentation, and transfer process handled by our legal experts."
  },
  {
    icon: Building2,
    title: "Property Valuation",
    desc: "Accurate, data-driven market valuations for buyers and sellers ensuring fair transactions."
  },
  {
    icon: Key,
    title: "Rental Management",
    desc: "End-to-end tenant screening, rent collection, and property maintenance services."
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    desc: "Turnkey luxury interior design and renovation services for your new property."
  }
];

export function ServicesSection({ inView }: { inView: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
          className="group relative bg-[#111111] p-8 rounded-lg overflow-hidden border border-white/5 transition-all duration-300 hover:bg-[#1A1A1A]"
        >
          {/* Animated Top Border */}
          <div className="absolute top-0 left-0 h-1 bg-[#C9A84C] w-0 group-hover:w-full transition-all duration-500 ease-out" />
          
          <div className="mb-6 inline-flex p-4 rounded-full bg-[#0A0A0A] text-[#C9A84C] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
            <service.icon size={28} strokeWidth={1.5} />
          </div>
          
          <h3 className="text-xl text-white font-medium mb-4 font-serif">{service.title}</h3>
          
          <p className="text-[#999999] text-sm leading-relaxed mb-8">
            {service.desc}
          </p>
          
          <Link href="#contact" className="inline-flex items-center text-[#C9A84C] text-sm font-medium hover:text-white transition-colors group/link">
            Learn More 
            <span className="ml-2 group-hover/link:translate-x-1.5 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
