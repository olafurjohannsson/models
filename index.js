export default {
  async fetch(req) {
    const modelUrl = "https://github.com/olafurjohannsson/models/raw/2f34e31179390e531f44f0850b24c1f9614e4422/ggml-tiny.en.bin";
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
