export default async function sendMsgToOpenAI(message) {
  const res = await fetch(
    "https://gpt-production-31ec.up.railway.app/api/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }
  );

  if (!res.ok) {
    throw new Error("Backend error");
  }

  const data = await res.json();
  return data.reply;
}
