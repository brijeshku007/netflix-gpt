import React, { useState } from "react";
import { getAvailableModels, testModelDirect } from "../../utils/directApiTest";

const ModelTester = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState("");

  const testModels = async () => {
    setIsLoading(true);
    setResults("🔍 Getting available models via REST API...\n\n");

    try {
      // First, get available models
      const models = await getAvailableModels();
      setResults(
        (prev) => prev + `Found models! Check console for details.\n\n`
      );

      // If we got models, test a few
      if (models && models.length > 0) {
        setResults((prev) => prev + `🧪 Testing first few models...\n`);

        for (let i = 0; i < Math.min(3, models.length); i++) {
          const modelName = models[i].name;
          const result = await testModelDirect(modelName);

          if (result.success) {
            setResults((prev) => prev + `✅ ${modelName} WORKS!\n`);
            break; // Stop at first working model
          } else {
            setResults((prev) => prev + `❌ ${modelName} failed\n`);
          }
        }
      }
    } catch (error) {
      setResults(
        (prev) =>
          prev + `❌ Error: ${error.message}\nCheck console for details.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "white",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        zIndex: 9999,
        maxWidth: "400px",
      }}
    >
      <h3>🔍 Gemini Model Tester</h3>
      <button
        onClick={testModels}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Testing..." : "Test Available Models"}
      </button>

      {results && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            fontSize: "12px",
            whiteSpace: "pre-wrap",
          }}
        >
          {results}
        </div>
      )}

      <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
        <strong>Instructions:</strong>
        <br />
        1. Click "Test Available Models"
        <br />
        2. Open browser console (F12)
        <br />
        3. Look for working model names
        <br />
        4. Tell me which ones work!
      </div>
    </div>
  );
};

export default ModelTester;
