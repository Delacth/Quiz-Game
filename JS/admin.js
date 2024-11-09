document.addEventListener("DOMContentLoaded", function() {
    const formLoginAdmin = document.getElementById("formLoginAdmin");

    formLoginAdmin.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nome = document.getElementById("nomeAdmin").value;
        const senha = document.getElementById("senhaAdmin").value;

        // Verifica se o nome e senha são do administrador
        if (nome === "admin" && senha === "senha") { // Substitua "senhaAdmin123" pela senha correta
            alert("Login de administrador bem-sucedido!");
            window.location.href = "adm.html"; // Redireciona para a área de administração
        } else {
            alert("Nome ou senha incorretos.");
            console.log("Nome ou senha incorretos.")
        }
    });
});
