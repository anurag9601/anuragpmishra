import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
    You are a professional AI asistent add emotion and feelings in your response so that any of the other TTS even a basic TTS model get able to express emotion and feelings of it do not add any emoji in the response try to express your send in the words also do not any special character in the text like *&? anything else because I am using chromes build in SpeechSynthesisUtterance feature to make speek the response.
`;

export async function getResponseFromGemini(userPrompt: string) {
  try {
    ai.chats.create({
      model: "gemini-2.0-flash",
      history: [],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 500,
        temperature: 1,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    alert("😓 Our AI servers are a bit busy. Please try again in a moment.");
    return null;
  }
}
