// script.js
const botoes = document.querySelectorAll('.botao');
const secoes = document.querySelectorAll('.secao');

// Alternar seções ao clicar no botão
botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    botoes.forEach(b => b.classList.remove('ativo'));
    secoes.forEach(s => s.classList.remove('ativa'));

    botao.classList.add('ativo');
    const alvo = document.getElementById(botao.dataset.target);
    if (alvo) alvo.classList.add('ativa');
    
    // Volta o scroll pro topo quando mudar de seção
    const conteudo = document.querySelector('.conteudo');
    if (conteudo) conteudo.scrollTop = 0;
  });
});
