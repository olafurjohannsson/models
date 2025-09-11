export default {
  async fetch(req) {
    const url = new URL(req.url);
    
    // Add CORS headers for all requests
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://caption-kjarni-ai.pages.dev",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    };

    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Fetch from GitHub raw content
      const modelUrl = "https://github.com/olafurjohannsson/models/raw/refs/heads/main/ggml-tiny.en.bin";
      const response = await fetch(modelUrl);
      
      if (!response.ok) {
        throw new Error(`GitHub returned ${response.status}`);
      }

      // Important: Pass through the binary data correctly
      return new Response(response.body, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/octet-stream",
 //         "Cache-Control": "public, max-age=31536000", // Cache for 1 year
          "Content-Length": response.headers.get("Content-Length") || "",
        },
      });
    } catch (error) {
      return new Response(`Error: ${error.message}`, {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
