// ============================================================
// app.js - LÓGICA e INTERFACE do Sistema de Gerenciamento Acadêmico
// Atividade Prática - Aula 10 (JavaScript + DOM + eventos)
//
// Os DADOS ficam no dados.js (alunos, cursosCadastrados, matriculas
// e usuarios), carregado antes deste arquivo. Aqui ficam as funções
// que leem esses dados e atualizam a página (DOM).
//
// Este mesmo arquivo é carregado em TODAS as páginas. Como cada página
// tem elementos diferentes, as funções verificam se o elemento existe
// antes de usá-lo: querySelector() devolve null quando não encontra
// (veja o diagnóstico do exercício 78 mais abaixo).
//
// Os números entre parênteses indicam o exercício do enunciado.
// O código da Aula 09 foi preservado em js/exercicios-aula09.js.
// ============================================================


// ------------------------------------------------------------
// CONFIGURAÇÃO INICIAL
// ------------------------------------------------------------

// (3) Confirmar o carregamento do JavaScript
console.log(
  "Aula 10 - DOM iniciado."
);

// Elementos usados em eventos. Em páginas que não os possuem, o valor é null.
// (38) botão de atualização, (43) formulário, (55) busca, (60) filtro
const botaoAtualizar = document.querySelector("#btn-atualizar");
const formularioAluno = document.querySelector("#form-aluno");
const campoBusca = document.querySelector("#busca");
const filtroStatus = document.querySelector("#filtro-status");

// Guarda o id do aluno que está na área de detalhes (ou null)
let alunoEmDetalhe = null;


// ------------------------------------------------------------
// FUNÇÕES AUXILIARES (reutilizadas em várias partes)
// ------------------------------------------------------------

// Altera o texto de um elemento, se ele existir na página.
// (a versão do enunciado, com .querySelector().textContent direto, gera
// erro nas páginas que não têm o elemento - ver exercício 78)
function definirTexto(seletor, valor) {
  const elemento = document.querySelector(seletor);

  if (elemento === null) {
    return;
  }

  elemento.textContent = valor;
}

// Cria um elemento com texto e, opcionalmente, uma classe CSS.
// (77) textContent + createElement: seguro para textos digitados pelo usuário.
function criarElementoComTexto(tag, texto, classe) {
  const elemento = document.createElement(tag);
  elemento.textContent = texto;

  if (classe) {
    elemento.classList.add(classe);
  }

  return elemento;
}

// (69) Escolhe a classe CSS conforme o status
function classeDoStatus(status) {
  if (status === "ativo" || status === "ativa") {
    return "status-ativo";
  }
  return "status-inativo";
}

// Gera o próximo id. O enunciado usa alunos.length + 1 (exercício 48),
// mas depois de remover um aluno isso poderia repetir um id existente.
// Por isso usamos o maior id atual + 1.
function gerarProximoId(lista) {
  const ids = lista.map((item) => item.id);
  return Math.max(0, ...ids) + 1;
}


// ------------------------------------------------------------
// FUNÇÕES DA AULA 09 (reaproveitadas com os mesmos arrays)
// ------------------------------------------------------------

function contarMatriculasAtivas(listaMatriculas) {
  const ativas = listaMatriculas.filter((matricula) => {
    return matricula.status === "ativa";
  });
  return ativas.length;
}

function filtrarAlunosPorStatus(listaAlunos, status) {
  return listaAlunos.filter((aluno) => aluno.status === status);
}

function buscarAlunoPorId(listaAlunos, id) {
  return listaAlunos.find((aluno) => aluno.id === id);
}

function obterNomesAlunos(listaAlunos) {
  return listaAlunos.map((aluno) => aluno.nome);
}

function buscarCursoPorSigla(listaCursos, sigla) {
  return listaCursos.find((curso) => curso.sigla === sigla);
}

function contarRegistros(lista) {
  return lista.length;
}


// ------------------------------------------------------------
// EXPLORAÇÃO DO DOM (exercícios 3 a 22)
// ------------------------------------------------------------

// Executada em todas as páginas
function explorarDocumento() {
  // (4) document representa a página carregada: a raiz da árvore DOM,
  // por onde o JavaScript acessa e modifica todos os elementos.
  console.log(document);

  // (5) Selecionar o título principal pelo id
  const titulo = document.querySelector("#titulo-sistema");
  console.log(titulo);

  // (6) Alterar o título
  if (titulo !== null) {
    titulo.textContent = "Sistema Acadêmico - 2026";
  }

  // (14) Consultar um atributo e (15) adicionar um title
  const linkAlunos = document.querySelector("#link-alunos");

  if (linkAlunos !== null) {
    console.log(linkAlunos.getAttribute("href"));
    linkAlunos.setAttribute("title", "Acessar cadastro de alunos");
  }
}

// Executada apenas no index.html (onde existe o Dashboard)
function explorarCardsDoDashboard() {
  // (7) querySelector() devolve APENAS o primeiro elemento encontrado
  const card = document.querySelector(".card");
  console.log(card);

  // (8) querySelectorAll() devolve TODOS (uma NodeList)
  const cards = document.querySelectorAll(".card");
  console.log(cards);

  // (9) Percorrer os cards
  cards.forEach((cardAtual) => {
    console.log(cardAtual);
  });

  // (17) a (20) classList: add, remove, toggle e contains
  const primeiroCard = document.querySelector(".card");

  primeiroCard.classList.add("destaque");
  console.log("Após add:", primeiroCard.classList.contains("destaque"));       // true

  primeiroCard.classList.remove("destaque");
  console.log("Após remove:", primeiroCard.classList.contains("destaque"));    // false

  primeiroCard.classList.toggle("destaque"); // liga de novo
  const resultado = primeiroCard.classList.contains("destaque");
  console.log("Após toggle:", resultado);                                      // true
  // O card fica em destaque; cada toggle() inverte o estado atual.

  // (21) Criar elemento com createElement() e (22) adicioná-lo com append()
  const paragrafo = document.createElement("p");
  paragrafo.textContent = "Novo conteúdo criado via JavaScript.";

  const main = document.querySelector("main");
  main.append(paragrafo);
}


// ------------------------------------------------------------
// DASHBOARD
// ------------------------------------------------------------

// (10) a (12) Totais, lidos dos arrays da Aula 09.
// Os 4 spans (#total-...) existem no index.html; em outras páginas
// apenas os que existirem são atualizados.
function atualizarDashboard() {
  definirTexto("#total-alunos", alunos.length);
  definirTexto("#total-cursos", cursosCadastrados.length);
  definirTexto("#total-matriculas", matriculas.length);
  definirTexto("#total-usuarios", usuarios.length);

  atualizarDashboardAtivos();
}

// (13) Segunda versão: apenas registros ATIVOS (usa filter())
function atualizarDashboardAtivos() {
  const alunosAtivos = filtrarAlunosPorStatus(alunos, "ativo");
  const cursosAtivos = cursosCadastrados.filter((curso) => curso.ativo);
  const matriculasAtivas = matriculas.filter((matricula) => matricula.status === "ativa");
  const usuariosAtivos = usuarios.filter((usuario) => usuario.status === "ativo");

  definirTexto("#ativos-alunos", alunosAtivos.length);
  definirTexto("#ativos-cursos", cursosAtivos.length);
  definirTexto("#ativos-matriculas", matriculasAtivas.length);
  definirTexto("#ativos-usuarios", usuariosAtivos.length);
}


// ------------------------------------------------------------
// ALUNOS
// ------------------------------------------------------------

// (24) a (30) Criar o card de um aluno com DOM e devolvê-lo.
// Criar o elemento NÃO o coloca na página: ele só aparece depois
// de ser adicionado ao DOM com append() (ver renderizarAlunos).
function criarCardAluno(aluno) {
  const cardAluno = document.createElement("article");
  cardAluno.classList.add("card");

  // (25) nome
  const nome = document.createElement("h3");
  nome.textContent = aluno.nome;

  // (26) curso
  const curso = document.createElement("p");
  curso.textContent = `Curso: ${aluno.curso}`;

  // (30) status, com a classe CSS adequada (69)
  const status = document.createElement("p");
  status.textContent = `Status: ${aluno.status}`;
  status.classList.add(classeDoStatus(aluno.status));

  // (27) montar o card
  cardAluno.append(nome);
  cardAluno.append(curso);
  cardAluno.append(status);

  // (65) e (66) botão "Ver detalhes"
  const botaoDetalhes = document.createElement("button");
  botaoDetalhes.type = "button";
  botaoDetalhes.textContent = "Ver detalhes";
  botaoDetalhes.addEventListener("click", () => {
    console.log(aluno.nome);
    exibirDetalhesAluno(aluno);
  });

  // (70) a (72) botão "Remover"
  const botaoRemover = document.createElement("button");
  botaoRemover.type = "button";
  botaoRemover.classList.add("botao-secundario");
  botaoRemover.textContent = "Remover";
  botaoRemover.addEventListener("click", () => {
    removerAluno(aluno.id);
  });

  const acoes = document.createElement("div");
  acoes.classList.add("acoes");
  acoes.append(botaoDetalhes, botaoRemover);
  cardAluno.append(acoes);

  return cardAluno;
}

// (31) a (33) Renderizar uma lista de alunos
function renderizarAlunos(listaAlunos) {
  const listaAlunosElemento = document.querySelector("#lista-alunos");

  if (listaAlunosElemento === null) {
    return;
  }

  // (32) Limpar ANTES de renderizar. Sem isso, cada chamada acrescentaria
  // os cards de novo, duplicando os registros na tela (exercício 79).
  // Também remove a mensagem de "nenhum resultado" de uma busca anterior (64).
  listaAlunosElemento.textContent = "";

  // (63) Nenhum resultado: mensagem criada com DOM
  if (listaAlunos.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.classList.add("mensagem-vazia");
    mensagem.textContent = "Nenhum aluno encontrado.";
    listaAlunosElemento.append(mensagem);
    return;
  }

  for (const aluno of listaAlunos) {
    listaAlunosElemento.append(criarCardAluno(aluno));
  }
}

// (68) Atualizar a área de detalhes (textContent nos 3 parágrafos)
function exibirDetalhesAluno(aluno) {
  const detalheNome = document.querySelector("#detalhe-nome");
  const detalheCurso = document.querySelector("#detalhe-curso");
  const detalheStatus = document.querySelector("#detalhe-status");

  if (detalheNome === null) {
    return;
  }

  detalheNome.textContent = `Nome: ${aluno.nome}`;
  detalheCurso.textContent = `Curso: ${aluno.curso}`;
  detalheStatus.textContent = `Status: ${aluno.status}`;

  // (69) trocar a classe de status
  detalheStatus.classList.remove("status-ativo", "status-inativo");
  detalheStatus.classList.add(classeDoStatus(aluno.status));

  alunoEmDetalhe = aluno.id;
}

function limparDetalhesAluno() {
  definirTexto("#detalhe-nome", "Clique em \"Ver detalhes\" em um dos alunos.");
  definirTexto("#detalhe-curso", "");
  definirTexto("#detalhe-status", "");
  alunoEmDetalhe = null;
}

// (57) a (62) Busca por nome + filtro por status, funcionando juntos
function aplicarFiltros() {
  const termo = campoBusca === null ? "" : campoBusca.value.toLowerCase().trim();
  const status = filtroStatus === null ? "" : filtroStatus.value;

  const filtrados = alunos.filter((aluno) => {
    const nomeConfere = aluno.nome.toLowerCase().includes(termo);
    // (61) status vazio ("Todos") não filtra nada
    const statusConfere = status === "" || aluno.status === status;
    return nomeConfere && statusConfere;
  });

  // (58) renderizar o resultado
  renderizarAlunos(filtrados);
}

// (39) a (41) Função separada para o evento click do botão.
// event é o objeto do evento; event.target é o elemento em que o evento
// ocorreu (aqui, o próprio botão "Atualizar lista").
// Nos exercícios 38/39 a função chamava renderizarAlunos(alunos); agora
// chama aplicarFiltros() para respeitar a busca e o filtro em uso (62).
function atualizarListaAlunos(event) {
  console.log(event);
  console.log("event.target:", event.target);
  aplicarFiltros();
}

// (56) evento input: dispara a cada letra digitada
function aoDigitarBusca() {
  console.log("Busca:", campoBusca.value);
  aplicarFiltros();
}

// (60) evento change: dispara quando o usuário escolhe outra opção
function aoMudarStatus() {
  console.log("Status selecionado:", filtroStatus.value);
  aplicarFiltros();
}

// (70) a (72) Remover aluno
// Etapa do exercício 70: cardAluno.remove() retira apenas o ELEMENTO da
// página. (71) Nesse caso, console.log(alunos) mostraria que o aluno
// continua no array - o DOM e os dados são coisas separadas.
// Etapa final (72): remover do ARRAY e renderizar novamente.
function removerAluno(id) {
  const indice = alunos.findIndex((aluno) => aluno.id === id);

  if (indice === -1) {
    return;
  }

  const [alunoRemovido] = alunos.splice(indice, 1);
  console.log(`Aluno removido: ${alunoRemovido.nome}`);
  console.log(alunos);

  if (alunoEmDetalhe === id) {
    limparDetalhesAluno();
  }

  aplicarFiltros();
  atualizarDashboard(); // (74)
}

// (53) Mensagem de retorno do formulário (classes CSS, sem estilo inline - 76)
function exibirMensagemFormulario(texto, tipo) {
  const area = document.querySelector("#mensagem-form");

  if (area === null) {
    return;
  }

  area.textContent = "";

  const mensagem = document.createElement("p");
  mensagem.textContent = texto;
  mensagem.classList.add(tipo === "erro" ? "mensagem-erro" : "mensagem-sucesso");
  area.append(mensagem);
}

// (44) a (53) Cadastro de aluno
// Fluxo: submit -> preventDefault -> captura -> objeto -> push
//        -> renderizarAlunos -> atualizarDashboard
function cadastrarAluno(event) {
  // (45) Sem preventDefault(), o navegador enviaria o formulário e
  // recarregaria a página, apagando os dados que estão só na memória.
  event.preventDefault();
  console.log("Formulário enviado.");

  // (46) e (47) Capturar os campos
  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();
  const curso = document.querySelector("#curso").value;
  const status = document.querySelector("#status").value;
  console.log("Nome digitado:", nome);

  if (nome === "" || email === "" || curso === "") {
    exibirMensagemFormulario("Preencha nome, e-mail e curso.", "erro");
    return;
  }

  // (48) e (49) Objeto novoAluno (forma reduzida: nome, email, curso, status)
  const novoAluno = {
    id: gerarProximoId(alunos),
    nome,
    email,
    curso,
    status
  };

  // (50) Adicionar ao array
  alunos.push(novoAluno);
  console.log(alunos);

  // Limpa busca e filtro para o novo aluno aparecer na lista
  if (campoBusca !== null) {
    campoBusca.value = "";
  }
  if (filtroStatus !== null) {
    filtroStatus.value = "";
  }

  // (51) Atualizar a lista após o cadastro
  renderizarAlunos(alunos);

  // (73) Atualizar o Dashboard
  atualizarDashboard();

  // (52) Limpar o formulário
  formularioAluno.reset();

  exibirMensagemFormulario(`Aluno ${nome} cadastrado com sucesso.`, "sucesso");
}


// ------------------------------------------------------------
// CURSOS, MATRÍCULAS E USUÁRIOS
// ------------------------------------------------------------

// Cria um card genérico: título + linhas de texto + status
function criarCard(titulo, linhas, status) {
  const card = document.createElement("article");
  card.classList.add("card");

  card.append(criarElementoComTexto("h3", titulo));

  for (const linha of linhas) {
    card.append(criarElementoComTexto("p", linha));
  }

  card.append(criarElementoComTexto("p", `Status: ${status}`, classeDoStatus(status)));

  return card;
}

// Limpa o conteiner, mostra mensagem se a lista estiver vazia
// e, caso contrário, adiciona um card para cada item.
function renderizarLista(seletor, lista, criarCardDoItem, mensagemVazia) {
  const conteiner = document.querySelector(seletor);

  if (conteiner === null) {
    return;
  }

  conteiner.textContent = "";

  if (lista.length === 0) {
    conteiner.append(criarElementoComTexto("p", mensagemVazia, "mensagem-vazia"));
    return;
  }

  lista.forEach((item) => {
    conteiner.append(criarCardDoItem(item));
  });
}

// (34) Cursos
function renderizarCursos(listaCursos) {
  renderizarLista("#lista-cursos", listaCursos, (curso) => {
    const status = curso.ativo ? "ativo" : "inativo";
    return criarCard(curso.nome, [`Sigla: ${curso.sigla}`], status);
  }, "Nenhum curso encontrado.");
}

// (35) Matrículas: número, aluno, curso e status
function renderizarMatriculas(listaMatriculas) {
  renderizarLista("#lista-matriculas", listaMatriculas, (matricula) => {
    return criarCard(
      `Matrícula ${matricula.numero}`,
      [`Aluno: ${matricula.aluno}`, `Curso: ${matricula.curso}`],
      matricula.status
    );
  }, "Nenhuma matrícula encontrada.");
}

// (36) Usuários: nome, perfil e status
function renderizarUsuarios(listaUsuarios) {
  renderizarLista("#lista-usuarios", listaUsuarios, (usuario) => {
    return criarCard(usuario.nome, [`Perfil: ${usuario.perfil}`], usuario.status);
  }, "Nenhum usuário encontrado.");
}


// ------------------------------------------------------------
// DIAGNÓSTICOS (exercícios 78 a 82) - executado apenas no index.html
// ------------------------------------------------------------

function executarDiagnosticos() {
  // (78) querySelector() com um id inexistente devolve null.
  // Usar null.textContent causa: TypeError (Cannot set properties of null).
  // Verificar: console.log(elemento) e testar if (elemento !== null).
  const tituloInexistente = document.querySelector("#titulo-inexistente");
  console.log("Diagnóstico 78:", tituloInexistente);

  try {
    tituloInexistente.textContent = "Novo título";
  } catch (erro) {
    console.log("Erro capturado:", erro.message);
  }

  // (79) Sem limpar antes de renderizar, chamar renderizarAlunos(alunos)
  // duas vezes mostraria cada aluno DUAS vezes na tela.
  // (80) Sem preventDefault(), o submit recarrega a página.
  // (81) "clic" não é um evento válido (o correto é "click"): nenhum erro
  // aparece, mas a função nunca é executada.

  // (82) querySelector(".card") devolve 1 elemento; para obter todos,
  // usa-se querySelectorAll(".card").
  console.log("Diagnóstico 82 - querySelector:", document.querySelector(".card"));
  console.log("Diagnóstico 82 - querySelectorAll:", document.querySelectorAll(".card").length, "cards");
}


// ------------------------------------------------------------
// INICIALIZAÇÃO
// ------------------------------------------------------------

function registrarEventos() {
  // (38) e (39) clique no botão
  if (botaoAtualizar !== null) {
    botaoAtualizar.addEventListener("click", atualizarListaAlunos);
  }

  // (56) busca
  if (campoBusca !== null) {
    campoBusca.addEventListener("input", aoDigitarBusca);
  }

  // (60) filtro de status
  if (filtroStatus !== null) {
    filtroStatus.addEventListener("change", aoMudarStatus);
  }

  // (53) cadastro de aluno
  if (formularioAluno !== null) {
    formularioAluno.addEventListener("submit", cadastrarAluno);
  }
}

explorarDocumento();

if (document.querySelector("#dashboard") !== null) {
  explorarCardsDoDashboard();
  executarDiagnosticos();
}

atualizarDashboard();
renderizarAlunos(alunos);
renderizarCursos(cursosCadastrados);
renderizarMatriculas(matriculas);
renderizarUsuarios(usuarios);
registrarEventos();
