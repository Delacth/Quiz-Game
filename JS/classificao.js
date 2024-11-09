// Função para preencher a tabela de classificação
function preencherClassificacao() {
    
    
    // Obtendo os jogadores dos modos Clássico e Punição do localStorage
    const jogadoresClassico = JSON.parse(localStorage.getItem("jogadoresClassico")) || [];
    const jogadoresPunicao = JSON.parse(localStorage.getItem("jogadoresPunicao")) || [];

    // Função para ordenar jogadores pela pontuação de forma decrescente
    function ordenarPorPontuacao(jogadores) {
        return jogadores.sort((a, b) => b.pontuacao - a.pontuacao);
    }

    // Preenchendo a tabela de Modo Clássico
    const tbodyClassico = document.getElementById("classificacaoClassico");
    const jogadoresClassicoOrdenados = ordenarPorPontuacao(jogadoresClassico);

    jogadoresClassicoOrdenados.forEach((jogador, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${jogador.nome}</td>
            <td>${jogador.pontuacao}</td>
        `;
        tbodyClassico.appendChild(row);
    });

    // Preenchendo a tabela de Modo Punição
    const tbodyPunicao = document.getElementById("classificacaoPunicao");
    const jogadoresPunicaoOrdenados = ordenarPorPontuacao(jogadoresPunicao);

    jogadoresPunicaoOrdenados.forEach((jogador, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${jogador.nome}</td>
            <td>${jogador.pontuacao}</td>
        `;
        tbodyPunicao.appendChild(row);
    });
}

// Chama a função de preenchimento quando a página for carregada
document.addEventListener("DOMContentLoaded", preencherClassificacao);
