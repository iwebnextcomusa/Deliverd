import { useState } from "react";
import { FileText, CalendarClock, ShieldAlert, Truck, ChevronRight, Check } from "lucide-react";
import { TimelineStep } from "../types";

export default function MovingProcess() {
  const [activeStep, setActiveStep] = useState(1);

  const steps: TimelineStep[] = [
    {
      step: 1,
      title: "Request a Free Quote",
      description: "Submit details in 60 seconds",
      details: "Fill out our quick online moving calculator form or text/call Delly, our smart assistant, right here on the site. Tell us what you are moving, your addresses, and your desired date. We'll generate an instant estimate with zero obligations."
    },
    {
      step: 2,
      title: "Schedule Your Move",
      description: "Lock in your date & transparent rate",
      details: "Once you approve our estimate, we'll confirm the reservation. We allocate a dedicated professional moving truck and a certified, experienced local crew exclusively for your time slot. No double bookings, no stress."
    },
    {
      step: 3,
      title: "Professional Pickup",
      description: "Our friendly team handles all heavy lifting",
      details: "On moving day, our team arrives on time in a fully equipped truck. We pad all heavy furniture, shrink-wrap mattresses and fabrics, dissemble bulky items, and load the vehicle securely. Sit back and watch our crew handle everything with care."
    },
    {
      step: 4,
      title: "Safe & Timely Delivery",
      description: "Unloaded, unpacked, and placed perfectly",
      details: "We transport your items via the safest routes. Upon arrival, we place every box and heavy item in its designated room, reassemble bed frames and dining tables, and verify the inventory checklist before we leave you to settle in."
    }
  ];

  const getIcon = (stepNum: number) => {
    switch (stepNum) {
      case 1: return <FileText className="w-5 h-5" />;
      case 2: return <CalendarClock className="w-5 h-5" />;
      case 3: return <ShieldAlert className="w-5 h-5" />;
      case 4: return <Truck className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#155EEF] font-mono bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Our Seamless Four-Step Process
          </h2>
          <p className="text-slate-500 text-sm">
            From the initial consultation to the final placement, we organize every stage of your transition so you can focus on getting settled.
          </p>
        </div>

        {/* Step Navigation Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-slate-200 -z-0" />

          {steps.map((item) => {
            const isCompleted = item.step < activeStep;
            const isActive = item.step === activeStep;

            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`z-10 bg-white border text-left p-5 rounded-2xl transition-all cursor-pointer relative group ${
                  isActive 
                    ? "border-[#155EEF] shadow-md shadow-[#155EEF]/5" 
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {/* Step circle */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    isCompleted 
                      ? "bg-[#12B76A] text-white" 
                      : isActive 
                        ? "bg-[#155EEF] text-white" 
                        : "bg-slate-50 text-slate-400 border border-slate-200"
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : getIcon(item.step)}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-mono font-bold ${
                    isActive ? "text-[#155EEF]" : isCompleted ? "text-[#12B76A]" : "text-slate-400"
                  }`}>
                    Step 0{item.step}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#155EEF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Explainer Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto shadow-sm">
          
          <div className="md:col-span-8 space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-[#F79009] font-mono bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 font-bold">
              Active Step Deep Dive
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              {steps[activeStep - 1].title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {steps[activeStep - 1].details}
            </p>
            <div className="flex items-center space-x-6 text-xs font-mono text-slate-500 pt-2">
              <span className="flex items-center">
                <Check className="w-4 h-4 text-[#12B76A] mr-1.5" />
                Neighborly Care
              </span>
              <span className="flex items-center">
                <Check className="w-4 h-4 text-[#12B76A] mr-1.5" />
                Premium Safety
              </span>
              <span className="flex items-center">
                <Check className="w-4 h-4 text-[#12B76A] mr-1.5" />
                100% Insured
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center relative shadow-inner">
              <div className="absolute inset-2 rounded-full border border-dashed border-slate-200 animate-spin" style={{ animationDuration: "20s" }} />
              <div className="text-slate-600 text-center space-y-1 z-10">
                <span className="block text-3xl font-extrabold text-slate-900">
                  0{activeStep}
                </span>
                <span className="block text-[9px] uppercase tracking-wider font-mono text-[#F79009] font-bold">
                  OF 04 STEPS
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
