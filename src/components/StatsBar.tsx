import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { motion, useAnimation } from "framer-motion";

const stats = [
  { value: 12000, label: "Properties", suffix: "+" },
  { value: 850, label: "Agents", suffix: "+" },
  { value: 95, label: "Success Rate", suffix: "%" },
  { value: 15, label: "Cities", suffix: "+" }
];

function Counter({ from, to, duration, inView }: { from: number; to: number; duration: number; inView: boolean }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;

    const easeOutQuart = (t: number) => 1 - (--t) * t * t * t;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(from + (to - from) * easeOutQuart(percent)));

      if (percent < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, inView]);

  return <span>{count.toLocaleString()}</span>;
}

export function StatsBar() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="bg-[#0A0A0A] py-16 border-y border-[#C9A84C]/20 relative z-30" ref={ref}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              {/* Divider */}
              {index !== 0 && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={inView ? { height: "100%" } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="hidden md:block absolute left-0 top-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/50 to-transparent"
                />
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="text-4xl md:text-5xl font-serif text-white mb-2 flex items-center justify-center">
                  <Counter from={0} to={stat.value} duration={1.5} inView={inView} />
                  <span className="text-[#C9A84C] ml-1">{stat.suffix}</span>
                </div>
                <div className="text-sm uppercase tracking-widest text-[#999999] font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
