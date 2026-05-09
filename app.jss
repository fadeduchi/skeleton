// USER ID SIMPLE
const userId = crypto.randomUUID();

// ELEMENTOS (ESTO era tu error más probable)
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

// DEBUG
console.log("JS cargado");

// ADD MESSAGE
function add(role, text) {
  const div = document.createElement("div");
  div.className = "msg " + role;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// SEND TO API
async function sendToAI(message) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        message
      })
    });

    const data = await res.json();
    return data.reply || "Sin respuesta";
  } catch (err) {
    console.error(err);
    return "Error en la conexión";
  }
}

// MAIN SEND
async function handleSend() {
  const msg = input.value.trim();
  if (!msg) return;

  add("user", msg);
  input.value = "";

  add("bot", "Pensando...");

  const reply = await sendToAI(msg);

  chat.lastChild.textContent = reply;
}

// BUTTON
send.addEventListener("click", handleSend);

// ENTER KEY
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});