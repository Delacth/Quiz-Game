 // Funções para os botões de navegação
 function irModoClassico() {
    window.location.href = "modoClassico.html"; 
}

function irModoPunicao() {
    window.location.href = "modoPuncao.html"; 
}

function irClassificacao() {
    window.location.href = "classificacao.html"; 
}

function irAreaJogo() {
    window.location.href = "areaJogo.html"; 
}

function sairDoJogo() {
    // Encerrar o login, removendo o usuário do sessionStorage
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "telaLogin.html"; // Redireciona para a página de login
}