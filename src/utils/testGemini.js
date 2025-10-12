// Test script to verify Gemini API is working
import { generateContentWithFallback } from "./openAi";

export const testGeminiAPI = async () => {
  try {
    console.log("Testing Gemini API...");
    const result = await generateContentWithFallback("Say hello");
    const response = result.response.text();
    console.log("✅ Gemini API is working! Response:", response);
    return { success: true, response };
  } catch (error) {
    console.error("❌ Gemini API test failed:", error);
    return { success: false, error: error.message };
  }
};

// Uncomment the line below to test immediately
// testGeminiAPI();
