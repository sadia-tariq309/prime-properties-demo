import { useEffect, useRef, useState } from "react";
import { useScrollY } from "@/hooks/useScrollY";
import { motion } from "framer-motion";
import { Search, MapPin, Home, BedDouble, ChevronDown } from "lucide-react";
import { Link } from "wouter";

/* ─── Ripple utility ─── */
function addRipple(e: React.MouseEvent<HTMLElement>, color = "rgba(201,168,76,0.35)") {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  const ripple = document.createElement("span");
  ripple.style.cssText = `
    position:absolute;width:${size}px;height:${size}px;
    left:${x}px;top:${y}px;border-radius:50%;
    background:${color};transform:scale(0);
    animation:ripple-expand 0.55s ease-out forwards;
    pointer-events:none;z-index:99;
  `;
  el.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

/* ─── Particle Canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = { x: number; y: number; r: number; speed: number; opacity: number; drift: number };

    const count = 38;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.4,
      speed: Math.random() * 0.35 + 0.12,
      opacity: Math.random() * 0.22 + 0.06,
      drift: (Math.random() - 0.5) * 0.3,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
    />
  );
}

/* ─── Hero ─── */
export function Hero() {
  const scrollY = useScrollY();
  const [mounted, setMounted] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const titleText = "PROPERTY";

  /* Gradient overlay deepens as user scrolls (0.85 → 0.95 over first 300px) */
  const gradientOpacity = 0.85 + Math.min(scrollY, 300) / 300 * 0.10;

  /* Text layer moves up at 0.15x scroll speed */
  const textParallax = scrollY * 0.15;

  return (
    <section
      id="home"
      className="relative w-full h-[100dvh] min-h-[700px] flex items-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* ── Background layer: Ken Burns + scroll parallax ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
          height: "120%",
          willChange: "transform",
        }}
      >
        {/* Deepening gradient overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `linear-gradient(135deg,
              rgba(5,15,30,${gradientOpacity}) 0%,
              rgba(5,15,30,${gradientOpacity * 0.47}) 60%,
              transparent 100%)`,
            transition: "background 0.1s linear",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />

        {/* Ken Burns image */}
        <img
          src="/hero-bg.png"
          alt="Karachi Cityscape at Golden Hour"
          className="w-full h-full object-cover object-center opacity-65"
          style={{ animation: "kenBurns 18s ease-in-out infinite alternate", willChange: "transform" }}
        />
      </div>

      {/* ── Particle dust layer ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <ParticleCanvas />
      </div>

      {/* ── Content layer with text parallax ── */}
      <div
        className="container relative z-20 mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center"
        style={{ transform: `translateY(-${textParallax}px)`, willChange: "transform" }}
      >
        {/* Left: Text */}
        <div className="lg:col-span-7 pt-20">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-px bg-[#C9A84C]" />
            <span className="text-[#C9A84C] font-semibold tracking-[0.2em] text-sm uppercase">Find Your</span>
          </motion.div>

          {/* H1 — clip-path letter reveals */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-none mb-2 flex overflow-hidden">
            {titleText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={mounted ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.5 + index * 0.055,
                  ease: [0.77, 0, 0.175, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Italic gold line */}
          <motion.div
            initial={{ opacity: 0, skewX: -2 }}
            animate={mounted ? { opacity: 1, skewX: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-[#C9A84C] mb-8"
          >
            IN PAKISTAN
          </motion.div>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="text-lg md:text-xl text-white/70 max-w-xl mb-10 font-light leading-relaxed"
          >
            Discover exclusive estates, luxury apartments, and premium commercial spaces. The definitive marketplace for serious buyers and investors.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <Link
                href="#properties"
                data-testid="link-hero-explore"
                onClick={(e) => addRipple(e as unknown as React.MouseEvent<HTMLElement>)}
                className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-black bg-[#C9A84C] group active:scale-[0.97] transition-transform duration-100 cursor-pointer"
              >
                <span className="absolute inset-0 bg-[#D4B96A] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-out z-0" />
                <span className="relative z-10 font-bold tracking-wide uppercase">Explore Properties</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.45 }}
            >
              <Link
                href="#services"
                data-testid="link-hero-learn"
                onClick={(e) => addRipple(e as unknown as React.MouseEvent<HTMLElement>, "rgba(201,168,76,0.2)")}
                className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white border border-white/30 group active:scale-[0.97] transition-transform duration-100 cursor-pointer"
              >
                <span className="absolute inset-0 bg-[#C9A84C] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-400 ease-out z-0" />
                <span className="relative z-10 tracking-wide uppercase group-hover:text-black transition-colors duration-300">Learn More</span>
              </Link>
            </motion.div>
          </div>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-[#1A1A1A] overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=C9A84C`} alt="Client" />
                </div>
              ))}
            </div>
            <div className="text-sm font-medium">
              <div className="text-white">2,400+ Happy Clients</div>
              <div className="text-[#C9A84C] flex items-center gap-1">
                4.9 <span className="text-lg leading-none">★</span> Rating
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Floating Search Card */}
        <div className="lg:col-span-5 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={isCardHovered ? { y: 0 } : { y: [0, -12, 0] }}
              transition={
                isCardHovered
                  ? { duration: 0.3 }
                  : { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }
              whileHover={{
                scale: 1.01,
                boxShadow: "0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.2)",
              }}
              onHoverStart={() => setIsCardHovered(true)}
              onHoverEnd={() => setIsCardHovered(false)}
              className="glass-panel p-8 rounded-xl border-t border-l border-white/5 cursor-pointer"
              style={{ willChange: "transform" }}
            >
              <h3 className="text-xl font-serif text-white mb-6">Find Your Property</h3>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <MapPin className="text-[#C9A84C]" size={18} />
                  </div>
                  <select
                    data-testid="select-city"
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white text-sm rounded-lg focus:ring-[#C9A84C] focus:border-[#C9A84C] block pl-11 p-3.5 appearance-none cursor-pointer transition-colors hover:border-white/20"
                  >
                    <option>Karachi</option>
                    <option>Lahore</option>
                    <option>Islamabad</option>
                    <option>Rawalpindi</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown className="text-white/50" size={16} />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Home className="text-[#C9A84C]" size={18} />
                  </div>
                  <select
                    data-testid="select-property-type"
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white text-sm rounded-lg focus:ring-[#C9A84C] focus:border-[#C9A84C] block pl-11 p-3.5 appearance-none cursor-pointer transition-colors hover:border-white/20"
                  >
                    <option>All Property Types</option>
                    <option>Luxury Villa</option>
                    <option>Apartment</option>
                    <option>Penthouse</option>
                    <option>Commercial</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown className="text-white/50" size={16} />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <BedDouble className="text-[#C9A84C]" size={18} />
                  </div>
                  <select
                    data-testid="select-bedrooms"
                    className="w-full bg-[#1A1A1A] border border-white/10 text-white text-sm rounded-lg focus:ring-[#C9A84C] focus:border-[#C9A84C] block pl-11 p-3.5 appearance-none cursor-pointer transition-colors hover:border-white/20"
                  >
                    <option>Any Bedrooms</option>
                    <option>2+ Bedrooms</option>
                    <option>3+ Bedrooms</option>
                    <option>4+ Bedrooms</option>
                    <option>5+ Bedrooms</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown className="text-white/50" size={16} />
                  </div>
                </div>

                <button
                  data-testid="button-search-properties"
                  onClick={(e) => addRipple(e)}
                  className="relative overflow-hidden w-full bg-[#C9A84C] text-black font-bold uppercase tracking-wider text-sm py-4 rounded-lg mt-2 flex items-center justify-center gap-2 group active:scale-[0.97] transition-transform duration-100 cursor-pointer"
                >
                  <span className="absolute inset-0 bg-[#D4B96A] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400 ease-out z-0" />
                  <span className="relative z-10 flex items-center gap-2">
                    <Search size={18} />
                    Search Properties
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        animate={{ opacity: scrollY > 100 ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">Scroll</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#C9A84C]"
          />
        </div>
      </motion.div>

      {/* Ken Burns keyframe */}
      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1) translateX(0); }
          to   { transform: scale(1.08) translateX(-2%); }
        }
      `}</style>
    </section>
  );
}
