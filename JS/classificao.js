// Função para carregar as classificações dos modos
function carregarClassificacao() {
    // Carregar os dados de classificação de cada modo
    const jogadoresClassico = JSON.parse(localStorage.getItem("jogadoresClassico")) || [];
    const jogadoresPunicao = JSON.parse(localStorage.getItem("jogadoresPunicao")) || [];

    // Ordena os jogadores pela pontuação, do maior para o menor
    jogadoresClassico.sort((a, b) => b.PontuacaoNormal - a.PontuacaoNormal);
    jogadoresPunicao.sort((a, b) => b.PontuacaoNormal - a.PontuacaoNormal);

    // Preencher a tabela do modo clássico
    const tabelaClassico = document.getElementById("classificacaoClassico");
    tabelaClassico.innerHTML = ''; // Limpa a tabela
    jogadoresClassico.forEach((jogador, index) => {
        const row = tabelaClassico.insertRow();
        row.insertCell(0).textContent = index + 1; // Posição
        row.insertCell(1).textContent = jogador.nome; // Nome
        row.insertCell(2).textContent = jogador.PontuacaoNormal; // Pontuação
    });

    // Preencher a tabela do modo punição
    const tabelaPunicao = document.getElementById("classificacaoPunicao");
    tabelaPunicao.innerHTML = ''; // Limpa a tabela
    jogadoresPunicao.forEach((jogador, index) => {
        const row = tabelaPunicao.insertRow();
        row.insertCell(0).textContent = index + 1; // Posição
        row.insertCell(1).textContent = jogador.nome; // Nome
        row.insertCell(2).textContent = jogador.PontuacaoNormal; // Pontuação
    });
}

// Carregar as classificações quando a página for carregada
document.addEventListener("DOMContentLoaded", carregarClassificacao);