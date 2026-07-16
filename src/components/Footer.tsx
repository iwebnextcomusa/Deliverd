import { Truck, Phone, Mail, MapPin, ExternalLink, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 text-xs py-12 md:py-16 relative">
      <div className="absolute top-0 left-1/4 w-[250px] h-[250px] bg-[#155EEF]/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Links & Bio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Bio Column */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-[#155EEF] flex items-center justify-center text-white">
                <Truck className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-slate-900">
                  Deliver<span className="text-[#12B76A]">d</span>
                </span>
                <span className="block text-[8px] text-[#F79009] uppercase tracking-widest font-mono -mt-1 font-bold">
                  Moving & Logistics
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Deliverd is a dedicated team of moving and logistics professionals committed to helping Surrey neighbors with seamless, professional, and stress-free relocation and appliance/furniture delivery services.
            </p>

            {/* Insurance disclaimer */}
            <div className="flex items-center space-x-2 bg-white border border-slate-200 px-3 py-2 rounded-xl inline-block shadow-sm">
              <ShieldCheck className="w-4.5 h-4.5 text-[#12B76A]" />
              <span className="text-[10px] text-slate-700 font-semibold uppercase tracking-wider font-mono">
                Fully Licensed, Insured & Bonded in BC
              </span>
            </div>
          </div>

          {/* Quick Nav Links Column */}
          <div className="md:col-span-2 text-left space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#F79009] font-bold">Company</span>
            <ul className="space-y-2">
              {[
                { name: "About Story", id: "about" },
                { name: "Services Offered", id: "services" },
                { name: "Why Choose Us", id: "why-choose-us" },
                { name: "Our Process", id: "process" },
                { name: "Testimonials", id: "testimonials" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScrollToSection(link.id)}
                    className="text-slate-600 hover:text-[#155EEF] transition-colors cursor-pointer text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas Link Column */}
          <div className="md:col-span-2 text-left space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#12B76A] font-bold">Dispatch Areas</span>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleScrollToSection("service-areas")} className="text-slate-600 hover:text-[#155EEF] transition-colors">
                  Surrey Hub
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection("service-areas")} className="text-slate-600 hover:text-[#155EEF] transition-colors">
                  Langley / Delta
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection("service-areas")} className="text-slate-600 hover:text-[#155EEF] transition-colors">
                  Richmond / Burnaby
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection("service-areas")} className="text-slate-600 hover:text-[#155EEF] transition-colors">
                  Vancouver / Coquitlam
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection("service-areas")} className="text-slate-600 hover:text-[#155EEF] transition-colors">
                  BC Long Distance
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="md:col-span-3 text-left space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#155EEF] font-bold">Get In Touch</span>
            <ul className="space-y-2.5">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#12B76A] flex-shrink-0 mt-0.5" />
                <span className="leading-normal">Surrey, British Columbia, Canada</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#F79009] flex-shrink-0" />
                <a href="tel:6044417304" className="text-slate-700 hover:text-[#155EEF] transition-colors font-semibold">
                  (604) 441-7304
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#155EEF] flex-shrink-0" />
                <a href="mailto:iszaidf@gmail.com" className="text-slate-600 hover:text-[#155EEF] transition-colors">
                  iszaidf@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Separator / Credit / Bottom Section */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10.5px]">
          
          <div className="text-center md:text-left">
            <span>© {new Date().getFullYear()} Deliverd Moving & Logistics. All Rights Reserved.</span>
          </div>

          {/* Center aligned required credit link */}
          <div className="text-center font-medium">
            Developed by <a 
              href="https://iwebnext.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#155EEF] hover:text-[#155EEF]/85 hover:underline inline-flex items-center font-semibold"
            >
              <span>iWebNext</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          <div className="flex space-x-4">
            <span className="hover:text-slate-800 transition-colors cursor-default">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-800 transition-colors cursor-default">Terms & Transit Conditions</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
