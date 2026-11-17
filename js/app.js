// ============================================================
// app.js - LÓGICA e INTERFACE do Sistema de Gerenciamento Acadêmico
// Atividade Prática - Aula 11 (Persistência com LocalStorage)
//
// Ordem de carregamento: dados.js -> storage.js -> app.js
//   - dados.js   : dados iniciais (alunosIniciais, cursosIniciais...)
//   - storage.js : STORAGE_KEYS, salvarDados(), carregarDados(), removerDados()
//   - app.js     : este arquivo, que usa os dois anteriores
//
// Este mesmo arquivo é carregado em TODAS as páginas. Como cada página
// tem elementos diferentes, as funções verificam se o elemento existe
// antes de usá-lo (querySelector() devolve null quando não encontra).
//
// REGRA DE PERSISTÊNCIA (exercício 71)
//   Cadastro -> salvar | Remoção -> salvar | Alteração -> salvar
//   Busca    -> NÃO salvar | Filtro -> NÃO salvar
//
// Blocos: Inicialização, Dashboard, Alunos, Cursos, Matrículas,
//         Usuários, Eventos.
// ============================================================


// ------------------------------------------------------------
// INICIALIZAÇÃO
// ------------------------------------------------------------

console.log("Aula 11 - Persistência iniciada.");

// (31) a (34) Os dados vêm do LocalStorage; se não houver nada salvo
// (ou se estiver corrompido), valem os dados iniciais do dados.js.
let alunos = carregarDados(STORAGE_KEYS.alunos, alunosIniciais);
let cursos = carregarDados(STORAGE_KEYS.cursos, cursosIniciais);
let matriculas = carregarDados(STORAGE_KEYS.matriculas, matriculasIniciais);
let usuarios = carregarDados(STORAGE_KEYS.usuarios, usuariosIniciais);

// Elementos usados em eventos. Em páginas que não os possuem, o valor é null.
const botaoAtualizar = document.querySelector("#btn-atualizar");
const btnRestaurar = document.querySelector("#btn-restaurar-alunos");
const formularioAluno = document.querySelector("#form-aluno");
const formularioCurso = document.querySelector("#form-curso");
const formularioMatricula = document.querySelector("#form-matricula");
const formularioUsuario = document.querySelector("#form-usuario");
const campoBusca = document.querySelector("#busca");
const filtroStatus = document.querySelector("#filtro-status");

// Guarda o id do aluno que está na área de detalhes (ou null)
let alunoEmDetalhe = null;

// Altera o texto de um elemento, se ele existir na página.
function definirTexto(seletor, valor) {
  const elemento = document.querySelector(seletor);

  if (elemento === null) {
    return;
  }

  elemento.textContent = valor;
}

// Cria um elemento com texto e, opcionalmente, uma classe CSS.
// textContent trata o texto como texto puro (seguro contra injeção de HTML).
function criarElementoComTexto(tag, texto, classe) {
  const elemento = document.createElement(tag);
  elemento.textContent = texto;

  if (classe) {
    elemento.classList.add(classe);
  }

  return elemento;
}

// Escolhe a classe CSS conforme o status
function classeDoStatus(status) {
  if (status === "ativo" || status === "ativa") {
    return "status-ativo";
  }
  return "status-inativo";
}

// (72) Novo ID seguro: maior id atual + 1 (e não length + 1, que poderia
// repetir um id depois de uma remoção). Por padrão usa a lista de alunos;
// cursos e usuários passam a própria lista.
function gerarNovoId(lista = alunos) {
  if (lista.length === 0) {
    return 1;
  }

  const ids = lista.map((item) => item.id);
  return Math.max(...ids) + 1;
}

// Mensagem de retorno do formulário (classes CSS, sem estilo inline)
function exibirMensagemFormulario(texto, tipo) {
  const area = document.querySelector("#mensagem-form");

  if (area === null) {
    return;
  }

  area.textContent = "";
  area.append(
    criarElementoComTexto("p", texto, tipo === "erro" ? "mensagem-erro" : "mensagem-sucesso")
  );
}

// (66) Desenha tudo o que a página atual possuir, a partir dos arrays.
function inicializarAplicacao() {
  renderizarAlunos(alunos);
  renderizarCursos(cursos);
  renderizarMatriculas(matriculas);
  renderizarUsuarios(usuarios);
  atualizarDashboard();
  preencherSelectAlunos();
}

// (64) Restaura os quatro conjuntos de dados iniciais (usado, por exemplo,
// depois do teste de localStorage.clear()). Pode ser chamada no console.
function restaurarTodosDados() {
  alunos = [...alunosIniciais];
  cursos = [...cursosIniciais];
  matriculas = [...matriculasIniciais];
  usuarios = [...usuariosIniciais];

  salvarDados(STORAGE_KEYS.alunos, alunos);
  salvarDados(STORAGE_KEYS.cursos, cursos);
  salvarDados(STORAGE_KEYS.matriculas, matriculas);
  salvarDados(STORAGE_KEYS.usuarios, usuarios);

  inicializarAplicacao();
}


// ------------------------------------------------------------
// DASHBOARD
// ------------------------------------------------------------

// (35) e (36) Os totais são CALCULADOS a partir dos arrays carregados do
// LocalStorage. Por isso não é preciso salvar "totalAlunos": um valor
// derivado ficaria duplicado e poderia ficar desatualizado.
function atualizarDashboard() {
  definirTexto("#total-alunos", alunos.length);
  definirTexto("#total-cursos", cursos.length);
  definirTexto("#total-matriculas", matriculas.length);
  definirTexto("#total-usuarios", usuarios.length);

  definirTexto("#ativos-alunos", alunos.filter((aluno) => aluno.status === "ativo").length);
  definirTexto("#ativos-cursos", cursos.filter((curso) => curso.ativo).length);
  definirTexto("#ativos-matriculas", matriculas.filter((m) => m.status === "ativa").length);
  definirTexto("#ativos-usuarios", usuarios.filter((u) => u.status === "ativo").length);
}


// ------------------------------------------------------------
// ALUNOS
// ------------------------------------------------------------

// Cria o card de um aluno com DOM e o devolve (só aparece após append()).
function criarCardAluno(aluno) {
  const cardAluno = document.createElement("article");
  cardAluno.classList.add("card");

  cardAluno.append(criarElementoComTexto("h3", aluno.nome));
  cardAluno.append(criarElementoComTexto("p", `Curso: ${aluno.curso}`));
  cardAluno.append(
    criarElementoComTexto("p", `Status: ${aluno.status}`, classeDoStatus(aluno.status))
  );

  // Botão "Ver detalhes"
  const botaoDetalhes = document.createElement("button");
  botaoDetalhes.type = "button";
  botaoDetalhes.textContent = "Ver detalhes";
  botaoDetalhes.addEventListener("click", () => {
    exibirDetalhesAluno(aluno);
  });

  // (42) a (45) Botão que alterna o status (ativo <-> inativo)
  const botaoStatus = document.createElement("button");
  botaoStatus.type = "button";
  botaoStatus.classList.add("botao-secundario");
  const novoStatus = aluno.status === "ativo" ? "inativo" : "ativo";
  botaoStatus.textContent = novoStatus === "inativo" ? "Inativar" : "Ativar";
  botaoStatus.addEventListener("click", () => {
    alterarStatusAluno(aluno.id, novoStatus);
  });

  // Botão "Remover"
  const botaoRemover = document.createElement("button");
  botaoRemover.type = "button";
  botaoRemover.classList.add("botao-secundario");
  botaoRemover.textContent = "Remover";
  botaoRemover.addEventListener("click", () => {
    removerAluno(aluno.id);
  });

  const acoes = document.createElement("div");
  acoes.classList.add("acoes");
  acoes.append(botaoDetalhes, botaoStatus, botaoRemover);
  cardAluno.append(acoes);

  return cardAluno;
}

// Renderizar uma lista de alunos
function renderizarAlunos(listaAlunos) {
  const listaAlunosElemento = document.querySelector("#lista-alunos");

  if (listaAlunosElemento === null) {
    return;
  }

  // Limpar ANTES de renderizar, senão os cards seriam duplicados.
  listaAlunosElemento.textContent = "";

  if (listaAlunos.length === 0) {
    listaAlunosElemento.append(
      criarElementoComTexto("p", "Nenhum aluno encontrado.", "mensagem-vazia")
    );
    return;
  }

  for (const aluno of listaAlunos) {
    listaAlunosElemento.append(criarCardAluno(aluno));
  }
}

// Atualizar a área de detalhes
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

// (69) e (70) Busca por nome + filtro por status, funcionando juntos.
// Só FILTRA o que aparece na tela: não altera o array nem o LocalStorage,
// por isso não chama salvarDados().
function aplicarFiltros() {
  const termo = campoBusca === null ? "" : campoBusca.value.toLowerCase().trim();
  const status = filtroStatus === null ? "" : filtroStatus.value;

  const filtrados = alunos.filter((aluno) => {
    const nomeConfere = aluno.nome.toLowerCase().includes(termo);
    const statusConfere = status === "" || aluno.status === status;
    return nomeConfere && statusConfere;
  });

  renderizarAlunos(filtrados);
}

// (40) Remover aluno e persistir a remoção
function removerAluno(id) {
  const indice = alunos.findIndex((aluno) => aluno.id === id);

  if (indice === -1) {
    return;
  }

  const [alunoRemovido] = alunos.splice(indice, 1);
  console.log(`Aluno removido: ${alunoRemovido.nome}`);

  // (40) sem isto, o aluno reapareceria após F5
  salvarDados(STORAGE_KEYS.alunos, alunos);

  if (alunoEmDetalhe === id) {
    limparDetalhesAluno();
  }

  aplicarFiltros();
  atualizarDashboard();
}

// (42) a (44) Alterar o status de um aluno e persistir
function alterarStatusAluno(id, novoStatus) {
  const aluno = alunos.find((item) => item.id === id);

  if (!aluno) {
    return;
  }

  aluno.status = novoStatus;
  salvarDados(STORAGE_KEYS.alunos, alunos);

  // (44) aplicarFiltros() redesenha a lista respeitando a busca e o filtro
  // em uso (renderizarAlunos(alunos) ignoraria o filtro).
  aplicarFiltros();
  atualizarDashboard();

  if (alunoEmDetalhe === id) {
    exibirDetalhesAluno(aluno);
  }
}

// (48) Restaurar os alunos iniciais e gravar de novo no LocalStorage.
// Também é usada para corrigir dados inválidos (exercício 55).
function restaurarAlunos() {
  alunos = [...alunosIniciais];
  salvarDados(STORAGE_KEYS.alunos, alunos);

  if (campoBusca !== null) {
    campoBusca.value = "";
  }
  if (filtroStatus !== null) {
    filtroStatus.value = "";
  }

  limparDetalhesAluno();
  renderizarAlunos(alunos);
  atualizarDashboard();
}

// (37), (38) e (84) Cadastro de aluno
// Fluxo: submit -> preventDefault -> objeto -> push -> salvarDados
//        -> LocalStorage -> renderizarAlunos -> dashboard
function cadastrarAluno(event) {
  event.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();
  const curso = document.querySelector("#curso").value;
  const status = document.querySelector("#status").value;

  if (nome === "" || email === "" || curso === "") {
    exibirMensagemFormulario("Preencha nome, e-mail e curso.", "erro");
    return;
  }

  const novoAluno = {
    id: gerarNovoId(alunos),
    nome,
    email,
    curso,
    status
  };

  alunos.push(novoAluno);

  // (37) sem esta linha o aluno sumiria após F5 (exercício 81)
  salvarDados(STORAGE_KEYS.alunos, alunos);

  // Limpa busca e filtro para o novo aluno aparecer na lista
  if (campoBusca !== null) {
    campoBusca.value = "";
  }
  if (filtroStatus !== null) {
    filtroStatus.value = "";
  }

  renderizarAlunos(alunos);
  atualizarDashboard();
  formularioAluno.reset();

  exibirMensagemFormulario(`Aluno ${nome} cadastrado com sucesso.`, "sucesso");
}


// ------------------------------------------------------------
// CURSOS
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

function renderizarCursos(listaCursos) {
  renderizarLista("#lista-cursos", listaCursos, (curso) => {
    const status = curso.ativo ? "ativo" : "inativo";
    return criarCard(curso.nome, [`Sigla: ${curso.sigla}`], status);
  }, "Nenhum curso encontrado.");
}

// (56) Cadastro de curso persistido
function cadastrarCurso(event) {
  event.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const sigla = document.querySelector("#codigo").value.trim().toUpperCase();
  const duracao = Number(document.querySelector("#duracao").value);
  const descricao = document.querySelector("#descricao").value.trim();

  if (nome === "" || sigla === "") {
    exibirMensagemFormulario("Preencha o nome e o código do curso.", "erro");
    return;
  }

  if (cursos.some((curso) => curso.sigla === sigla)) {
    exibirMensagemFormulario(`Já existe um curso com o código ${sigla}.`, "erro");
    return;
  }

  cursos.push({
    id: gerarNovoId(cursos),
    sigla,
    nome,
    ativo: true,
    duracao,
    descricao
  });

  salvarDados(STORAGE_KEYS.cursos, cursos);

  formularioCurso.reset();
  exibirMensagemFormulario(`Curso ${nome} cadastrado com sucesso.`, "sucesso");
}


// ------------------------------------------------------------
// MATRÍCULAS
// ------------------------------------------------------------

function renderizarMatriculas(listaMatriculas) {
  renderizarLista("#lista-matriculas", listaMatriculas, (matricula) => {
    return criarCard(
      `Matrícula ${matricula.numero}`,
      [`Aluno: ${matricula.aluno}`, `Curso: ${matricula.curso}`],
      matricula.status
    );
  }, "Nenhuma matrícula encontrada.");
}

// Preenche o select de alunos do formulário de matrícula com os alunos
// salvos (assim, alunos cadastrados por você também aparecem).
function preencherSelectAlunos() {
  const select = document.querySelector("#form-matricula #aluno");

  if (select === null) {
    return;
  }

  // mantém só a primeira opção ("Selecione") e recria as demais
  select.length = 1;

  for (const aluno of alunos) {
    const opcao = document.createElement("option");
    opcao.value = aluno.id;
    opcao.textContent = aluno.nome;
    select.append(opcao);
  }
}

// Gera o próximo número de matrícula: maior número atual + 1 (string)
function gerarNumeroMatricula() {
  const numeros = matriculas.map((matricula) => Number(matricula.numero));
  return String(Math.max(2026000, ...numeros) + 1);
}

// (57) Cadastro de matrícula persistido
function cadastrarMatricula(event) {
  event.preventDefault();

  const idAluno = Number(document.querySelector("#aluno").value);
  const curso = document.querySelector("#curso").value;
  const aluno = alunos.find((item) => item.id === idAluno);

  if (!aluno || curso === "") {
    exibirMensagemFormulario("Selecione o aluno e o curso.", "erro");
    return;
  }

  const numero = gerarNumeroMatricula();

  matriculas.push({
    numero,
    aluno: aluno.nome,
    curso,
    status: "ativa"
  });

  salvarDados(STORAGE_KEYS.matriculas, matriculas);

  formularioMatricula.reset();
  exibirMensagemFormulario(`Matrícula ${numero} cadastrada com sucesso.`, "sucesso");
}


// ------------------------------------------------------------
// USUÁRIOS
// ------------------------------------------------------------

function renderizarUsuarios(listaUsuarios) {
  renderizarLista("#lista-usuarios", listaUsuarios, (usuario) => {
    return criarCard(usuario.nome, [`Perfil: ${usuario.perfil}`], usuario.status);
  }, "Nenhum usuário encontrado.");
}

// (58), (59) e (60) Cadastro de usuário persistido.
// A senha é lida do formulário apenas para validar o preenchimento e NÃO
// entra no objeto: só id, nome, perfil e status vão para o LocalStorage.
// (O e-mail também não é guardado, pois não faz parte do modelo do usuário.)
function cadastrarUsuario(event) {
  event.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const perfil = document.querySelector("#perfil").value;
  const status = document.querySelector("input[name='situacao']:checked").value;

  if (nome === "" || perfil === "") {
    exibirMensagemFormulario("Preencha o nome e o perfil.", "erro");
    return;
  }

  usuarios.push({
    id: gerarNovoId(usuarios),
    nome,
    perfil,
    status
  });

  salvarDados(STORAGE_KEYS.usuarios, usuarios);

  formularioUsuario.reset();
  exibirMensagemFormulario(`Usuário ${nome} cadastrado com sucesso.`, "sucesso");
}


// ------------------------------------------------------------
// EVENTOS
// ------------------------------------------------------------

// Clique em "Atualizar lista": redesenha respeitando busca e filtro
function atualizarListaAlunos() {
  aplicarFiltros();
}

function aoDigitarBusca() {
  aplicarFiltros();
}

function aoMudarStatus() {
  aplicarFiltros();
}

function registrarEventos() {
  if (botaoAtualizar !== null) {
    botaoAtualizar.addEventListener("click", atualizarListaAlunos);
  }

  // (50) O botão só existe em alunos.html: o if evita erro nas outras páginas
  if (btnRestaurar !== null) {
    btnRestaurar.addEventListener("click", restaurarAlunos);
  }

  if (campoBusca !== null) {
    campoBusca.addEventListener("input", aoDigitarBusca);
  }

  if (filtroStatus !== null) {
    filtroStatus.addEventListener("change", aoMudarStatus);
  }

  if (formularioAluno !== null) {
    formularioAluno.addEventListener("submit", cadastrarAluno);
  }

  if (formularioCurso !== null) {
    formularioCurso.addEventListener("submit", cadastrarCurso);
  }

  if (formularioMatricula !== null) {
    formularioMatricula.addEventListener("submit", cadastrarMatricula);
  }

  if (formularioUsuario !== null) {
    formularioUsuario.addEventListener("submit", cadastrarUsuario);
  }
}

// (67) Execução ao carregar a página
registrarEventos();
inicializarAplicacao();
