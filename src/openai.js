import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY
});

export async function sendMsgToOpenAI(message) {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
    temperature: 0.7,
    max_tokens: 256
  });

  return res.choices[0].message.content;
}
