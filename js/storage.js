// ============================================================
// storage.js - PERSISTÊNCIA LOCAL (LocalStorage + JSON)
// Atividade Prática - Aula 11
//
// Este módulo é a única parte do sistema que conversa diretamente
// com o localStorage. O app.js apenas chama estas funções.
// Ordem de carregamento: dados.js -> storage.js -> app.js
// ============================================================

// (3) Confirmar o carregamento do módulo
console.log("Módulo de armazenamento carregado.");


// ------------------------------------------------------------
// CHAVES
// ------------------------------------------------------------

// (23) e (24) O prefixo "academico_" evita conflito com outras chaves
// que outros sistemas (ou testes) gravem na mesma origem (mesmo
// endereço). Usar constantes também evita erros de digitação (ex. 80).
const STORAGE_KEYS = {
  alunos: "academico_alunos",
  cursos: "academico_cursos",
  matriculas: "academico_matriculas",
  usuarios: "academico_usuarios"
};


// ------------------------------------------------------------
// SALVAR
// ------------------------------------------------------------

// (25) Serialização: array/objeto -> JSON.stringify() -> string -> setItem()
// O try...catch evita que um erro (ex.: armazenamento cheio ou bloqueado
// pelo navegador) quebre o restante da aplicação.
function salvarDados(chave, dados) {
  try {
    localStorage.setItem(chave, JSON.stringify(dados));
  } catch (erro) {
    console.error("Erro ao salvar dados.", erro);
  }
}


// ------------------------------------------------------------
// CARREGAR
// ------------------------------------------------------------

// (27) e (52) Desserialização: getItem() -> string -> JSON.parse() -> array
// - chave inexistente: getItem() devolve null -> devolve o valorPadrao
// - JSON inválido: JSON.parse() lançaria erro -> try...catch -> valorPadrao
// - dado válido, mas que não é lista: também devolve o valorPadrao
function carregarDados(chave, valorPadrao) {
  const dados = localStorage.getItem(chave);

  if (!dados) {
    return valorPadrao;
  }

  try {
    const convertidos = JSON.parse(dados);

    if (!Array.isArray(convertidos)) {
      console.error("Dados salvos em formato inesperado:", chave);
      return valorPadrao;
    }

    return convertidos;
  } catch (erro) {
    console.error("Erro ao carregar dados.", erro);
    return valorPadrao;
  }
}


// ------------------------------------------------------------
// REMOVER
// ------------------------------------------------------------

// (46) Remove apenas UMA chave (mais seguro do que localStorage.clear(),
// que apagaria também as chaves de outros sistemas da mesma origem).
function removerDados(chave) {
  localStorage.removeItem(chave);
}
