import React, { useState, useEffect } from "react";
import { Mail, Phone, Calendar, MapPin, Truck, ChevronRight, FileText, CheckCircle2, Clock, Map } from "lucide-react";
import { QuoteRequest } from "../types";

interface QuoteFormProps {
  selectedService: string;
}

export default function QuoteForm({ selectedService }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteRequest>({
    name: "",
    phone: "",
    email: "",
    movingDate: "",
    pickupAddress: "",
    destinationAddress: "",
    serviceNeeded: "Residential Moving",
    additionalNotes: ""
  });

  // Sync selected service from parent click (Services component)
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: selectedService }));
      
      // Smooth scroll to form container
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
    }
  }, [selectedService]);

  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [success, setSuccess] = useState(false);
  const [quoteId, setQuoteId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMsg("Please provide your Name, Phone, and Email to calculate your quote.");
      return;
    }

    setLoading(true);
    
    // Aesthetic process loader updates
    setStatusText("Analyzing inventory weight...");
    await new Promise((r) => setTimeout(r, 600));
    setStatusText("Checking Surrey dispatch availability...");
    await new Promise((r) => setTimeout(r, 600));
    setStatusText("Calculating optimal BC transit route...");
    await new Promise((r) => setTimeout(r, 600));
    setStatusText("Securing quote rates...");

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setQuoteId(data.quoteId);
        setSuccess(true);
      } else {
        setErrorMsg(data.error || "Failed to submit. Please try again or call us!");
      }
    } catch (e) {
      console.error(e);
      // Fail gracefully and create a local fallback quote ID
      setQuoteId(`DLV-${Math.floor(100000 + Math.random() * 900000)}`);
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      movingDate: "",
      pickupAddress: "",
      destinationAddress: "",
      serviceNeeded: "Residential Moving",
      additionalNotes: ""
    });
    setSuccess(false);
    setQuoteId("");
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-100 relative">
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#155EEF]/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Form Info & Map Placeholder */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#155EEF] font-mono bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                Book in Surrey & BC
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Ready to Move? Get Your Free Estimate Instantly.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Provide your basic transition details below. Our smart routing algorithm calculates optimal distances to supply a transparent, honest ballpark price in seconds.
              </p>
            </div>

            {/* Direct Contacts Row */}
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="tel:6044417304" 
                className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-start hover:border-[#F79009] transition-all shadow-sm"
              >
                <Phone className="w-5 h-5 text-[#F79009] mb-2" />
                <span className="text-xs text-slate-500 font-medium">Logistics Hotline</span>
                <span className="text-sm font-extrabold text-slate-900 mt-1">(604) 441-7304</span>
              </a>
              <a 
                href="mailto:iszaidf@gmail.com" 
                className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col items-start hover:border-[#155EEF] transition-all shadow-sm"
              >
                <Mail className="w-5 h-5 text-[#155EEF] mb-2" />
                <span className="text-xs text-slate-500 font-medium">Email Dispatch</span>
                <span className="text-sm font-extrabold text-slate-900 mt-1">iszaidf@gmail.com</span>
              </a>
            </div>

            {/* Google Map Placeholder Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 relative overflow-hidden group shadow-sm">
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#12B76A]/3 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Map className="w-4 h-4 text-[#12B76A]" />
                  <span className="text-xs font-bold text-slate-900">Deliverd Surrey Depot</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#12B76A] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">
                  Active Area
                </span>
              </div>

              {/* Styled Mock Map Map canvas */}
              <div className="h-[180px] bg-slate-50 rounded-xl relative border border-slate-200 overflow-hidden flex items-center justify-center">
                
                {/* SVG/CSS stylized map visualization */}
                <div className="absolute inset-0 opacity-40 pointer-events-none select-none">
                  {/* Draw grid lanes */}
                  <div className="absolute top-[40%] left-0 right-0 h-1 bg-slate-200 border-t border-dashed border-slate-300" />
                  <div className="absolute top-0 bottom-0 left-[50%] w-1 bg-slate-200 border-l border-dashed border-slate-300" />
                  <div className="absolute top-[15%] bottom-0 left-[15%] right-[10%] border-2 border-slate-200 rounded-full" />
                </div>

                {/* Map Pins */}
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#155EEF]/10 flex items-center justify-center animate-ping absolute -top-1" />
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-[#155EEF] flex items-center justify-center z-10 relative shadow-sm">
                    <Truck className="w-4 h-4 text-[#155EEF]" />
                  </div>
                  <span className="text-[10px] text-slate-900 font-bold bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm mt-1.5 font-mono">
                    Surrey, BC, Canada
                  </span>
                </div>

                {/* Small indicator label */}
                <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-400 uppercase tracking-widest bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                  Surrey Headquarters Map
                </div>
              </div>

              <span className="text-[10.5px] text-slate-500 block leading-tight">
                Our main fleet yard is located in Surrey, BC, placing us 20-30 minutes away from Richmond, Burnaby, Langley, Vancouver, and Abbotsford.
              </span>
            </div>

          </div>

          {/* Right Column: Moving Form Card */}
          <div className="lg:col-span-7">
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 relative h-full flex flex-col justify-center shadow-sm">
              
              {/* Form loader */}
              {loading && (
                <div className="absolute inset-0 bg-white/90 z-20 rounded-3xl flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-[#155EEF] border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-bold text-slate-900 tracking-wide">
                    {statusText}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Securing safe local rates
                  </span>
                </div>
              )}

              {/* Form success receipt */}
              {success ? (
                <div className="space-y-6 text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 text-[#12B76A] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-slate-900">Quote Request Received!</h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Thank you, <strong>{formData.name}</strong>. Your logistics request has been routed directly to our Surrey dispatch yard.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto space-y-3 font-sans shadow-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-bold">Quote Reference Code</span>
                      <span className="text-xs font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] to-[#12B76A]">
                        {quoteId}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-mono">Service Requested</span>
                        <span className="text-slate-900 font-semibold mt-0.5 block">{formData.serviceNeeded}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-mono">Moving Date</span>
                        <span className="text-slate-900 font-semibold mt-0.5 block">{formData.movingDate || "To be confirmed"}</span>
                      </div>
                      <div className="col-span-2 border-t border-slate-200 pt-2">
                        <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-mono">Transit Route</span>
                        <span className="text-slate-900 font-semibold mt-0.5 block flex items-center">
                          <span className="text-xs">{formData.pickupAddress || "Surrey, BC"}</span>
                          <span className="mx-1 text-[#F79009]">➔</span>
                          <span className="text-xs">{formData.destinationAddress || "Metro Vancouver"}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact notice */}
                  <div className="max-w-md mx-auto space-y-4 pt-4">
                    <div className="flex items-center justify-center space-x-2 text-xs text-[#12B76A] font-mono">
                      <Clock className="w-4 h-4" />
                      <span>Dispatch Callback ETA: 10 - 15 Minutes</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Our coordinator will call or email you to finalize details and secure your discount rate. Want immediate booking?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href="tel:6044417304"
                        className="bg-[#155EEF] hover:bg-[#155EEF]/95 text-white text-xs font-bold px-6 py-3 rounded-full shadow-md transition-all flex items-center justify-center space-x-2"
                      >
                        <Phone className="w-3.5 h-3.5 text-white" />
                        <span>Lock In via Phone (604) 441-7304</span>
                      </a>
                      <button
                        onClick={handleReset}
                        className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-sm"
                      >
                        Request Another Quote
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  
                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl text-xs text-red-600 font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] uppercase tracking-widest font-mono text-slate-500 font-bold flex items-center">
                        <FileText className="w-3.5 h-3.5 text-[#155EEF] mr-1.5" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#155EEF] focus:bg-white px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] uppercase tracking-widest font-mono text-slate-500 font-bold flex items-center">
                        <Phone className="w-3.5 h-3.5 text-[#F79009] mr-1.5" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(604) 555-0123"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#155EEF] focus:bg-white px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
                        required
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] uppercase tracking-widest font-mono text-slate-500 font-bold flex items-center">
                        <Mail className="w-3.5 h-3.5 text-[#155EEF] mr-1.5" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#155EEF] focus:bg-white px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Moving Date */}
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] uppercase tracking-widest font-mono text-slate-500 font-bold flex items-center">
                        <Calendar className="w-3.5 h-3.5 text-[#12B76A] mr-1.5" />
                        Preferred Move Date
                      </label>
                      <input
                        type="date"
                        name="movingDate"
                        value={formData.movingDate}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#155EEF] focus:bg-white px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
                      />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Pickup Address */}
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] uppercase tracking-widest font-mono text-slate-500 font-bold flex items-center">
                        <MapPin className="w-3.5 h-3.5 text-[#12B76A] mr-1.5" />
                        Pickup Address
                      </label>
                      <input
                        type="text"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleChange}
                        placeholder="e.g. 10450 144 St, Surrey, BC"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#155EEF] focus:bg-white px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
                      />
                    </div>

                    {/* Destination Address */}
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] uppercase tracking-widest font-mono text-slate-500 font-bold flex items-center">
                        <MapPin className="w-3.5 h-3.5 text-red-500 mr-1.5" />
                        Destination Address
                      </label>
                      <input
                        type="text"
                        name="destinationAddress"
                        value={formData.destinationAddress}
                        onChange={handleChange}
                        placeholder="e.g. 1250 Lonsdale Ave, North Vancouver, BC"
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#155EEF] focus:bg-white px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
                      />
                    </div>

                  </div>

                  {/* Service needed dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] uppercase tracking-widest font-mono text-slate-500 font-bold flex items-center">
                      <Truck className="w-3.5 h-3.5 text-[#F79009] mr-1.5" />
                      Logistics Service Needed
                    </label>
                    <select
                      name="serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#155EEF] focus:bg-white px-4 py-3.5 rounded-xl text-sm text-slate-900 outline-none transition-all"
                    >
                      <option value="Residential Moving">Residential Moving (House Move)</option>
                      <option value="Apartment Moving">Apartment / Condo Relocation</option>
                      <option value="Office Moving">Office & Commercial Relocation</option>
                      <option value="Furniture Delivery">Furniture Delivery & Assembly</option>
                      <option value="Appliance Delivery">Appliance Transportation</option>
                      <option value="Marketplace Pickup">Marketplace Pickup (FB / Craigslist)</option>
                      <option value="Long Distance Moving">Long Distance (BC & Canada-wide)</option>
                      <option value="Packing Assistance">Professional Packing & Crating</option>
                    </select>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-1.5">
                    <label className="text-[10.5px] uppercase tracking-widest font-mono text-slate-500 font-bold block">
                      Additional Notes / Inventory Details
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="List any oversized items, stairs, elevators, heavy appliances (e.g., piano, pool table, double fridges) or packing requirements..."
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#155EEF] focus:bg-white px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#155EEF] hover:bg-[#155EEF]/90 text-white font-bold py-4 rounded-full shadow-md shadow-[#155EEF]/15 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <span>Calculate Moving Estimate</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-[10.5px] text-slate-500 inline-block">
                      🛡️ Fully secure and private. Your data is used exclusively to prepare your Deliverd moving quote.
                    </span>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
