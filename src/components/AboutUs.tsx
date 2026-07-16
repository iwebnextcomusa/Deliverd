import { Sparkles, Shield, Compass, Heart, Smile, BadgeAlert } from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: <Heart className="w-5 h-5 text-[#12B76A]" />,
      title: "Customer-First Neighbors",
      desc: "We treat every move like we're helping our next-door neighbor. Friendly faces, compassionate service, and custom timelines tailored around you."
    },
    {
      icon: <Shield className="w-5 h-5 text-[#155EEF]" />,
      title: "100% Care & Security",
      desc: "Your valuables are packed, padded, and secured with premium moving blankets and heavy-duty shrink wrap. We handle your items with maximum precision."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#F79009]" />,
      title: "Honest, Upfront Pricing",
      desc: "No hidden fuel charges, no surprise fees, and no last-minute shockers. We deliver detailed flat rates or transparent hourly estimates you can trust."
    },
    {
      icon: <Smile className="w-5 h-5 text-[#12B76A]" />,
      title: "Punctual & Dependable",
      desc: "We value your time. Our team schedules precise windows and keeps you fully updated throughout the transit with active real-time coordination."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Branding & Story */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#155EEF] font-mono bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Proudly Based in Surrey. Dedicated to Your Peace of Mind.
            </h2>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                <strong>Deliverd</strong> began with a simple belief: moving shouldn't be the most stressful day of your life. As Surrey locals, we watched neighbors struggle with unreliable freelancers, sudden price hikes, and damaged furniture. We decided to change that by establishing a premium, friendly, and fully professional moving company that treats Surrey and BC residents with real care.
              </p>
              <p>
                Whether you are moving your family home across Surrey, relocating a multi-floor office in downtown Vancouver, or just need a single couch picked up from Facebook Marketplace, our professional team ensures the process is smooth from start to finish.
              </p>
            </div>

            {/* Local Trust Note */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start space-x-3">
              <Compass className="w-5 h-5 text-[#F79009] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-900 block">Sourced Locally, Operated Professionally</span>
                <span className="text-xs text-slate-500 mt-0.5 block">
                  Based right here in Surrey, British Columbia. We service all across Metro Vancouver, the Fraser Valley, BC interior, and long-distance to any Canadian province.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Feature Grid & Grid Illustrations */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-slate-200 hover:bg-slate-50/80 transition-all flex flex-col space-y-3 group hover:translate-y-[-2px]"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  {val.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#155EEF] transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
