// ================= MEMÓRIA =================
let memoria = JSON.parse(localStorage.getItem("memoriaIA")) || {};

// ================= CONHECIMENTO BASE =================
let conhecimento = [
  {
    topico: "sistema",
    palavras: ["sistema", "sistema operacional", "computador"],
    respostas: [
      "Um sistema operacional é o software principal que controla o computador, como Windows, Linux ou macOS.",
      "O sistema operacional faz a comunicação entre o hardware e o usuário.",
      "Sem um sistema operacional, o computador não consegue funcionar corretamente."
    ]
  },
  {
    topico: "programacao",
    palavras: ["programação", "programar", "codigo", "código"],
    respostas: [
      "Programação é o processo de escrever instruções para o computador executar tarefas.",
      "Quando você programa, você ensina o computador a resolver problemas.",
      "As linguagens de programação transformam ideias em soluções digitais."
    ]
  },
  {
    topico: "javascript",
    palavras: ["javascript", "js"],
    respostas: [
      "JavaScript é uma linguagem usada para criar interatividade em sites.",
      "Com JavaScript é possível criar jogos, sistemas e até servidores.",
      "JavaScript roda direto no navegador e também fora dele."
    ]
  },
  {
    topico: "python",
    palavras: ["python"],
    respostas: [
      "Python é uma linguagem conhecida pela simplicidade e poder.",
      "Ela é muito usada em inteligência artificial, automação e análise de dados.",
      "Python é ótima para iniciantes e profissionais."
    ]
  },
  {
    topico: "ia",
    palavras: ["ia", "inteligência artificial"],
    respostas: [
      "Inteligência artificial é a área que tenta fazer máquinas tomarem decisões inteligentes.",
      "A IA pode usar regras, aprendizado ou modelos grandes como o ChatGPT.",
      "Mesmo uma IA simples pode ser muito útil em projetos."
    ]
  },
  {
    topico: "arduino",
    palavras: ["arduino"],
    respostas: [
      "Arduino é uma plataforma para criar projetos eletrônicos.",
      "Ela combina programação com sensores e componentes físicos.",
      "Arduino é muito usado em educação e prototipagem."
    ]
  }
];

// ================= FUNÇÃO PRINCIPAL =================
function enviar() {
  let input = document.getElementById("pergunta");
  let textoOriginal = input.value.trim();
  let texto = textoOriginal.toLowerCase();
  let respostas = document.getElementById("respostas");

  if (texto === "") return;

  let resposta = null;

  // 1️⃣ MEMÓRIA (aprendizado)
  if (memoria[texto]) {
    resposta = memoria[texto];
  }

  // 2️⃣ CONHECIMENTO BASE
  if (!resposta) {
    resposta = buscarConhecimento(texto);
  }

  // 3️⃣ RACIOCÍNIO SIMULADO
  if (!resposta) {
    resposta = raciocinar(texto);
  }

  // 4️⃣ FALLBACK INTELIGENTE
  if (!resposta) {
    resposta = respostaPadrao(texto);
  }

  respostas.innerHTML += `<p><b>Você:</b> ${textoOriginal}</p>`;
  respostas.innerHTML += `<p><b>IA:</b> ${resposta}</p>`;

  respostas.scrollTop = respostas.scrollHeight;
  input.value = "";
}

// ================= BUSCAR CONHECIMENTO =================
function buscarConhecimento(texto) {
  for (let item of conhecimento) {
    for (let palavra of item.palavras) {
      if (texto.includes(palavra)) {
        return item.respostas[Math.floor(Math.random() * item.respostas.length)];
      }
    }
  }
  return null;
}

// ================= RACIOCÍNIO SIMULADO =================
function raciocinar(texto) {
  if (texto.includes("como")) {
    return "Boa pergunta. Para entender isso, precisamos analisar o contexto e o objetivo do sistema. Pode me dizer exatamente onde você quer chegar?";
  }

  if (texto.includes("por que")) {
    return "Isso acontece por causa da forma como os sistemas são projetados. Cada decisão tem um motivo técnico por trás.";
  }

  if (texto.includes("qual")) {
    return "Depende do cenário. Existem várias possibilidades, e a escolha certa varia conforme o objetivo.";
  }

  return null;
}

// ================= FALLBACK =================
function respostaPadrao(texto) {
  if (texto.includes("?")) {
    return "Essa é uma pergunta interessante 🤔. Ainda não tenho uma resposta exata, mas posso aprender se você me explicar.";
  }

  return "Entendi. Se quiser, aprofunde um pouco mais que eu tento te ajudar 😊";
}

// ================= APRENDIZADO MANUAL =================
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let texto = document.getElementById("pergunta").value.toLowerCase();

    if (texto.startsWith("ensinar")) {
      let partes = texto.replace("ensinar", "").split("=");
      if (partes.length === 2) {
        let pergunta = partes[0].trim();
        let resposta = partes[1].trim();

        memoria[pergunta] = resposta;
        localStorage.setItem("memoriaIA", JSON.stringify(memoria));

        let respostas = document.getElementById("respostas");
        respostas.innerHTML += `<p><b>IA:</b> Aprendi isso! 😄</p>`;
        document.getElementById("pergunta").value = "";
      }
    }
  }
});
