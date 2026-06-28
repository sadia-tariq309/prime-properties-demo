import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function ContactForm({ inView }: { inView: boolean }) {
  return (
    <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
      {/* Contact Info */}
      <motion.div 
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="lg:col-span-2 space-y-8"
      >
        <h3 className="text-2xl font-serif text-white mb-6">Our Headquarters</h3>
        
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#111111] rounded-full text-[#C9A84C]">
            <MapPin size={24} />
          </div>
          <div>
            <h4 className="text-white font-medium mb-1">Corporate Office</h4>
            <p className="text-[#999999] text-sm leading-relaxed">
              Level 12, Ocean Tower<br />
              Block 9, Clifton<br />
              Karachi, Pakistan
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#111111] rounded-full text-[#C9A84C]">
            <Phone size={24} />
          </div>
          <div>
            <h4 className="text-white font-medium mb-1">Direct Lines</h4>
            <p className="text-[#999999] text-sm leading-relaxed">
              +92 (21) 111-222-333<br />
              +92 300 1234567
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#111111] rounded-full text-[#C9A84C]">
            <Mail size={24} />
          </div>
          <div>
            <h4 className="text-white font-medium mb-1">Email Inquiry</h4>
            <p className="text-[#999999] text-sm leading-relaxed">
              invest@propertypk.com<br />
              support@propertypk.com
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#111111] rounded-full text-[#C9A84C]">
            <Clock size={24} />
          </div>
          <div>
            <h4 className="text-white font-medium mb-1">Business Hours</h4>
            <p className="text-[#999999] text-sm leading-relaxed">
              Monday - Saturday: 10:00 AM - 7:00 PM<br />
              Sunday: Closed (By Appointment Only)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="lg:col-span-3 bg-[#111111] p-8 md:p-10 rounded-xl border border-white/5"
      >
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
              <label className="text-xs font-medium text-[#999999] uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-[#1A1A1A] border-l-2 border-transparent border-y-0 border-r-0 border-b border-b-white/10 text-white p-3 focus:outline-none focus:border-l-[#C9A84C] focus:bg-[#222] transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-xs font-medium text-[#999999] uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-[#1A1A1A] border-l-2 border-transparent border-y-0 border-r-0 border-b border-b-white/10 text-white p-3 focus:outline-none focus:border-l-[#C9A84C] focus:bg-[#222] transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2 group">
            <label className="text-xs font-medium text-[#999999] uppercase tracking-wider">Phone Number</label>
            <input 
              type="tel" 
              className="w-full bg-[#1A1A1A] border-l-2 border-transparent border-y-0 border-r-0 border-b border-b-white/10 text-white p-3 focus:outline-none focus:border-l-[#C9A84C] focus:bg-[#222] transition-all"
              placeholder="+92 3XX XXXXXXX"
            />
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-medium text-[#999999] uppercase tracking-wider">Your Message</label>
            <textarea 
              rows={4}
              className="w-full bg-[#1A1A1A] border-l-2 border-transparent border-y-0 border-r-0 border-b border-b-white/10 text-white p-3 focus:outline-none focus:border-l-[#C9A84C] focus:bg-[#222] transition-all resize-none"
              placeholder="Tell us about your investment goals..."
            ></textarea>
          </div>

          <button className="w-full bg-[#C9A84C] hover:bg-[#D4B96A] text-black font-bold uppercase tracking-wider py-4 rounded-sm mt-4 transition-all hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] active:scale-[0.98]">
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
}
