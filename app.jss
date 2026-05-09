// ==============================
// USER LOCAL (sin login)
// ==============================
const userId = crypto.randomUUID();
console.log("User ID:", userId);

// ==============================
// ELEMENTOS UI
// ==============================
const chatBox = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

// ==============================
// FUNCION: AGREGAR MENSAJE A UI
// ==============================
function addMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = role;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ==============================
// FUNCION: ENVIAR MENSAJE A API
// ==============================
async function sendMessage(message) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        message
      })
    });

    const data = await res.json();
    return data.reply || data.response || "No response";
  } catch (err) {
    console.error(err);
    return "Error connecting to AI";
  }
}

// ==============================
// EVENTO BOTON ENVIAR
// ==============================
sendBtn.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  addMessage("bot", "Thinking...");

  const response = await sendMessage(message);

  // reemplazar "Thinking..."
  chatBox.lastChild.textContent = response;
});

// ==============================
// ENTER PARA ENVIAR
// ==============================
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});