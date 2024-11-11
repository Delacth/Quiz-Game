const questions = [
    {
        question: "Qual é a capital da França?",
        answers: ["Paris", "Londres", "Berlim", "Madri"],
        correct: "Paris"
    },
    {
        question: "Quantos continentes existem no mundo?",
        answers: ["5", "6", "7", "8"],
        correct: "7"
    },
    {
        question: "Quem pintou a Mona Lisa?",
        answers: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
        correct: "Leonardo da Vinci"
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        answers: ["Marte", "Júpiter", "Terra", "Saturno"],
        correct: "Júpiter"
    },
    {
        question: "Em que país estão localizadas as Pirâmides de Gizé?",
        answers: ["Egito", "México", "Índia", "China"],
        correct: "Egito"
    },
    {
        question: "Qual é o animal mais rápido do mundo?",
        answers: ["Leopardo", "Águia", "Guepardo", "Falcão-peregrino"],
        correct: "Falcão-peregrino"
    },
    {
        question: "Quem escreveu 'Dom Quixote'?",
        answers: ["Miguel de Cervantes", "William Shakespeare", "Charles Dickens", "Victor Hugo"],
        correct: "Miguel de Cervantes"
    },
    {
        question: "Qual é o oceano que banha o litoral da Califórnia?",
        answers: ["Oceano Atlântico", "Oceano Pacífico", "Oceano Índico", "Oceano Ártico"],
        correct: "Oceano Pacífico"
    },
    {
        question: "Quantos elementos químicos a tabela periódica possui?",
        answers: ["100", "108", "118", "126"],
        correct: "118"
    },
    {
        question: "Em qual continente se localiza o Brasil?",
        answers: ["América do Norte", "Europa", "América do Sul", "Ásia"],
        correct: "América do Sul"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let startTime;

// Função para embaralhar uma array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Embaralhar perguntas antes do quiz começar
const shuffledQuestions = shuffle([...questions]);

function loadQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        displayResults();
        return;
    }

    const question = shuffledQuestions[currentQuestionIndex];
    document.getElementById("questionText").textContent = question.question;

    // Embaralha as respostas e as exibe
    const shuffledAnswers = shuffle([...question.answers]);
    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = ""; // Limpa as respostas anteriores

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(answer));
        answersContainer.appendChild(button);
    });

    startTime = new Date().getTime(); // Inicia o temporizador
    document.getElementById("nextQuestionBtn").classList.add("hidden");
}

function checkAnswer(selectedAnswer) {
    const question = shuffledQuestions[currentQuestionIndex];
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000;

    let points = 0;
    if (selectedAnswer === question.correct) {
        points = 5;
        if (timeTaken <= 5) {
            points += 10;
        } else if (timeTaken <= 10) {
            points += 5;
        }
    } else {
        // Mostra a resposta correta em verde e as erradas em vermelho
        document.querySelectorAll(".answer-btn").forEach(btn => {
            if (btn.textContent === question.correct) {
                btn.classList.add("correct");
            } else {
                btn.classList.add("incorrect");
            }
        });
    }

    score += points;
    document.getElementById("nextQuestionBtn").classList.remove("hidden");
}

function salvarPontuacao(modo) {
    const nomeJogador = prompt("Digite seu nome para salvar a pontuação:");

    if (!nomeJogador) {
        alert("Nome não pode estar vazio!");
        return;
    }

    const pontuacao = score; // Pontuação final do jogador
    let jogadores = JSON.parse(localStorage.getItem(modo)) || [];

    let jogador = jogadores.find(j => j.nome === nomeJogador);

    if (jogador) {
        // Pergunta se o jogador quer substituir a pontuação
        const resposta = confirm(`Olá ${nomeJogador}! Sua pontuação atual é ${jogador.PontuacaoNormal}. Deseja substituir sua pontuação com o novo recorde de ${score}?`);
        if (resposta) {
            jogador.PontuacaoNormal = pontuacao;
            alert("Sua pontuação foi atualizada com sucesso!");
        } else {
            alert("Sua pontuação não foi alterada.");
        }
    } else {
        // Se o jogador não existe, cria um novo registro
        jogador = { nome: nomeJogador, PontuacaoNormal: pontuacao };
        jogadores.push(jogador);
        alert("Sua pontuação foi salva com sucesso!");
    }

    // Salva os dados no localStorage
    localStorage.setItem(modo, JSON.stringify(jogadores));
}

// Função que será chamada ao terminar o quiz
function terminarQuiz() {
    // Exibe a pontuação final
    document.getElementById("scoreDisplay").innerText = score;
    
    // Exibe a seção de resultados e esconde as perguntas
    document.getElementById("resultSection").classList.remove("hidden");
    document.getElementById("quizSection").classList.add("hidden");
    salvarPontuacao('jogadoresClassico');
}

// Exibe os resultados do quiz
function displayResults() {
    document.querySelector(".quiz-main").classList.add("hidden");
    document.getElementById("resultSection").classList.remove("hidden");
    document.getElementById("finalScore").textContent = `Pontuação Final: ${score}`;
}

document.getElementById("nextQuestionBtn").addEventListener("click", () => {
    currentQuestionIndex++;
    loadQuestion();
});

document.addEventListener("DOMContentLoaded", loadQuestion);
