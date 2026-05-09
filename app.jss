import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyArb2gGmSc1citacNawUP2oWEoC33VcaGk",
  authDomain: "emiliano-abf5c.firebaseapp.com",
  projectId: "emiliano-abf5c",
  storageBucket: "emiliano-abf5c.firebasestorage.app",
  messagingSenderId: "996718307878",
  appId: "1:996718307878:web:efc03fe73a9e1679a354e7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let messages = [];

// LOGIN
window.loginGoogle = async () => {
  await signInWithPopup(auth, provider);
  document.getElementById("login").classList.add("hidden");
  document.getElementById("chat").classList.remove("hidden");
};

window.logout = async () => {
  await signOut(auth);
  location.reload();
};

// UI
function add(text, cls) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.innerText = text;
  document.getElementById("messages").appendChild(div);
  div.scrollIntoView();
}

// IA PROMPT (AUTO IDIOMA)
const systemPrompt = `
Detecta automáticamente el idioma del usuario.

Reglas:
- Responde en el mismo idioma.
- Si es español → usa tono natural o latino neutro.
- Si es inglés → slang USA.
- Si es francés → francés natural.
- Si es portugués → portugués casual.
- Respuestas cortas, directas, estilo chat.
`;

// SEND MESSAGE
window.send = async () => {
  const input = document.getElementById("input");
  const text = input.value;
  if (!text) return;

  add(text, "user");
  messages.push({ role: "user", content: text });

  input.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ]
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "error";

  messages.push({ role: "assistant", content: reply });
  add(reply, "ai");
};