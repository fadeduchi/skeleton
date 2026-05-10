const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

function addMessage(role, text) {
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();

  if (!message) return;

  addMessage("user", message);
  input.value = "";

  const thinking = document.createElement("div");
  thinking.className = "msg bot";
  thinking.textContent = "Thinking...";
  chat.appendChild(thinking);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message
      })
    });

    const data = await response.json();

    thinking.textContent = data.reply;

  } catch (err) {
    console.error(err);
    thinking.textContent = "Error talking with AI";
  }
}

send.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});