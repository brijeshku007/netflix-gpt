// Direct REST API call to get available models
export const getAvailableModels = async () => {
  const API_KEY = "AIzaSyChgb6bWmq_jBTR957TSH7oyZkQW5UqyOs";

  try {
    console.log("🔍 Fetching models via REST API...");

    // Try the models endpoint
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Available models:", data);

    if (data.models) {
      console.log("📋 Model list:");
      data.models.forEach((model, index) => {
        console.log(`${index + 1}. ${model.name}`);
        console.log(`   Display Name: ${model.displayName}`);
        console.log(
          `   Methods: ${model.supportedGenerationMethods?.join(", ")}`
        );
        console.log("---");
      });

      // Find models that support generateContent
      const workingModels = data.models.filter((model) =>
        model.supportedGenerationMethods?.includes("generateContent")
      );

      console.log("🎯 Models that support generateContent:");
      workingModels.forEach((model) => {
        console.log(`✅ ${model.name} - ${model.displayName}`);
      });

      return workingModels;
    }

    return data;
  } catch (error) {
    console.error("❌ Error fetching models:", error);

    // If that fails, try the v1 endpoint
    try {
      console.log("🔄 Trying v1 endpoint...");
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("✅ V1 API response:", data);
        return data;
      }
    } catch (v1Error) {
      console.error("❌ V1 API also failed:", v1Error);
    }

    throw error;
  }
};

// Test a specific model with direct API call
export const testModelDirect = async (modelName) => {
  const API_KEY = "AIzaSyChgb6bWmq_jBTR957TSH7oyZkQW5UqyOs";

  try {
    console.log(`🧪 Testing ${modelName} with direct API...`);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Hello, respond with just 'Hi'",
                },
              ],
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ${modelName} WORKS!`, data);
      return { success: true, data };
    } else {
      const error = await response.text();
      console.log(`❌ ${modelName} FAILED: ${response.status} - ${error}`);
      return { success: false, error };
    }
  } catch (error) {
    console.log(`❌ ${modelName} ERROR:`, error.message);
    return { success: false, error: error.message };
  }
};
