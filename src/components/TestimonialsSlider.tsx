import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Tariq Mahmood",
    role: "Property Investor",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Tariq&backgroundColor=C9A84C",
    rating: 5,
    text: "PropertyPK completely transformed how I invest in Lahore. Their insights into Bahria Town's expanding sectors gave me a 40% ROI in under two years. Absolutely unparalleled service."
  },
  {
    id: 2,
    name: "Zainab Ali",
    role: "Homeowner",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Zainab&backgroundColor=1A1A1A",
    rating: 5,
    text: "Finding a secure, luxury apartment in DHA Karachi felt daunting until I met this team. They handled everything from the initial search to the legal transfer flawlessly."
  },
  {
    id: 3,
    name: "Faisal Rehman",
    role: "Overseas Pakistani",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Faisal&backgroundColor=111111",
    rating: 5,
    text: "Managing properties from the UK is tough. Their rental management service gives me complete peace of mind. The rent is always on time, and my property in Islamabad is pristine."
  },
  {
    id: 4,
    name: "Sarah Khan",
    role: "Corporate Executive",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=C9A84C",
    rating: 5,
    text: "The sheer professionalism is a breath of fresh air. They don't just sell real estate; they curate lifestyles. I found the perfect penthouse in Clifton thanks to their exclusive listings."
  }
];

export function TestimonialsSlider({ inView }: { inView: boolean }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || !inView) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, inView]);

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[300px] md:h-[250px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center text-center px-4"
          >
            <Quote className="text-[#C9A84C]/20 w-16 h-16 mb-4" />
            <p className="text-xl md:text-2xl font-serif text-white leading-relaxed mb-8 italic">
              "{testimonials[current].text}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9A84C]">
                <img src={testimonials[current].avatar} alt={testimonials[current].name} />
              </div>
              <div className="text-left">
                <div className="text-white font-medium">{testimonials[current].name}</div>
                <div className="text-[#999999] text-sm">{testimonials[current].role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? "w-8 bg-[#C9A84C]" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
