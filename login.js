// login.js
// Carrega lista de usuários do localStorage (se existir), caso contrário usa fallback
let USERS = [
  {
    email: "00001110841085sp@al.educacao.sp.gov.br",
    hash: "6d82395823e0c59c8481f029ba5226e7d0f5242b64e337420d1e37a4eee0e1be"
  }

[
  {
    email:"00001124020792sp@al.educacao.sp.gov.br"
  }
]  
];

try {
  const stored = localStorage.getItem("USERS");
  if (stored) {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      USERS = parsed;
    }
  }
} catch (err) {
  console.warn("Erro ao ler USERS do localStorage:", err);
}

// Função para gerar o hash SHA-256 (usada tanto no registro quanto aqui)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Espera o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msgEl = document.getElementById("msg");

  if (!form) return console.error("Formulário de login não encontrado (id=loginForm).");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = (document.getElementById("email").value || "").trim();
    const password = document.getElementById("pwd").value || "";

    // limpa mensagem
    msgEl.style.display = "none";
    msgEl.textContent = "";

    if (!email || !password) {
      msgEl.textContent = "Preencha email e senha.";
      msgEl.style.display = "block";
      return;
    }

    const hashedPassword = await hashPassword(password);

    // procura usuário com email + hash
    const user = USERS.find(u => u.email === email && u.hash === hashedPassword);

    if (user) {
      // Sucesso
      localStorage.setItem("authenticated", "true");
      // opcional: salvar email do usuário ao logar
      localStorage.setItem("auth_email", email);
      // redireciona
      window.location.href = "index.html";
    } else {
      msgEl.textContent = "E-mail ou senha incorretos.";
      msgEl.style.display = "block";
    }
  });
});
