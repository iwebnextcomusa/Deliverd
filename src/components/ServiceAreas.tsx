import { MapPin, Globe, Compass, Star } from "lucide-react";

export default function ServiceAreas() {
  const localAreas = [
    { city: "Surrey", dispatch: "Main Hub - 15 Mins", rate: "Local Hero" },
    { city: "Langley", dispatch: "20 Mins Dispatch", rate: "Neighbourhood" },
    { city: "Delta", dispatch: "25 Mins Dispatch", rate: "Neighbourhood" },
    { city: "Richmond", dispatch: "30 Mins Dispatch", rate: "Neighbourhood" },
    { city: "Burnaby", dispatch: "25 Mins Dispatch", rate: "Metro Vancouver" },
    { city: "Vancouver", dispatch: "35 Mins Dispatch", rate: "Metro Vancouver" },
    { city: "Coquitlam", dispatch: "30 Mins Dispatch", rate: "Metro Vancouver" },
    { city: "New Westminster", dispatch: "25 Mins Dispatch", rate: "Metro Vancouver" },
    { city: "White Rock", dispatch: "20 Mins Dispatch", rate: "Local Hero" },
    { city: "Abbotsford", dispatch: "40 Mins Dispatch", rate: "Fraser Valley" },
    { city: "Maple Ridge", dispatch: "35 Mins Dispatch", rate: "Fraser Valley" },
    { city: "Pitt Meadows", dispatch: "30 Mins Dispatch", rate: "Fraser Valley" }
  ];

  return (
    <section id="service-areas" className="py-20 bg-slate-50 border-b border-slate-100 overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#12B76A]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Editorial Typography and Highlights */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F79009] font-mono bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
              Our Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Proudly Serving Surrey, Metro Vancouver & Across Canada
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We are headquartered in <strong>Surrey, British Columbia</strong>, allowing us to rapidly dispatch moving crews and logistics support all throughout the Lower Mainland and Fraser Valley.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex space-x-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4 text-[#155EEF]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Surrey Headquarters</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Rapid dispatch for Cloverdale, Guildford, Fleetwood, Whalley, Newton, and South Surrey.</p>
                </div>
              </div>

              <div className="flex space-x-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Compass className="w-4 h-4 text-[#12B76A]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Province-Wide Moves</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Regular service to Vancouver Island, Okanagan Valley, Kootenays, and Northern BC.</p>
                </div>
              </div>

              <div className="flex space-x-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Globe className="w-4 h-4 text-[#F79009]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Cross-Canada Relocations</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Moving to Alberta, Ontario, or the Maritimes? We coordinate safe, long-distance direct transits.</p>
                </div>
              </div>
            </div>

            {/* Micro Badge info */}
            <div className="border border-[#12B76A]/20 bg-emerald-50 rounded-xl p-4 flex items-center space-x-3">
              <Star className="w-5 h-5 text-[#12B76A] fill-[#12B76A]" />
              <p className="text-xs text-slate-700">
                <strong>Heading out of BC?</strong> Deliverd offers dedicated containers and exclusive long-distance flat-rates that lock in your travel price!
              </p>
            </div>
          </div>

          {/* Right Side: Interactive City Capsule Grid */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 md:p-8 rounded-3xl relative shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Lower Mainland & Fraser Valley Dispatch Estimates</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {localAreas.map((area, index) => (
                <div 
                  key={index} 
                  className="bg-slate-50 border border-slate-200 hover:border-[#155EEF] p-3.5 rounded-xl transition-all cursor-default"
                >
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                    <span className="text-xs font-bold text-slate-900 block">{area.city}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1.5 font-mono">
                    {area.dispatch}
                  </span>
                  <span className="inline-block text-[9px] font-semibold text-slate-400 uppercase tracking-widest font-mono mt-0.5">
                    {area.rate}
                  </span>
                </div>
              ))}
            </div>

            {/* Out-of-bounds banner */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-500 block">
                Don't see your city? We service the entirety of BC and Canada.
              </span>
              <span className="text-xs font-bold text-slate-900 block mt-1">
                Call our logistics hotline at (604) 441-7304 to verify service.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
