// ============================================================
// exercicios-aula09.js - EXERCÍCIOS DA AULA 09 (preservados)
// Este arquivo NÃO é carregado pelas páginas da Aula 10, para não
// poluir o console. Para revê-lo, troque js/app.js por este arquivo
// no <script> do index.html.
//
// Atividade Prática - Aula 09 (JavaScript ES6+)
//
// Responsabilidade deste arquivo: a LÓGICA (variáveis, condições,
// laços, funções e operações sobre arrays e objetos).
// Os DADOS (alunos, cursosCadastrados, matriculas e usuarios)
// ficam no dados.js, que é carregado antes deste arquivo.
//
// Os resultados são observados no Console do navegador (F12).
// Cada exercício está dentro de um bloco { } para que as variáveis
// de teste (nome, aluno, cursos...) não entrem em conflito entre si.
// Os números entre parênteses indicam o exercício do enunciado.
// ============================================================


// ------------------------------------------------------------
// CONFIGURAÇÃO INICIAL
// ------------------------------------------------------------

// Função auxiliar apenas para separar as saídas no console
function secao(texto) {
  console.log(`\n--- ${texto} ---`);
}

// (4) Testar o carregamento
console.log("Sistema Acadêmico iniciado.");

// (5) Constantes básicas
secao("Exercício 5 - Constantes");
const nomeSistema = "Sistema de Gerenciamento Acadêmico";
const anoLetivo = 2026;
console.log(nomeSistema);
console.log(anoLetivo);

// (6) Variável com let
secao("Exercício 6 - let");
let quantidadeAlunos = 245;
console.log("Antes:", quantidadeAlunos);
quantidadeAlunos = 246;
console.log("Depois:", quantidadeAlunos);

// (7) Tipos de dados
secao("Exercício 7 - Tipos de dados");
{
  const texto = "Ana Souza";
  const numero = 245;
  const booleano = true;
  const nulo = null;
  let indefinido;

  console.log("string:", typeof texto);
  console.log("number:", typeof numero);
  console.log("boolean:", typeof booleano);
  console.log("null:", typeof nulo); // "object" é uma particularidade histórica do JavaScript
  console.log("undefined:", typeof indefinido);
}

// (8) Operadores e (9) Regra de aprovação
secao("Exercícios 8 e 9 - Média e aprovação");
{
  const nota1 = 8;
  const nota2 = 7;
  const media = (nota1 + nota2) / 2;
  console.log("Média:", media);

  if (media >= 7) {
    console.log("Aprovado");
  } else if (media >= 5) {
    console.log("Recuperação");
  } else {
    console.log("Reprovado");
  }
}

// Testes adicionais da regra de aprovação (cobre os três caminhos)
function classificarMedia(media) {
  if (media >= 7) {
    return "Aprovado";
  } else if (media >= 5) {
    return "Recuperação";
  } else {
    return "Reprovado";
  }
}
console.log("Média 7.5 ->", classificarMedia(7.5));
console.log("Média 6 ->", classificarMedia(6));
console.log("Média 3.5 ->", classificarMedia(3.5));

// (10) Regra de aluno ativo
secao("Exercício 10 - Aluno ativo");
{
  const statusAluno = "ativo";

  if (statusAluno === "ativo") {
    console.log("Aluno ativo.");
  } else {
    console.log("Aluno inativo.");
  }
}

// (11) Operadores lógicos
secao("Exercício 11 - Operadores lógicos");
{
  const alunoAtivo = true;
  const possuiMatricula = true;

  if (alunoAtivo && possuiMatricula) {
    console.log("O aluno pode acessar a área acadêmica.");
  } else {
    console.log("O aluno NÃO pode acessar a área acadêmica.");
  }
}

// (12) switch
secao("Exercício 12 - switch");
{
  const statusMatricula = "trancada";

  switch (statusMatricula) {
    case "ativa":
      console.log("Matrícula ativa: o aluno pode frequentar as aulas.");
      break;
    case "trancada":
      console.log("Matrícula trancada: o aluno está temporariamente afastado.");
      break;
    case "cancelada":
      console.log("Matrícula cancelada: o vínculo foi encerrado.");
      break;
    case "concluida":
      console.log("Matrícula concluída: o curso foi finalizado.");
      break;
    default:
      console.log("Status de matrícula desconhecido.");
  }
}

// (13) Laço for
secao("Exercício 13 - for (1 a 10)");
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// (14) Laço while
secao("Exercício 14 - while (1 a 5)");
{
  let contador = 1;
  while (contador <= 5) {
    console.log(contador);
    contador++;
  }
}

// (15) Função simples
function exibirNomeSistema() {
  console.log("Sistema de Gerenciamento Acadêmico");
}
secao("Exercício 15 - Função simples");
exibirNomeSistema();

// (16) Função com parâmetro
function exibirAluno(nome) {
  console.log(nome);
}
secao("Exercício 16 - Função com parâmetro");
exibirAluno("Ana Souza");
exibirAluno("Carlos Silva");
exibirAluno("Mariany Santos");

// (17) Função com retorno
function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}
secao("Exercício 17 - Função com retorno");
console.log(calcularMedia(8, 7));
console.log(calcularMedia(10, 10));
console.log(calcularMedia(4, 5));

// (18) Arrow function
secao("Exercício 18 - Arrow function");
{
  const calcularMedia = (nota1, nota2) => {
    return (nota1 + nota2) / 2;
  };
  console.log(calcularMedia(8, 7));
  console.log(calcularMedia(6, 9));
}

// (19) Versão compacta
// Comparação: a versão explícita usa chaves e "return" (mostra cada passo);
// a compacta omite chaves e "return" e devolve o valor da expressão.
// O resultado é o mesmo.
secao("Exercício 19 - Arrow function compacta");
{
  const calcularMedia =
    (nota1, nota2) => (nota1 + nota2) / 2;
  console.log(calcularMedia(8, 7));
  console.log(calcularMedia(6, 9));
}


// ------------------------------------------------------------
// OPERAÇÕES COM ALUNOS
// ------------------------------------------------------------

// (27) a (29), (44), (45) e (48) - Objeto aluno
secao("Exercícios 27 a 29 - Objeto aluno");
{
  // (27) Criar objeto
  const aluno = {
    id: 1,
    nome: "Ana Souza",
    email: "ana@email.com",
    curso: "ADS",
    status: "ativo"
  };

  // (28) Acessar propriedades
  console.log(aluno.nome);
  console.log(aluno.email);
  console.log(aluno.curso);
  console.log(aluno.status);

  // (29) Alterar status
  // const impede reatribuir a variável "aluno", mas permite alterar
  // as propriedades do objeto.
  aluno.status = "trancado";
  console.log(aluno);

  // (44) Template literal com objeto
  secao("Exercício 44 - Template literal com objeto");
  console.log(
    `Aluno: ${aluno.nome} - Status: ${aluno.status}`
  );

  // (45) Desestruturação de objeto
  secao("Exercício 45 - Desestruturação de objeto");
  const {
    nome,
    curso,
    status
  } = aluno;
  console.log(nome);
  console.log(curso);
  console.log(status);

  // (48) Spread em objeto: cria uma cópia alterando só o status
  secao("Exercício 48 - Spread em objeto");
  const alunoAtualizado = {
    ...aluno,
    status: "concluido"
  };
  console.log("aluno:", aluno);
  console.log("alunoAtualizado:", alunoAtualizado);
}

// (43) Template literals
secao("Exercício 43 - Template literal");
{
  const nome = "Ana Souza";
  const curso = "ADS";
  console.log(`Aluno: ${nome} - Curso: ${curso}`);
}

// (31) Percorrer os alunos
secao("Exercício 31 - Percorrer alunos");
for (const aluno of alunos) {
  console.log(aluno.nome);
}

// (32) Exibir apenas alunos ativos (for...of + if)
secao("Exercício 32 - Alunos ativos (for...of + if)");
for (const aluno of alunos) {
  if (aluno.status === "ativo") {
    console.log(aluno.nome);
  }
}

// (33) filter()
secao("Exercício 33 - filter()");
{
  const alunosAtivos = alunos.filter((aluno) => {
    return aluno.status === "ativo";
  });
  console.log(alunosAtivos);
}

// (34) map()
secao("Exercício 34 - map()");
{
  const nomesAlunos = alunos.map((aluno) => {
    return aluno.nome;
  });
  console.log(nomesAlunos);
}

// (35) find()
secao("Exercício 35 - find()");
{
  const carlos = alunos.find((aluno) => {
    return aluno.nome === "Carlos Silva";
  });
  console.log(carlos);
}

// (53) Buscar aluno por ID
function buscarAlunoPorId(listaAlunos, id) {
  return listaAlunos.find((aluno) => aluno.id === id);
}

// (54) Filtrar alunos por status
function filtrarAlunosPorStatus(listaAlunos, status) {
  return listaAlunos.filter((aluno) => aluno.status === status);
}

// (55) Listar nomes dos alunos
function obterNomesAlunos(listaAlunos) {
  return listaAlunos.map((aluno) => aluno.nome);
}

secao("Exercícios 53 a 55 - Funções de alunos");
console.log("buscarAlunoPorId(alunos, 2):", buscarAlunoPorId(alunos, 2));
console.log("buscarAlunoPorId(alunos, 99):", buscarAlunoPorId(alunos, 99));
console.log("filtrarAlunosPorStatus(alunos, \"ativo\"):", filtrarAlunosPorStatus(alunos, "ativo"));
console.log("filtrarAlunosPorStatus(alunos, \"inativo\"):", filtrarAlunosPorStatus(alunos, "inativo"));
console.log("obterNomesAlunos(alunos):", obterNomesAlunos(alunos));

// Exemplo integrado dos slides da aula: contar alunos ativos
// 1. Entrada: array de alunos | 2. Processamento: laço + condição | 3. Saída: console
function contarAlunosAtivos(listaAlunos) {
  let quantidade = 0;

  for (const aluno of listaAlunos) {
    if (aluno.status === "ativo") {
      quantidade++;
    }
  }

  return quantidade;
}
secao("Exemplo da aula - contarAlunosAtivos");
{
  const totalAtivos = contarAlunosAtivos(alunos);
  console.log(`Alunos ativos: ${totalAtivos}`);
}


// ------------------------------------------------------------
// OPERAÇÕES COM CURSOS
// ------------------------------------------------------------

// (20) a (26) - Array de cursos
secao("Exercícios 20 a 26 - Array de cursos");
{
  // (20) Criar array
  const cursos = [
    "ADS",
    "Ciência da Computação",
    "Engenharia de Software"
  ];

  // (21) Acessar elementos (o índice começa em 0)
  console.log(cursos[0]);
  console.log(cursos[1]);
  console.log(cursos[2]);

  // (22) Quantidade
  console.log("Quantidade:", cursos.length);

  // (23) Adicionar curso
  cursos.push("Sistemas de Informação");
  console.log("Após push:", cursos);

  // (24) Remover o último curso
  cursos.pop();
  console.log("Após pop:", cursos);

  // (25) for...of
  console.log("for...of:");
  for (const curso of cursos) {
    console.log(curso);
  }

  // (26) forEach()
  console.log("forEach:");
  cursos.forEach((curso) => {
    console.log(curso);
  });
}

// (46) Desestruturação de array e (47) Spread em array
secao("Exercícios 46 e 47 - Desestruturação e spread de array");
{
  const cursos = [
    "ADS",
    "CC",
    "ES"
  ];

  // (46)
  const [
    primeiroCurso,
    segundoCurso
  ] = cursos;
  console.log(primeiroCurso);
  console.log(segundoCurso);

  // (47) O array original é preservado
  const cursosAtualizados = [
    ...cursos,
    "Sistemas de Informação"
  ];
  console.log("Original:", cursos);
  console.log("Atualizado:", cursosAtualizados);
}

// (50) Filtrar cursos ativos
secao("Exercício 50 - Cursos ativos");
{
  const cursosAtivos = cursosCadastrados.filter((curso) => {
    return curso.ativo === true;
  });
  console.log(cursosAtivos);
}

// (51) Obter apenas os nomes dos cursos
secao("Exercício 51 - Nomes dos cursos");
{
  const nomesCursos = cursosCadastrados.map((curso) => {
    return curso.nome;
  });
  console.log(nomesCursos);
}

// (52) Buscar curso por sigla
function buscarCursoPorSigla(listaCursos, sigla) {
  return listaCursos.find((curso) => curso.sigla === sigla);
}
secao("Exercício 52 - Buscar curso por sigla");
console.log("buscarCursoPorSigla(cursosCadastrados, \"CC\"):", buscarCursoPorSigla(cursosCadastrados, "CC"));
console.log("buscarCursoPorSigla(cursosCadastrados, \"XYZ\"):", buscarCursoPorSigla(cursosCadastrados, "XYZ"));


// ------------------------------------------------------------
// OPERAÇÕES COM MATRÍCULAS
// ------------------------------------------------------------

// (37) Contar matrículas ativas com let + for...of + if
secao("Exercício 37 - Contar matrículas ativas (for...of)");
{
  let totalAtivas = 0;
  for (const matricula of matriculas) {
    if (matricula.status === "ativa") {
      totalAtivas++;
    }
  }
  console.log("Matrículas ativas:", totalAtivas);
}

// (38) Contar com filter() + length
secao("Exercício 38 - Contar matrículas ativas (filter)");
{
  const matriculasAtivas = matriculas.filter((matricula) => {
    return matricula.status === "ativa";
  });
  console.log("Matrículas ativas:", matriculasAtivas.length);
}

// (39) Função para contagem
function contarMatriculasAtivas(listaMatriculas) {
  const ativas = listaMatriculas.filter((matricula) => {
    return matricula.status === "ativa";
  });
  return ativas.length;
}
secao("Exercício 39 - Função contarMatriculasAtivas");
console.log(contarMatriculasAtivas(matriculas));
console.log(contarMatriculasAtivas([]));


// ------------------------------------------------------------
// OPERAÇÕES COM USUÁRIOS
// ------------------------------------------------------------

// (41) Filtrar usuários ativos
secao("Exercício 41 - Usuários ativos");
{
  const usuariosAtivos = usuarios.filter((usuario) => {
    return usuario.status === "ativo";
  });
  console.log(usuariosAtivos);
}

// (42) Buscar administrador
secao("Exercício 42 - Buscar administrador");
{
  const administrador = usuarios.find((usuario) => {
    return usuario.perfil === "administrador";
  });
  console.log(administrador);
}


// ------------------------------------------------------------
// DIAGNÓSTICOS E COMPARAÇÕES (exercícios 59 a 64)
// ------------------------------------------------------------

// (59) Versão explícita x versão compacta
// Duas operações: filtrar alunos ativos e obter nomes dos cursos.
secao("Exercício 59 - Versão explícita x compacta");
{
  // Operação 1: filtrar alunos ativos
  const ativosExplicita = alunos.filter((aluno) => {
    return aluno.status === "ativo";
  });
  const ativosCompacta = alunos.filter((aluno) => aluno.status === "ativo");

  // Operação 2: obter os nomes dos cursos
  const nomesExplicita = cursosCadastrados.map((curso) => {
    return curso.nome;
  });
  const nomesCompacta = cursosCadastrados.map((curso) => curso.nome);

  console.log("Alunos ativos (explícita):", ativosExplicita.length);
  console.log("Alunos ativos (compacta):", ativosCompacta.length);
  console.log("Nomes dos cursos (explícita):", nomesExplicita);
  console.log("Nomes dos cursos (compacta):", nomesCompacta);

  // Para a aprendizagem inicial, a versão EXPLÍCITA é mais adequada: as
  // chaves e o "return" deixam claro o que a função recebe e devolve.
  // A versão compacta é mais curta e fica natural depois que o conceito
  // de retorno já está dominado.
}

// (60) Diagnosticar erro com const
secao("Exercício 60 - Reatribuir const");
{
  try {
    const nome = "Ana";
    nome = "Carlos"; // ERRO: const não pode ser reatribuída
  } catch (erro) {
    console.log("Erro capturado:", erro.message);
  }

  // Correção: usar let quando o valor precisa mudar
  let nome = "Ana";
  nome = "Carlos";
  console.log("Corrigido com let:", nome);
}

// (61) Diagnosticar igualdade
secao("Exercício 61 - Igualdade estrita");
{
  const quantidade = 10;
  console.log(quantidade === "10"); // false: number é diferente de string
  // Para comparação: o operador == converteria os tipos e daria true,
  // por isso o === é preferido.
  console.log(quantidade == "10");
}

// (62) Diagnosticar índice
secao("Exercício 62 - Índice inexistente");
{
  const alunos = [
    "Ana",
    "Carlos"
  ];
  console.log(alunos[2]); // undefined: os índices existentes são 0 e 1
}

// (63) Diagnosticar find() sem resultado
secao("Exercício 63 - find() sem resultado");
{
  const naoEncontrado = alunos.find((aluno) => aluno.nome === "Pessoa Inexistente");
  console.log(naoEncontrado); // undefined
}

// (64) Diagnosticar filter() sem resultado
secao("Exercício 64 - filter() sem resultado");
{
  const nenhum = alunos.filter((aluno) => aluno.status === "formado");
  console.log(nenhum); // [] (array vazio)
  console.log(nenhum.length); // 0
}


// ------------------------------------------------------------
// RESUMO DO DASHBOARD
// ------------------------------------------------------------

// (58) Função genérica de contagem
function contarRegistros(lista) {
  return lista.length;
}

// (56) Quantidade de registros
secao("Exercício 56 - Resumo do dashboard");
console.log(`Alunos: ${alunos.length}`);
console.log(`Cursos: ${cursosCadastrados.length}`);
console.log(`Matrículas: ${matriculas.length}`);
console.log(`Usuários: ${usuarios.length}`);

// (57) Informações ativas
secao("Exercício 57 - Dashboard com informações ativas");
{
  const alunosAtivos = filtrarAlunosPorStatus(alunos, "ativo").length;
  const cursosAtivos = cursosCadastrados.filter((curso) => curso.ativo).length;
  const matriculasAtivas = contarMatriculasAtivas(matriculas);
  const usuariosAtivos = usuarios.filter((usuario) => usuario.status === "ativo").length;

  console.log(`Alunos ativos: ${alunosAtivos}`);
  console.log(`Cursos ativos: ${cursosAtivos}`);
  console.log(`Matrículas ativas: ${matriculasAtivas}`);
  console.log(`Usuários ativos: ${usuariosAtivos}`);
}

// (58) Testar a função genérica
secao("Exercício 58 - contarRegistros");
console.log("alunos:", contarRegistros(alunos));
console.log("cursos:", contarRegistros(cursosCadastrados));
console.log("matriculas:", contarRegistros(matriculas));
console.log("usuarios:", contarRegistros(usuarios));

// (70) Desafio integrador: valores obtidos dinamicamente dos arrays
function exibirResumoSistema() {
  const totalAlunos = contarRegistros(alunos);
  const alunosAtivos = filtrarAlunosPorStatus(alunos, "ativo").length;

  const totalCursos = contarRegistros(cursosCadastrados);
  const cursosAtivos = cursosCadastrados.filter((curso) => curso.ativo).length;

  const totalMatriculas = contarRegistros(matriculas);
  const matriculasAtivas = contarMatriculasAtivas(matriculas);

  const totalUsuarios = contarRegistros(usuarios);
  const usuariosAtivos = usuarios.filter((usuario) => usuario.status === "ativo").length;

  console.log("\n=== SISTEMA ACADÊMICO ===\n");
  console.log(`Total de alunos: ${totalAlunos}`);
  console.log(`Alunos ativos: ${alunosAtivos}\n`);
  console.log(`Total de cursos: ${totalCursos}`);
  console.log(`Cursos ativos: ${cursosAtivos}\n`);
  console.log(`Total de matrículas: ${totalMatriculas}`);
  console.log(`Matrículas ativas: ${matriculasAtivas}\n`);
  console.log(`Total de usuários: ${totalUsuarios}`);
  console.log(`Usuários ativos: ${usuariosAtivos}`);
}
exibirResumoSistema();
