// Função para cadastrar um novo jogador
function cadastrarJogador(nome, senha) {
    let jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];

    if (jogadores.some(jogador => jogador.nome === nome)) {
        console.log("Erro: Nome já cadastrado!");
        return false;
    }

    const novoJogador = {
        nome: nome,
        senha: senha,
        PontuacaoNormal: 0,
        PontuacaoReducao: 0
    };

    jogadores.push(novoJogador);
    localStorage.setItem("jogadores", JSON.stringify(jogadores));
    console.log("Jogador cadastrado com sucesso!");
    return true;
}

// Função para marcar o usuário como logado no sessionStorage
function marcarComoLogado() {
    sessionStorage.setItem("usuarioLogado", "true");
}

// Função para encerrar o login
function encerrarLogin() {
    sessionStorage.removeItem("usuarioLogado");
}

// Função para autenticar o jogador
function autenticarJogador(nome, senha) {
    let jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];

    const jogador = jogadores.find(jogador => jogador.nome === nome && jogador.senha === senha);
    if (jogador) {
        marcarComoLogado();
        console.log("Login bem-sucedido!");
        return true;
    } else {
        console.log("Erro: Nome ou senha incorretos.");
        return false;
    }
}

// Manipulador para o formulário de cadastro
function esperarCadastro(event) {
    event.preventDefault();
    const nome = document.getElementById("nomeCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;

    if (cadastrarJogador(nome, senha)) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "telaLogin.html";
    } else {
        alert("Nome já cadastrado. Escolha outro.");
    }
}

// Manipulador para o formulário de login
function esperarLogin(event) {
    event.preventDefault();
    const nome = document.getElementById("nomeLogin").value;
    const senha = document.getElementById("senhaLogin").value;

    if (autenticarJogador(nome, senha)) {
        alert("Login bem-sucedido!");
        window.location.href = "areaJogo.html";
    } else {
        alert("Nome ou senha incorretos.");
    }
}

// Verifica o estado de login ao carregar a página de login
document.addEventListener("DOMContentLoaded", function() {
    // Verifica se a página é a tela de login e se o usuário estava logado
    const formLogin = document.getElementById("formLogin");

    // Se o usuário já estiver logado, encerra o login
    if (formLogin && sessionStorage.getItem("usuarioLogado")) {
        encerrarLogin();
        console.log("Login encerrado devido ao retorno à página de login.");
    }

    // Restante do código para inicializar os formulários
    const formCadastro = document.getElementById("formCadastro");

    if (formCadastro) {
        formCadastro.addEventListener("submit", esperarCadastro);
    }
    if (formLogin) {
        formLogin.addEventListener("submit", esperarLogin);
    }
});

// Força o recarregamento da página ao voltar
window.onpageshow = function(event) {
    if (event.persisted) {
        sessionStorage.removeItem("usuarioLogado");
        window.location.reload();
    }
};
// Função para encerrar a sessão
function encerrarSessao() {
    // Remove o status de login armazenado no sessionStorage ou localStorage
    sessionStorage.removeItem("usuarioLogado");
    
    // Redireciona para a tela de login após o logout
    window.location.href = "telaLogin.html";
}

// Associar a função ao botão "Sair"
document.getElementById("btnSair").addEventListener("click", encerrarSessao);
