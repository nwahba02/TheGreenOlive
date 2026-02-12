
import { GoogleGenAI } from "@google/genai";

// Initialize GoogleGenAI strictly following guidelines: named parameter and direct process.env.API_KEY access
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getConciergeResponse = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is asking: "${userPrompt}". You are the virtual concierge for 'The Green Olive Bar and Grill'. 
      We serve high-end Mediterranean cuisine. Our highlights include Lamb Rack, Mediterranean Shakshuka, and fig-honey cocktails.
      Respond in a sophisticated, welcoming, and helpful tone. Keep it concise (under 3 sentences).`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    // Correctly accessing the text property directly on the response object
    return response.text || "I apologize, I'm having trouble connecting to the kitchen. How can I help you otherwise?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Welcome to The Green Olive. We are delighted to assist you today.";
  }
};
