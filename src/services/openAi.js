import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../constants";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Function to try different models
export const generateContentWithFallback = async (prompt) => {
  const modelNames = [
    "models/gemini-2.5-flash", // Latest stable
    "models/gemini-flash-latest", // Always latest
    "models/gemini-2.0-flash", // Stable fallback
    "models/gemini-pro-latest", // Pro version
    "models/gemini-2.5-pro", // Pro stable
  ];

  for (const modelName of modelNames) {
    try {
      console.log(`Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      console.log(`✅ SUCCESS with model: ${modelName}`);
      return result;
    } catch (error) {
      console.warn(`❌ Model ${modelName} failed:`, error.message);
      continue;
    }
  }

  throw new Error(
    "All Gemini models failed. Please check your API key and try again."
  );
};

// Default export for backward compatibility
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
export default model;
