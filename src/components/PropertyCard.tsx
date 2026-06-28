import { useState } from "react";
import { Heart, MapPin, Bed, Bath, Maximize } from "lucide-react";
import { motion } from "framer-motion";

interface Property {
  id: number;
  image: string;
  status: "FOR SALE" | "FOR RENT";
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
}

const properties: Property[] = [
  {
    id: 1,
    image: "/prop-1.png",
    status: "FOR SALE",
    price: "PKR 14.5 Crore",
    title: "Modern Luxury Apartment",
    location: "DHA Phase 8, Karachi",
    beds: 3,
    baths: 4,
    area: "2,400 sqft"
  },
  {
    id: 2,
    image: "/prop-2.png",
    status: "FOR SALE",
    price: "PKR 45.0 Crore",
    title: "Signature Villa Estate",
    location: "Gulberg III, Lahore",
    beds: 5,
    baths: 6,
    area: "4,500 sqft"
  },
  {
    id: 3,
    image: "/prop-3.png",
    status: "FOR RENT",
    price: "PKR 8.5 Lac/mo",
    title: "Contemporary Farmhouse",
    location: "Sector F-7, Islamabad",
    beds: 4,
    baths: 5,
    area: "8,000 sqft"
  },
  {
    id: 4,
    image: "/prop-4.png",
    status: "FOR SALE",
    price: "PKR 28.0 Crore",
    title: "Skyview Penthouse",
    location: "Clifton Block 4, Karachi",
    beds: 4,
    baths: 4,
    area: "3,200 sqft"
  },
  {
    id: 5,
    image: "/prop-5.png",
    status: "FOR SALE",
    price: "PKR 32.5 Crore",
    title: "Classic Mediterranean Estate",
    location: "Bahria Town, Lahore",
    beds: 6,
    baths: 7,
    area: "10,000 sqft"
  },
  {
    id: 6,
    image: "/prop-6.png",
    status: "FOR RENT",
    price: "PKR 12.0 Lac/mo",
    title: "Corporate Smart Home",
    location: "Blue Area, Islamabad",
    beds: 5,
    baths: 6,
    area: "5,500 sqft"
  }
];

export function PropertyCard({ property, index, inView }: { property: Property; index: number; inView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      data-testid={`card-property-${property.id}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{
        y: -8,
        boxShadow: "0 25px 60px rgba(201,168,76,0.18), 0 12px 30px rgba(0,0,0,0.6)",
      }}
      transition={
        isHovered
          ? { type: "spring", stiffness: 350, damping: 22 }
          : { duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-[#111111] rounded-xl overflow-hidden border border-white/5 hover:border-[#C9A84C]/30 cursor-pointer"
      style={{ willChange: "transform" }}
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span
            className="px-3 py-1.5 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#C9A84C]/50 text-[#C9A84C] text-xs font-bold tracking-wider rounded-sm inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            {property.status}
          </span>
        </div>
        <button
          data-testid={`button-favorite-${property.id}`}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#0A0A0A]/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-[#C9A84C] hover:bg-[#0A0A0A] transition-colors border border-transparent hover:border-[#C9A84C]/50 cursor-pointer"
        >
          <Heart size={18} />
        </button>
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-6 relative">
        <div className="transition-transform duration-300 group-hover:-translate-y-1">
          <div
            className="font-serif text-2xl mb-2 font-medium transition-colors duration-300"
            style={{ color: "#C9A84C" }}
          >
            {property.price}
          </div>
          <h3 className="text-xl text-white font-medium mb-2 group-hover:text-[#C9A84C] transition-colors duration-300">
            {property.title}
          </h3>
          <div className="flex items-center text-[#999999] text-sm mb-6">
            <MapPin size={16} className="mr-1.5 text-[#C9A84C]/70" />
            {property.location}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="flex flex-col items-center justify-center text-center">
              <Bed size={18} className="text-[#C9A84C] mb-1.5" />
              <span className="text-white text-sm font-medium">{property.beds}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-x border-white/10">
              <Bath size={18} className="text-[#C9A84C] mb-1.5" />
              <span className="text-white text-sm font-medium">{property.baths}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Maximize size={18} className="text-[#C9A84C] mb-1.5" />
              <span className="text-white text-sm font-medium">{property.area}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProperties({ inView }: { inView: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property, index) => (
        <PropertyCard key={property.id} property={property} index={index} inView={inView} />
      ))}
    </div>
  );
}
