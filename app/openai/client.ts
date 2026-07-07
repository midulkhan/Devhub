import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant.write a blog post about recent wordpress bug people are facing",
      },
    ],
    model: "deepseek-v4-pro",
    thinking: { type: "enabled" },
    reasoning_effort: "high",
    stream: false,
    max_tokens: 200,
  });

  console.log(completion.choices[0].message.content);
}

main();
