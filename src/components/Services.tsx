import { Home, Building, Briefcase, Sofa, Package, ShoppingCart, Compass, Box, ArrowUpRight } from "lucide-react";
import { ServiceItem } from "../types";

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const services: ServiceItem[] = [
    {
      id: "residential",
      title: "Residential Moving",
      description: "Complete, stress-free home transitions tailored to your family's needs.",
      icon: "Home",
      details: ["Movers + Fully Equipped Truck", "Free Wardrobe Box Rentals", "Heavy Furniture Assembly/Disassembly", "Premium Floor Protectors Included"]
    },
    {
      id: "apartment",
      title: "Apartment Moving",
      description: "Fast and nimble condo relocations, expertly navigating stairs, elevators, and loading docks.",
      icon: "Building",
      details: ["Elevator Wall Padding Setup", "Strata Regulation Compliant", "Tight-turn Expert Maneuvering", "Secure Loading Bays Handling"]
    },
    {
      id: "office",
      title: "Office Moving",
      description: "Professional commercial relocations optimized to minimize business downtime.",
      icon: "Briefcase",
      details: ["Tech, Server, & Screen Packing", "Desks & Partition Disassembly", "After-hours & Weekend Booking", "Secure Confidential Archive Box Moves"]
    },
    {
      id: "furniture",
      title: "Furniture Delivery",
      description: "Curbside or full white-glove setup of heavy furniture items.",
      icon: "Sofa",
      details: ["Store Pickup & Assembly", "Room-of-Choice Placement", "Old Furniture Disposal Available", "Scratch-Free Bubble-wrap Padding"]
    },
    {
      id: "appliance",
      title: "Appliance Delivery",
      description: "Transportation of fridges, washers, dryers, stoves with specialist dollying.",
      icon: "Package",
      details: ["Strap-secured Appliance Dollies", "Protective Blanketing during transit", "Experienced Appliance Placement", "Stairs handling capability"]
    },
    {
      id: "marketplace",
      title: "Marketplace Pickup",
      description: "Picked up and delivered from Facebook Marketplace, Craigslist, IKEA, Costco, etc.",
      icon: "ShoppingCart",
      details: ["Direct Seller Communication Coordination", "On-site Condition Inspection Photos", "Instant Delivery Reporting", "Affordable Flat Rates"]
    },
    {
      id: "long-distance",
      title: "Long Distance Moving",
      description: "Tailored interstate moves across British Columbia and nationwide Canada.",
      icon: "Compass",
      details: ["Dedicated Container Space", "Surrey to anywhere in BC/Canada", "Full Inventory Checklists", "GPS Route Updates for Peace of Mind"]
    },
    {
      id: "packing",
      title: "Packing Assistance",
      description: "Professional packing and unpacking with certified premium materials.",
      icon: "Box",
      details: ["Custom Bubble-wrap & Double-walled boxes", "Fragile Glassware & Art Crating", "Sturdy box labeling by Room", "Post-move Packing Debrief & Recycling"]
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Home": return <Home className="w-6 h-6 text-[#155EEF]" />;
      case "Building": return <Building className="w-6 h-6 text-[#12B76A]" />;
      case "Briefcase": return <Briefcase className="w-6 h-6 text-[#F79009]" />;
      case "Sofa": return <Sofa className="w-6 h-6 text-[#155EEF]" />;
      case "Package": return <Package className="w-6 h-6 text-[#12B76A]" />;
      case "ShoppingCart": return <ShoppingCart className="w-6 h-6 text-[#F79009]" />;
      case "Compass": return <Compass className="w-6 h-6 text-[#155EEF]" />;
      case "Box": return <Box className="w-6 h-6 text-[#12B76A]" />;
      default: return <Home className="w-6 h-6 text-[#155EEF]" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#12B76A] font-mono bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            Professional Logistics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Comprehensive Moving & Delivery Services
          </h2>
          <p className="text-slate-500 text-sm">
            Deliverd handles tasks of all scales—from single-item marketplace couch deliveries to complete long-distance residential moves from British Columbia across Canada.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((serv) => (
            <div 
              key={serv.id} 
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#155EEF] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  {getIcon(serv.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#155EEF] transition-colors flex items-center">
                    <span>{serv.title}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                {/* Sub-details list */}
                <ul className="space-y-1.5 pt-3 border-t border-slate-100">
                  {serv.details.map((det, idx) => (
                    <li key={idx} className="text-[11px] text-slate-600 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A] mr-2 flex-shrink-0" />
                      <span>{det}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectService(serv.title)}
                className="mt-6 w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-[#155EEF] hover:text-white hover:border-[#155EEF] text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                <span>Book Service</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
