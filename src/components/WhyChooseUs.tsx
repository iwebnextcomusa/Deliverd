import { Shield, Coins, Users, CalendarDays, Heart, Sparkles, MapPin, Smile, Award } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Users className="w-5 h-5 text-[#155EEF]" />,
      title: "Reliable, Dedicated Team",
      desc: "Our moving professionals are carefully selected, vetted, and highly trained. No random contractors—only dedicated movers."
    },
    {
      icon: <Coins className="w-5 h-5 text-[#12B76A]" />,
      title: "Affordable, Honest Rates",
      desc: "Competitive pricing tailored around your exact move. Get full clarity upfront with itemized budgets—never any hidden charges."
    },
    {
      icon: <Shield className="w-5 h-5 text-[#F79009]" />,
      title: "Fully Insured & Bonded",
      desc: "Comprehensive transit protection for your precious items. If we pack it and move it, we fully secure it against any mishap."
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: "Friendly Professionals",
      desc: "Our crew treats every client like a next-door neighbor. Helpful, polite, and always smiling through the heavy lifting."
    },
    {
      icon: <CalendarDays className="w-5 h-5 text-[#155EEF]" />,
      title: "On-Time Service, Guaranteed",
      desc: "Punctuality is our standard. We coordinate exactly on your timeline and send active arrival updates so you are never left guessing."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#12B76A]" />,
      title: "Careful, Meticulous Handling",
      desc: "We utilize multi-layer protective materials, extra corner guards, and proper tie-downs to ensure glass and wood arrive scratch-free."
    },
    {
      icon: <Smile className="w-5 h-5 text-[#F79009]" />,
      title: "Transparent & Flexible Scheduling",
      desc: "Moving circumstances change. We offer easy rescheduling and open communication channels leading up to your moving day."
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#155EEF]" />,
      title: "Local Surrey Experts",
      desc: "Having serviced Surrey and BC for years, we know the traffic patterns, estratas, elevator protocols, and shortest routes."
    },
    {
      icon: <Award className="w-5 h-5 text-[#12B76A]" />,
      title: "100% Customer Satisfaction",
      desc: "We aren't finished until you are fully settled and happy. Over 98% of our customers recommend us to their family and friends."
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#12B76A]/3 rounded-full blur-[110px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F79009] font-mono bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
            The Deliverd Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Why British Columbia Trusts Deliverd
          </h2>
          <p className="text-slate-500 text-sm">
            We hold ourselves to higher standards of safety, transparency, and neighborly service. Experience logistics how it should be.
          </p>
        </div>

        {/* Reason Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, index) => (
            <div 
              key={index} 
              className="bg-slate-50 border border-slate-200 p-6 rounded-2xl hover:border-slate-300 hover:bg-slate-50/80 transition-all flex space-x-4 items-start group"
            >
              <div className="bg-white p-3 rounded-xl border border-slate-100 group-hover:scale-105 transition-transform flex-shrink-0 shadow-sm">
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#155EEF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
