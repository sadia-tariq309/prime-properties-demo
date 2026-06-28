import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Can overseas Pakistanis buy property without visiting?",
    a: "Yes. We offer a comprehensive remote buying service including virtual tours, legal representation via POA, and complete document management to ensure a secure transaction from anywhere in the world."
  },
  {
    q: "What are the hidden costs when buying property in Pakistan?",
    a: "Standard costs include stamp duty, CVT (Capital Value Tax), TMA/Cantonment tax, and legal/agency fees. As premium consultants, we provide a fully transparent cost breakdown before any commitment."
  },
  {
    q: "Is it better to invest in commercial or residential real estate right now?",
    a: "It depends on your goals. Commercial properties in hubs like Blue Area or Gulberg offer higher rental yields (6-8%), while residential plots in emerging DHA phases offer stronger capital appreciation."
  },
  {
    q: "How do you verify the legal status of a property?",
    a: "Our in-house legal team conducts a stringent 5-point check including NOC verification from relevant authorities (CDA, LDA, KDA, DHA), non-encumbrance certificates, and ownership history."
  },
  {
    q: "Do you offer property management for overseas investors?",
    a: "Absolutely. Our premium rental management service covers finding vetted tenants, rent collection, property maintenance, and regular reporting, ensuring truly passive income."
  },
  {
    q: "What is the typical timeframe for a property transfer?",
    a: "For society properties (like DHA or Bahria), transfers typically take 1-2 weeks. For open land or older registry properties, it may take 3-4 weeks depending on the local Patwarkhana/Registrar office."
  }
];

export function FaqAccordion({ inView }: { inView: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-4"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className={`w-full flex items-center justify-between p-6 bg-[#111111] border rounded-lg transition-colors duration-300 ${
              openIndex === index ? 'border-[#C9A84C]/50' : 'border-white/5 hover:border-white/20'
            }`}
          >
            <span className="text-left font-medium text-white md:text-lg pr-4">{faq.q}</span>
            <div 
              className={`flex-shrink-0 text-[#C9A84C] transition-transform duration-300 ${
                openIndex === index ? 'rotate-45' : 'rotate-0'
              }`}
            >
              <Plus size={24} />
            </div>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-2 text-[#999999] leading-relaxed border-x border-b border-[#C9A84C]/20 rounded-b-lg -mt-2 bg-[#111111]/50">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
