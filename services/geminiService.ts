
import { GoogleGenAI } from "@google/genai";

// Ensure initialization uses process.env.API_KEY directly per technical requirements
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateAnalysis(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
