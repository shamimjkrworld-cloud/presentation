import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API key is present; in a real app, handle this gracefully.
// For this environment, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const getSymptomAnalysis = async (symptoms: string): Promise<string> => {
  if (!apiKey) return "API Key is missing. Unable to analyze symptoms.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful medical assistant for a telemedicine app. 
      The user is describing these symptoms: "${symptoms}".
      
      Please provide a brief, reassuring analysis including:
      1. Possible common causes (state clearly this is not a diagnosis).
      2. Which type of specialist they should consult (e.g., Dermatologist, Cardiologist).
      3. Urgency level (Low, Medium, High - seek emergency care).
      
      Keep it concise (under 150 words) and formatted with bullet points for readability.`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process your request at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while analyzing your symptoms. Please try again.";
  }
};
