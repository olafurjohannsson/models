export default {
  async fetch(req) {
    const modelUrl = "https://raw.githubusercontent.com/olafurjohannsson/models/main/ggml-tiny.en.bin";
    const resp = await fetch(modelUrl);

    return new Response(resp.body, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Cross-Origin-Resource-Policy": "same-origin",
	"Access-Control-Allow-Origin": "https://caption-kjarni-ai.pages.dev"
      },
    });
  },
};
