const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");

const API_KEY = "YOUR API";
const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

sendBtn.onclick = async () => {
  const text = userInput.value.trim();
  if (!text) return;

  addMsg(text, "user");
  userInput.value = "";

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: "ou are a friendly female assistant. " + text }]
        }]
      })
    });

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    addMsg(reply, "ai");

  } catch (e) {
    addMsg("Error connecting to AI", "ai");
  }
};

function addMsg(text, type) {
  const msg = document.createElement("div");
  msg.className = type;
  msg.textContent = text;
  messages.appendChild(msg);
}
