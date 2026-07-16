import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FaqItem } from "../types";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "How much does local moving in Surrey & Metro Vancouver cost?",
      answer: "Local moving with Deliverd is calculated on a transparent hourly model. Our rates typically start around $95 to $130 per hour for 2 professional movers and a fully equipped 5-ton moving truck. This rate includes standard disassembling/reassembling, loading, unloading, heavy dollies, secure straps, and full wrapping/padded protection for all furniture. There are absolutely no surprise hidden fees!"
    },
    {
      question: "Do you provide professional packing services?",
      answer: "Yes, we do! We offer partial packing (only your fragile kitchen or fine art) or complete full-pack services where we pack your entire home into sturdy, labeled boxes using premium bubble wrap, acid-free packing paper, and shrink wrap. On moving day, we can also handle full unpacking, reassembly, and cardboard box disposal recycling."
    },
    {
      question: "Are you fully licensed, insured, and bonded?",
      answer: "Absolutely. Deliverd is fully registered, licensed, insured, and bonded in British Columbia. We provide comprehensive cargo protection during transit and basic carrier liability coverage. Your belongings are fully secure with us. We treat your precious items with the exact care we'd give our own family's assets."
    },
    {
      question: "Can you move extremely large, heavy, or specialized furniture?",
      answer: "Yes, we specialize in heavy item transit including glass tables, heavy dressers, double-door refrigerators, exercise machines, and bulky safes. Our team is fully trained in ergonomic lifting techniques and carries specialized strapping and heavy-duty stair-climbing dollies to handle challenging spaces safely."
    },
    {
      question: "Do you offer same-day delivery or emergency moving?",
      answer: "We accommodate same-day delivery for furniture, appliance transportation, and Facebook Marketplace purchases depending on truck and driver availability. Since we dispatch right from Surrey, we are highly responsive! If you have an urgent or emergency move, please call us directly at (604) 441-7304, and we will do our absolute best to assist you."
    },
    {
      question: "How far do you travel? Do you offer long-distance moving?",
      answer: "We travel all across Metro Vancouver, the Fraser Valley, the entire province of British Columbia (including Vancouver Island and the Okanagan), and all across Canada. Whether you are relocating a few blocks within Surrey or moving across provinces to Alberta or Ontario, we offer a dedicated direct transit truck to ensure your items arrive safely and on time."
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-100 overflow-hidden relative">
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-[#155EEF]/3 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#155EEF] font-mono bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm">
            Everything you need to know about booking, hourly rates, packing, and safety protocols with Deliverd.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div 
                key={idx} 
                className={`bg-slate-50 border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-[#155EEF] shadow-sm bg-white" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left p-5 sm:p-6 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start space-x-3.5">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${
                      isOpen ? "text-[#155EEF]" : "text-slate-400"
                    }`} />
                    <span className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className={`w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center transition-colors ${
                      isOpen ? "bg-[#155EEF]/10 border-[#155EEF]/30 text-[#155EEF]" : "text-slate-400"
                    }`}>
                      {isOpen ? <Minus className="w-4.5 h-4.5" /> : <Plus className="w-4.5 h-4.5" />}
                    </div>
                  </div>
                </button>

                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-96 opacity-100 border-t border-slate-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="p-5 sm:p-6 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white/40">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout box */}
        <div className="mt-12 bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <div>
            <span className="text-sm font-bold text-slate-900 block">Have a unique or complex moving question?</span>
            <span className="text-xs text-slate-500 block mt-0.5">Ask our intelligent mover assistant Delly in the floating chat widget!</span>
          </div>
          <a
            href="tel:6044417304"
            className="flex-shrink-0 bg-[#155EEF] hover:bg-[#155EEF]/90 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md transition-all inline-block"
          >
            Or Call: (604) 441-7304
          </a>
        </div>

      </div>
    </section>
  );
}
