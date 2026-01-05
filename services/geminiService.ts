import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const enhanceBio = async (currentBio: string, role: string, skills: string[]): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key not found, returning original bio.");
    return currentBio;
  }

  try {
    const prompt = `
      You are an expert copywriter for developer portfolios. 
      Enhance the following bio to make it sound more professional, punchy, and exciting. 
      Keep it under 250 characters. 
      
      Role: ${role}
      Skills: ${skills.join(', ')}
      Current Draft: "${currentBio}"
      
      Return ONLY the enhanced bio text. No quotes.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || currentBio;
  } catch (error) {
    console.error("Error enhancing bio:", error);
    return currentBio;
  }
};