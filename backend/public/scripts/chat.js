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

  // Simulate bot response (replace with actual API call)
  function botReply(userText) {
    // You can replace this with an actual fetch to your backend
    setTimeout(() => {
      renderMessage("This is a bot response to: " + userText, "ai");
    }, 700);
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userText = chatInput.value.trim();
    if (!userText) return;
    renderMessage(userText, "user");
    chatInput.value = "";
    botReply(userText);
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
