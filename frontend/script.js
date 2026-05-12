// =============================================
//  AVENOR AI — Frontend Engine
// =============================================

const API_BASE = "http://127.0.0.1:8000";
let memoryCount = 0;
let currentMode = "auto";

// ---- Init ----
window.addEventListener("DOMContentLoaded", () => {
  checkStatus();
  setInterval(checkStatus, 15000);
});

async function checkStatus() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    document.getElementById("status-text").textContent = "All Agents Online";
    document.querySelector(".dot").style.background = "#10b981";
  } catch {
    document.getElementById("status-text").textContent = "Backend Offline";
    document.querySelector(".dot").style.background = "#ef4444";
  }
}

// ---- Mode Selector ----
function setMode(mode) {
  currentMode = mode;
  document.getElementById("mode-select").value = mode;
  document.querySelectorAll(".sidebar-item").forEach(el => el.classList.remove("active"));
  event.currentTarget.classList.add("active");
}

// ---- Suggestion Cards ----
function sendSuggestion(el) {
  const text = el.innerText.trim();
  document.getElementById("chat-input").value = text;
  sendMessage();
}

// ---- Send Message ----
async function sendMessage() {
  const input = document.getElementById("chat-input");
  const query = input.value.trim();
  if (!query) return;

  const mode = document.getElementById("mode-select").value;

  const welcome = document.getElementById("welcome-screen");
  if (welcome) welcome.remove();

  appendMessage("user", query);
  input.value = "";
  input.style.height = "auto";
  memoryCount++;
  document.getElementById("mem-count").textContent = memoryCount;

  const thinkingEl = appendThinking();
  document.getElementById("send-btn").disabled = true;

  try {
    const res = await fetch(`${API_BASE}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, mode }),
    });

    const data = await res.json();
    thinkingEl.remove();
    appendMessage("assistant", data.result, data.agent_used, data.steps, data.image_url);

  } catch (err) {
    thinkingEl.remove();
    appendMessage(
      "assistant",
      "⚠️ Could not reach Avenor AI backend. Make sure uvicorn is running on port 8000.",
      "System",
      []
    );
  }

  document.getElementById("send-btn").disabled = false;
}

// ---- Append Message ----
function appendMessage(role, text, agentUsed = "", steps = [], imageUrl = null) {
  const chatWindow = document.getElementById("chat-window");

  const msg = document.createElement("div");
  msg.className = `message ${role}`;

  // Avatar
  const avatar = document.createElement("div");
  avatar.className = "msg-avatar";
  avatar.textContent = role === "user" ? "U" : "⬡";

  // Content box
  const content = document.createElement("div");
  content.className = "msg-content";

  // Text
  if (text) {
    const textDiv = document.createElement("div");
    textDiv.innerHTML = formatText(text);
    content.appendChild(textDiv);
  }

  // ✅ IMAGE — this is the fixed part
  if (imageUrl) {
    const imgWrapper = document.createElement("div");
    imgWrapper.style.cssText = "margin-top:12px;";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "AI Generated Image";
    img.style.cssText = `
      max-width: 100%;
      width: 500px;
      border-radius: 12px;
      border: 1px solid rgba(99,102,241,0.3);
      display: block;
      margin-top: 8px;
    `;

    // Fallback if image fails to load
    img.onerror = function() {
      imgWrapper.innerHTML = `
        <div style="margin-top:8px;">
          <p style="color:#9ca3af;font-size:0.85rem;margin-bottom:6px;">🖼️ Image ready — open in new tab:</p>
          <a href="${imageUrl}" target="_blank" style="
            color:#6366f1;
            font-size:0.82rem;
            word-break:break-all;
            text-decoration:underline;
          ">${imageUrl}</a>
        </div>
      `;
    };

    imgWrapper.appendChild(img);
    content.appendChild(imgWrapper);
  }

  // Pipeline steps
  if (steps && steps.length > 0) {
    const pipeline = document.createElement("div");
    pipeline.className = "pipeline-steps";
    steps.forEach(s => {
      const step = document.createElement("div");
      step.className = "step-item";
      step.textContent = s;
      pipeline.appendChild(step);
    });
    content.appendChild(pipeline);
  }

  // Meta row
  const meta = document.createElement("div");
  meta.className = "msg-meta";
  meta.innerHTML = `<span>${new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>`;
  if (agentUsed) {
    meta.innerHTML += `<span class="msg-agent-tag">${agentUsed}</span>`;
  }

  // Assemble
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "display:flex;flex-direction:column;max-width:720px;";
  wrapper.appendChild(content);
  wrapper.appendChild(meta);

  msg.appendChild(avatar);
  msg.appendChild(wrapper);

  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ---- Thinking Indicator ----
function appendThinking() {
  const chatWindow = document.getElementById("chat-window");
  const el = document.createElement("div");
  el.className = "thinking";
  el.innerHTML = `
    <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);
    display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:.85rem;flex-shrink:0;">⬡</div>
    <span style="color:#9ca3af;font-size:0.85rem;">Avenor agents processing</span>
    <div class="thinking-dots"><span></span><span></span><span></span></div>
  `;
  chatWindow.appendChild(el);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return el;
}

// ---- Format Text ----
function formatText(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code style="background:rgba(99,102,241,.15);padding:.1rem .35rem;border-radius:4px;font-size:.85em;font-family:monospace;">$1</code>')
    .replace(/\n/g, "<br>");
}

// ---- Keyboard ----
function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

// ---- Auto resize textarea ----
function autoResize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

// ---- Clear Chat ----
function clearChat() {
  const w = document.getElementById("chat-window");
  w.innerHTML = "";
  memoryCount = 0;
  document.getElementById("mem-count").textContent = "0";
}

// ---- Download Documents ----
async function downloadDocument(type) {
  const input = document.getElementById("chat-input").value.trim();
  const query = input || "Write a professional business report on AI trends in 2025";

  const btn = event.currentTarget;
  const original = btn.textContent;
  btn.textContent = "⏳ Generating...";
  btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/generate-${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = type === "pdf" ? "avenor_document.pdf" : "avenor_document.docx";
    a.click();
    URL.revokeObjectURL(url);

  } catch (err) {
    alert("Document generation failed. Make sure backend is running.");
  }

  btn.textContent = original;
  btn.disabled = false;
}