import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { TestimonialItem } from "../types";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials: TestimonialItem[] = [
    {
      id: "t1",
      name: "Michael S.",
      location: "Surrey, BC",
      rating: 5,
      text: "Deliverd is absolute gold! We moved our 4-bedroom house from Fleetwood to Cloverdale. The guys arrived exactly on time, were incredibly polite, and packed our heavy oak cabinets and dining table with massive care. Not a single scratch on anything, and the pricing was exactly what they quoted. Will never use anyone else!",
      date: "July 2026",
      avatarSeed: "michaels"
    },
    {
      id: "t2",
      name: "Sarah L.",
      location: "Vancouver, BC",
      rating: 5,
      text: "I bought an antique wardrobe on Facebook Marketplace and was struggling to find an affordable courier. Deliverd was recommended by a friend. They handled everything—coordinated with the seller directly, inspected the item, sent me photos, and delivered it into my apartment room on the 14th floor within hours! Outstanding logistics.",
      date: "June 2026",
      avatarSeed: "sarahl"
    },
    {
      id: "t3",
      name: "David K.",
      location: "Langley, BC",
      rating: 5,
      text: "Moving our consulting office was a massive logistical challenge with all of our server racks and high-end monitors. Deliverd came in over the weekend to minimize downtime. They structured everything beautifully and labeled every monitor and chair. On Monday morning, we were 100% operational. Truly professional movers.",
      date: "May 2026",
      avatarSeed: "davidk"
    },
    {
      id: "t4",
      name: "Elena R.",
      location: "Richmond, BC",
      rating: 5,
      text: "Highly reliable and extremely transparent. They helped me relocate my apartment during a massive rainstorm. Even with the wet roads, they protected my mattress and sofa with dual plastic covers and moving blankets. Super friendly team, honest hourly rates, and zero complaints. Thank you so much!",
      date: "April 2026",
      avatarSeed: "elenar"
    }
  ];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white border-b border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 right-10 w-[300px] h-[300px] bg-[#155EEF]/3 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#12B76A] font-mono bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            Neighborhood Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            What Our Neighbors Say About Deliverd
          </h2>
          <p className="text-slate-500 text-sm">
            We hold ourselves to a standard of absolute care and reliability. Read the real moving experiences of customers in Surrey and across Metro Vancouver.
          </p>
        </div>

        {/* Dynamic Showcase Slider */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Main Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm relative">
            <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-200/50 -z-0 pointer-events-none opacity-40" />

            <div className="space-y-6 relative z-10">
              {/* Star Rating */}
              <div className="flex space-x-1">
                {Array.from({ length: testimonials[activeIdx].rating }).map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 text-amber-500 fill-amber-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed italic">
                "{testimonials[activeIdx].text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${testimonials[activeIdx].avatarSeed}`} 
                      alt={testimonials[activeIdx].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 block flex items-center">
                      {testimonials[activeIdx].name}
                      <CheckCircle2 className="w-4 h-4 text-[#12B76A] ml-1.5" />
                      <span className="text-[9px] text-[#12B76A] uppercase tracking-wider font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 ml-1.5">
                        Verified
                      </span>
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      {testimonials[activeIdx].location} • {testimonials[activeIdx].date}
                    </span>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeIdx ? "w-8 bg-[#155EEF]" : "w-2 bg-slate-200"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
