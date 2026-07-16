import { useState, useEffect } from "react";
import { ArrowUp, Phone, Calendar, ArrowRight } from "lucide-react";

// Component imports
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import MovingProcess from "./components/MovingProcess";
import Testimonials from "./components/Testimonials";
import ServiceAreas from "./components/ServiceAreas";
import FAQ from "./components/FAQ";
import QuoteForm from "./components/QuoteForm";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

export default function App() {
  const [selectedService, setSelectedService] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top visibility tracker
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  const handleScrollToQuote = () => {
    const element = document.getElementById("contact");
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
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-[#155EEF] selection:text-white overflow-x-hidden">
      
      {/* Header Sticky Bar */}
      <Header />

      {/* Main Sections */}
      <main>
        
        {/* Hero Section with Interactive 3D Canvas */}
        <Hero />

        {/* About Deliverd Story Section */}
        <AboutUs />

        {/* Moving & Logistics Services Grid */}
        <Services onSelectService={handleSelectService} />

        {/* Why Choose Deliverd Highlights */}
        <WhyChooseUs />

        {/* 4-Step Interactive Moving Timeline */}
        <MovingProcess />

        {/* Realistic Verified Testimonials Showcase */}
        <Testimonials />

        {/* Surrey, BC & Canada Service Areas Section */}
        <ServiceAreas />

        {/* Interactive FAQ Accordion */}
        <FAQ />

        {/* Multi-step Calculator Quote Request Form */}
        <QuoteForm selectedService={selectedService} />

        {/* Final CTA Bar to encourage direct bookings */}
        <section className="py-16 bg-slate-50 border-t border-b border-slate-200 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#155EEF] to-[#12B76A] blur-3xl opacity-10" />
          </div>

          <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Planning Your Upcoming Move?
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto">
              Our friendly teams are ready to secure your dates and rates. Connect with us via email, form estimate, or call directly for a neighborly consultation!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href="tel:6044417304"
                className="bg-[#155EEF] hover:bg-[#155EEF]/95 text-white font-bold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center space-x-2.5"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                <span>Call (604) 441-7304</span>
              </a>
              <button
                onClick={handleScrollToQuote}
                className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold px-8 py-3.5 rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Details Developed by iWebNext */}
      <Footer />

      {/* Floating AI Chatbot Widget (Delly Mover Assistant) */}
      <Chatbot />

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-24 z-40 w-12 h-12 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title="Scroll back to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
        </button>
      )}

    </div>
  );
}
