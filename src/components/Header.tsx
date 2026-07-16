import { useState, useEffect } from "react";
import { Phone, Mail, Menu, X, Truck, Calendar, MapPin } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Top micro-bar */}
      <div className="bg-slate-50 border-b border-slate-100 text-slate-600 text-xs py-2 px-4 sm:px-6 lg:px-8 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-[11px] uppercase tracking-wider font-mono text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-[#12B76A] mr-1.5" />
              Surrey, BC & Metro Vancouver
            </span>
            <a href="mailto:iszaidf@gmail.com" className="flex items-center hover:text-slate-900 transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#155EEF] mr-1.5" />
              iszaidf@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[11px] font-mono text-[#12B76A] uppercase tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold">
              Fully Insured & Bonded
            </span>
            <span className="text-slate-300">|</span>
            <a href="tel:(604)441-7304" className="hover:text-slate-900 transition-colors font-semibold">
              Call: (604) 441-7304
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
            : "bg-white/80 backdrop-blur-sm border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#155EEF] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  DELIVER<span className="text-[#155EEF]">D</span>
                </span>
                <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-mono -mt-1 font-semibold">
                  Moving & Logistics
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold">
              {[
                { name: "About", id: "about" },
                { name: "Services", id: "services" },
                { name: "Why Us", id: "why-choose-us" },
                { name: "Process", id: "process" },
                { name: "Reviews", id: "testimonials" },
                { name: "Service Areas", id: "service-areas" },
                { name: "FAQ", id: "faq" },
                { name: "Contact", id: "contact" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-slate-600 hover:text-[#155EEF] transition-colors cursor-pointer font-semibold"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Header Call-to-Actions */}
            <div className="hidden sm:flex items-center space-x-4">
              <a
                href="tel:6044417304"
                className="flex items-center space-x-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-4 py-2 rounded-full transition-all font-semibold cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#12B76A]" />
                <span>(604) 441-7304</span>
              </a>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-[#155EEF] hover:bg-[#155EEF]/90 text-white text-sm font-bold px-4.5 py-2.5 rounded-full shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Get a Free Quote</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg">
            <div className="px-2 pt-2 pb-6 space-y-1">
              {[
                { name: "About Us", id: "about" },
                { name: "Our Services", id: "services" },
                { name: "Why Choose Us", id: "why-choose-us" },
                { name: "Moving Process", id: "process" },
                { name: "Customer Reviews", id: "testimonials" },
                { name: "Service Areas", id: "service-areas" },
                { name: "Frequently Asked Questions", id: "faq" },
                { name: "Contact & Booking", id: "contact" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 px-4 flex flex-col space-y-3">
                <a
                  href="tel:6044417304"
                  className="flex items-center justify-center space-x-2 text-slate-900 bg-slate-50 border border-slate-200 py-3 rounded-full transition-all font-bold"
                >
                  <Phone className="w-4 h-4 text-[#12B76A]" />
                  <span>Call (604) 441-7304</span>
                </a>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-[#155EEF] hover:bg-[#155EEF]/90 text-white font-bold py-3.5 rounded-full shadow-md text-center flex items-center justify-center space-x-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Get Free Estimate</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
