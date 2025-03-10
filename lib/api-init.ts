// This file initializes API keys for client-side use

export function initializeApiKeys() {
  if (typeof window !== "undefined") {
    // We're in the browser
    // @ts-ignore - Setting this property on window for client-side access
    window.process = window.process || {}
    // @ts-ignore - Setting env object if it doesn't exist
    window.process.env = window.process.env || {}
    // @ts-ignore - Setting the API key
    window.process.env.GOOGLE_GENERATIVE_AI_API_KEY = "AIzaSyCOxUe6gU_jDux2RilGCFdb7r-47jhzSf0"
  }
}

