import { Facebook, Instagram, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#050505] pt-20 border-t border-[#C9A84C]/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:pr-8">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-serif font-bold text-white tracking-wider uppercase">
                Property<span className="text-[#C9A84C]">PK</span>
              </span>
            </Link>
            <p className="text-[#999999] text-sm leading-relaxed mb-8">
              The premier destination for luxury real estate in Pakistan. We connect discerning buyers with exceptional properties.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-white/70 hover:bg-[#C9A84C] hover:text-black hover:scale-110 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Properties', 'Services', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <Link href={`#${link.toLowerCase().replace(' ', '')}`} className="text-[#999999] hover:text-[#C9A84C] text-sm transition-all duration-300 hover:translate-x-2 inline-block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-[#999999] hover:text-[#C9A84C] text-sm transition-all duration-300 hover:translate-x-2 inline-block">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Newsletter</h4>
            <p className="text-[#999999] text-sm leading-relaxed mb-4">
              Subscribe to get the latest premium property listings and market insights.
            </p>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-[#111111] border border-white/10 text-white px-4 py-3 rounded-md focus:outline-none focus:border-[#C9A84C] focus:shadow-[0_0_10px_rgba(201,168,76,0.2)] transition-all pr-12"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#C9A84C] p-2 hover:text-white transition-colors">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-[#666666]">
          <p>© {new Date().getFullYear()} PropertyPK. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
