import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 256,
      temperature: 0.7,
    });
    res.json({ text: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "Error connecting to OpenAI" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
