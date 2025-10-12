// Script to list all available Gemini models for your API key
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./constants";

export const listAvailableModels = async () => {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    console.log("🔍 Fetching available models...");
    console.log(
      "API Key (first 10 chars):",
      GEMINI_API_KEY.substring(0, 10) + "..."
    );

    // Try to list models
    const models = await genAI.listModels();

    console.log("✅ Available models:");
    models.forEach((model, index) => {
      console.log(`${index + 1}. ${model.name}`);
      console.log(`   - Display Name: ${model.displayName}`);
      console.log(
        `   - Supported Methods: ${model.supportedGenerationMethods?.join(
          ", "
        )}`
      );
      console.log("---");
    });

    return models;
  } catch (error) {
    console.error("❌ Error listing models:", error);

    // If listing fails, let's try some common model names directly
    console.log("🔄 Trying to test individual models...");

    const testModels = [
      "gemini-pro",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "text-bison-001",
      "chat-bison-001",
      "models/gemini-pro",
      "models/gemini-1.5-flash",
      "models/text-bison-001",
    ];

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    for (const modelName of testModels) {
      try {
        console.log(`Testing: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        console.log(`✅ ${modelName} - WORKS!`);
        return modelName; // Return the first working model
      } catch (err) {
        console.log(`❌ ${modelName} - Failed: ${err.message}`);
      }
    }

    throw new Error("No working models found");
  }
};

// Auto-run when imported (you can comment this out)
// listAvailableModels();
