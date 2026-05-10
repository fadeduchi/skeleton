export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer sk-ukfyfcRRfZryu3zdQhoVcS9bEaGw0E6D3ZJkMWYW1BFeEMTm",
        "HTTP-Referer": "https://cestlamore.site",
        "X-Title": "CestLaMoreAI",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a modern AI assistant similar to ChatGPT. Always reply in the same language as the user automatically. Keep replies short, direct and natural. Use slang and texting style depending on the language naturally."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.8,
        max_tokens: 300
      })
    });

    const data = await response.json();

    console.log(data);

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({
        reply: "AI error"
      });
    }

    return res.status(200).json({
      reply
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      reply: "Server error"
    });
  }
}