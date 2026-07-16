import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Setup Gemini client
  const geminiApiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (geminiApiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey: geminiApiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Gemini API Client initialized successfully.");
    } catch (e) {
      console.error("Failed to initialize Gemini API client:", e);
    }
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined. Running in offline/fallback mode for chatbot.");
  }

  // API endpoint for Moving Quote chatbot
  app.post("/api/quote-chat", async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array" });
    }

    if (!ai) {
      // Graceful offline fallback if API key is not present
      const lastMessage = messages[messages.length - 1]?.content || "";
      const lowerMsg = lastMessage.toLowerCase();
      let reply = "Hi there! I am Delly, your neighborly assistant at Deliverd. It looks like my AI core is currently in offline mode (missing API key). However, I can tell you that we provide top-tier local moving starting from $95/hr, long-distance moves, and appliance/furniture delivery in Surrey & Metro Vancouver! For a precise quote, please fill out the 'Get a Free Quote' form above, or give our friendly team a call directly at (604) 441-7304. We'd love to help you!";
      
      if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("how much")) {
        reply = "Local moving with Deliverd is highly affordable! Our standard rates are around $95 - $130 per hour for 2 fully insured movers and a truck. Single item marketplace delivery (like a sofa or fridge) starts at a flat rate of just $75! You can get an instant custom estimate by filling out our quote form or calling us at (604) 441-7304.";
      } else if (lowerMsg.includes("area") || lowerMsg.includes("where") || lowerMsg.includes("surrey")) {
        reply = "We are proudly based in Surrey, BC! We regularly service Surrey, Langley, Delta, Richmond, Burnaby, Vancouver, Coquitlam, New Westminster, White Rock, Abbotsford, and all over the Lower Mainland. We also do long-distance moves across British Columbia and all the way across Canada!";
      } else if (lowerMsg.includes("packing") || lowerMsg.includes("box")) {
        reply = "Yes, we definitely offer full packing and unpacking services! Our professional movers can pack your entire home with premium moving blankets, shrink wrap, and sturdy boxes to ensure everything arrives safely. Just let us know when booking if you need packing assistance.";
      }
      return res.json({ reply });
    }

    try {
      // Map client messages to Gemini history structure.
      const formattedHistory = messages.map(m => {
        const role = m.role === 'user' ? 'user' : 'model';
        return {
          role,
          parts: [{ text: m.content }]
        };
      });

      // System instruction
      const systemInstruction = `You are 'Delly', the friendly AI Moving & Logistics Assistant for 'Deliverd', a premium, highly trustworthy moving company based in Surrey, British Columbia, Canada.

Deliverd contact info:
- Phone: (604) 441-7304
- Email: iszaidf@gmail.com
- Location: Surrey, BC, Canada

About Deliverd:
Deliverd is committed to helping neighbors with seamless and stress-free local and long-distance moving and delivery services. We pride ourselves on reliability, efficiency, professionalism, and a customer-first approach.
We offer:
- Residential Moving (local, provincial, Canada-wide)
- Apartment/Condo Moving
- Office/Commercial Relocations
- Furniture Delivery (IKEA, retail, etc.)
- Appliance Delivery (fridges, washers, stoves)
- Marketplace Pickup (Facebook Marketplace, Craigslist)
- Long Distance Moves (across BC & Canada)
- Packing & Unpacking assistance

Pricing ballparks to share:
- Local moves: Approximately $90 to $130 per hour for 2 movers and a fully equipped truck (includes standard moving blankets, shrink wrap, dollies).
- Single-item pickups/deliveries: Flat rates from $70 to $120 depending on distance.
- Long distance: Tailored flat rates.
- Fully Insured and Bonded.

Your Goal:
1. Act friendly, professional, fast, and local (Surrey / Metro Vancouver area).
2. Gather information if the user is asking about a move:
   - What are they moving? (Apartment, house, single sofa, appliances?)
   - Where are they moving from and to? (e.g. Surrey to Richmond, or Abbotsford to Vancouver?)
   - When is the planned moving date?
3. Give helpful tips, answer questions about moving, packing, or insurance.
4. Provide a friendly ballpark estimate where possible but remind them that for an official firm price, they should fill out the "Get a Free Quote" form on the page or call/text us directly at (604) 441-7304.
5. Keep responses short and easy to read using markdown bullet points. Avoid long walls of text. Be warm and neighborly!`;

      // Call Gemini API using modern SDK
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedHistory,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || "I'm here to help! Could you please share some details about your upcoming move?";
      return res.json({ reply });
    } catch (error: any) {
      console.error("Gemini API Error in route:", error);
      return res.status(500).json({ error: "Sorry, I had an issue calculating that estimate. Please try again or call us!" });
    }
  });

  // Endpoint to submit quote requests (for real interactions)
  app.post("/api/quote-request", (req, res) => {
    const { name, phone, email, movingDate, pickupAddress, destinationAddress, serviceNeeded, additionalNotes } = req.body;
    
    if (!name || !phone || !email) {
      return res.status(400).json({ error: "Name, phone, and email are required to generate a quote request." });
    }

    console.log("New Quote Request Received:", req.body);

    return res.json({
      success: true,
      message: "Quote request submitted successfully!",
      quoteId: `DLV-${Math.floor(100000 + Math.random() * 900000)}`,
      receivedData: {
        name,
        phone,
        email,
        movingDate,
        pickupAddress,
        destinationAddress,
        serviceNeeded,
        additionalNotes
      }
    });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static assets from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express full-stack server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
