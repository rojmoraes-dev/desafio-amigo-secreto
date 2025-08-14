//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.

// Array para armazenar os participantes
let participantes = [];

// Função para adicionar um participante
function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (nome && !participantes.includes(nome)) {
        participantes.push(nome);
        atualizarListaParticipantes();
        input.value = ''; // Limpa o campo de input
    } else {
        alert("Nome inválido ou já existente!");
    }
}

// Função para atualizar a lista de participantes na interface
function atualizarListaParticipantes() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; // Limpa a lista atual

    participantes.forEach((participante, index) => {
        const li = document.createElement('li');
        li.textContent = participante;
        listaAmigos.appendChild(li);
    });
}

// Função para realizar o sorteio do amigo secreto
function sortearAmigo() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; // Limpa o resultado anterior

    if (participantes.length < 2) {
        alert("É necessário pelo menos 2 participantes para o sorteio!");
        return;
    }

    // Embaralha a lista de participantes
    let embaralhado = [...participantes];
    for (let i = embaralhado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [embaralhado[i], embaralhado[j]] = [embaralhado[j], embaralhado[i]];
    }

    // Garante que ninguém tire a si mesmo
    let valido = true;
    for (let i = 0; i < participantes.length; i++) {
        if (participantes[i] === embaralhado[i]) {
            valido = false;
            break;
        }
    }

    // Se o sorteio não for válido, tenta novamente
    if (!valido) {
        sortearAmigo();
        return;
    }

    // Exibe os resultados
    for (let i = 0; i < participantes.length; i++) {
        const li = document.createElement('li');
        li.textContent = `${participantes[i]} tirou ${embaralhado[i]}`;
        resultado.appendChild(li);
    }
}

// Adiciona evento para tecla Enter no input
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});