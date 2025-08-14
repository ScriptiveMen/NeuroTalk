document.addEventListener("DOMContentLoaded", () => {
  const chatWindow = document.querySelector(".chat-window");
  const chatForm = document.querySelector(".chat-input");
  const chatInput = chatForm.querySelector("input");

  // Helper to render a message
  function renderMessage(text, sender = "user") {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `
      <div class="avatar">${sender === "user" ? "S" : "N"}</div>
      <div class="content">${text}</div>
    `;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userText = chatInput.value.trim();
    if (!userText) return;

    try {
      socket.emit("ai-message", userText);
    } catch (err) {
      console.log(err);
    }

    renderMessage(userText, "user");
    chatInput.value = "";
  });

  socket.on("ai-message-response", (aiMessage) => {
    const botresponse = marked.parse(aiMessage);
    renderMessage(botresponse, "ai");
  });

  // Sidebar hamburger toggle for mobile
  document.querySelectorAll(".hamburger").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".sidebar").classList.toggle("open");
    });
  });

  // Sidebar close button for mobile
  const sidebarCloseBtn = document.querySelector(".sidebar-close");
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener("click", () => {
      document.querySelector(".sidebar").classList.remove("open");
    });
  }
});
