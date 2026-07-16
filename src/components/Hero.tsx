import { useState, useEffect, useRef } from "react";
import { Phone, CheckCircle, ShieldCheck, Award, Users, Volume2, VolumeX } from "lucide-react";

const VIDEO_URL = "https://rre9mgdmrmv3ysal.public.blob.vercel-storage.com/Deliverd_moving_and_delivery_ser%E2%80%A6_202607162207.mp4";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMute = () => {
    if (videoRef.current) {
      const nextMuteState = !videoRef.current.muted;
      videoRef.current.muted = nextMuteState;
      setIsMuted(nextMuteState);
    }
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
    <section id="hero" className="relative bg-slate-50 pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-slate-100">
      {/* Parallax Background Video of Moving Truck */}
      <div 
        className="absolute inset-x-0 -top-[15%] h-[130%] z-0 select-none pointer-events-none will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <video 
          ref={videoRef}
          src={VIDEO_URL} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-45 sm:opacity-50"
        />
        {/* Soft elegant gradient overlays to blend the background image perfectly */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/15 via-slate-50/60 to-slate-50" />
      </div>

      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#155EEF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#12B76A]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        <div className="max-w-4xl space-y-8 flex flex-col items-center">
          
          {/* Trust badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-50/90 backdrop-blur-sm border border-emerald-100 px-3.5 py-1.5 rounded-full">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12B76A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12B76A]"></span>
            </span>
            <span className="text-xs text-[#12B76A] font-bold uppercase tracking-wider font-mono">
              Trusted Local Movers • Surrey, BC
            </span>
          </div>

          {/* Text block centered and transparent to keep background image fully visible */}
          <div className="space-y-4 max-w-3xl p-6 sm:p-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Moving Made Easy. <br />
              <span className="text-[#155EEF]">
                Delivered with Care.
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto">
              Deliverd provides reliable moving and delivery services throughout Surrey, Metro Vancouver, British Columbia, and across Canada. Our experienced team ensures every move is smooth, safe, and stress-free.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <button
              onClick={handleScrollToQuote}
              className="bg-[#155EEF] hover:bg-[#155EEF]/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all text-center flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <span>Get a Free Quote</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono font-bold">
                Fast
              </span>
            </button>
            <a
              href="tel:6044417304"
              className="flex items-center justify-center space-x-3 text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-8 py-4 rounded-xl transition-all font-bold shadow-sm"
            >
              <Phone className="w-5 h-5 text-[#12B76A]" />
              <span>Call (604) 441-7304</span>
            </a>
          </div>

          {/* Floating Trust Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 w-full">
            {[
              { icon: <ShieldCheck className="w-5 h-5 text-[#12B76A]" />, label: "Fully Insured", sub: "For Peace of Mind" },
              { icon: <Users className="w-5 h-5 text-[#155EEF]" />, label: "Professional Team", sub: "Vetted & Friendly" },
              { icon: <Award className="w-5 h-5 text-[#F79009]" />, label: "Highly Rated", sub: "5-Star Experience" },
              { icon: <CheckCircle className="w-5 h-5 text-[#12B76A]" />, label: "No Hidden Fees", sub: "Honest Flat/Hourly" }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-sm flex flex-col items-center text-center">
                <div className="mb-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100">{item.icon}</div>
                <span className="text-xs font-bold text-slate-900 block">{item.label}</span>
                <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick statistics horizontal ribbon */}
        <div className="border-t border-slate-200 mt-16 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {[
            { stat: "5+", label: "Years of Moving Excellence" },
            { stat: "1,200+", label: "Successful Relocations" },
            { stat: "100%", label: "Fully Licensed & Insured" },
            { stat: "4.9/5", label: "Neighbor Satisfaction Score" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {item.stat}
              </div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Mute/Unmute floating toggle */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20">
        <button
          onClick={handleToggleMute}
          className="bg-white/80 hover:bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200/60 p-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
          title={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-slate-600 group-hover:text-[#155EEF] transition-colors" />
          ) : (
            <Volume2 className="w-5 h-5 text-[#12B76A] group-hover:scale-110 transition-all animate-pulse" />
          )}
        </button>
      </div>
    </section>
  );
}
