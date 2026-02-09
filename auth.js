// auth.js
document.addEventListener("DOMContentLoaded", () => {
    const authed = localStorage.getItem("authenticated") === "true";
    if (!authed) {
      window.location.href = "login.html";
      return;
    }
  
    const welcome = document.getElementById("welcome");
    const email = localStorage.getItem("auth_email");
    if (welcome) welcome.textContent = email ? `Logado como: ${email}` : "Logado";
  
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("authenticated");
        localStorage.removeItem("auth_email");
        window.location.href = "login.html";
      });
    }
  });
  