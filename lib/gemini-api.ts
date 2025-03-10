import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function identifyPlant(imageBase64: string): Promise<{
  plantName: string
  confidence: number
  isHealthy: boolean
  disease?: string
  treatment?: string
}> {
  // Extract the base64 data from the data URL
  const base64Data = imageBase64.split(",")[1]

  const prompt = `
    Analyze this plant image and provide the following information in JSON format:
    1. Plant name (scientific and common)
    2. Confidence level (as a percentage)
    3. Whether the plant appears healthy
    4. If unhealthy, identify the disease
    5. If diseased, suggest treatment options
    
    Format your response as valid JSON with the following structure:
    {
      "plantName": "Common Name (Scientific Name)",
      "confidence": 95.5,
      "isHealthy": true/false,
      "disease": "Disease name (if applicable)",
      "treatment": "Treatment suggestions (if applicable)"
    }
    
    Only respond with the JSON object, no additional text.
  `

  try {
    // Set the environment variable that the SDK is looking for
    if (typeof window !== "undefined") {
      // We're in the browser
      // @ts-ignore - Setting this property on window for client-side access
      window.process = window.process || {}
      // @ts-ignore - Setting env object if it doesn't exist
      window.process.env = window.process.env || {}
      // @ts-ignore - Setting the API key
      window.process.env.GOOGLE_GENERATIVE_AI_API_KEY = "AIzaSyCOxUe6gU_jDux2RilGCFdb7r-47jhzSf0"
    }

    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest"),
      prompt,
      image: base64Data,
    })

    // Parse the JSON response
    const result = JSON.parse(text)
    return result
  } catch (error) {
    console.error("Error identifying plant:", error)
    // Return a fallback response
    return {
      plantName: "Unknown Plant",
      confidence: 0,
      isHealthy: false,
      disease: "Unable to identify",
      treatment: "Please try again with a clearer image",
    }
  }
}

