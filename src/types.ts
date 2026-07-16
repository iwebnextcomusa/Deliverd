export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TimelineStep {
  step: number;
  title: string;
  description: string;
  details: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatarSeed: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  content: string;
  timestamp: Date;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  movingDate: string;
  pickupAddress: string;
  destinationAddress: string;
  serviceNeeded: string;
  additionalNotes: string;
}
