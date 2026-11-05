// ============================================================
// dados.js - DADOS do Sistema de Gerenciamento Acadêmico
//
// Este arquivo contém SOMENTE os dados de exemplo:
// alunos, cursosCadastrados, matriculas e usuarios.
// Nenhuma lógica (funções, laços, condições) deve ficar aqui.
//
// IMPORTANTE: este arquivo precisa ser carregado ANTES do app.js,
// pois o app.js usa estes arrays.
// ============================================================

// Alunos (exercício 30)
const alunos = [
  {
    id: 1,
    nome: "Ana Souza",
    curso: "ADS",
    status: "ativo"
  },
  {
    id: 2,
    nome: "Carlos Silva",
    curso: "CC",
    status: "inativo"
  },
  {
    id: 3,
    nome: "Mariany Santos",
    curso: "ES",
    status: "ativo"
  }
];

// Cursos (exercício 49)
const cursosCadastrados = [
  {
    id: 1,
    sigla: "ADS",
    nome: "Análise e Desenvolvimento de Sistemas",
    ativo: true
  },
  {
    id: 2,
    sigla: "CC",
    nome: "Ciência da Computação",
    ativo: true
  },
  {
    id: 3,
    sigla: "ES",
    nome: "Engenharia de Software",
    ativo: false
  }
];

// Matrículas (exercício 36)
const matriculas = [
  {
    numero: "2026001",
    aluno: "Ana Souza",
    curso: "ADS",
    status: "ativa"
  },
  {
    numero: "2026002",
    aluno: "Carlos Silva",
    curso: "CC",
    status: "trancada"
  },
  {
    numero: "2026003",
    aluno: "Mariany Santos",
    curso: "ES",
    status: "ativa"
  }
];

// Usuários (exercício 40)
const usuarios = [
  {
    id: 1,
    nome: "Administrador",
    perfil: "administrador",
    status: "ativo"
  },
  {
    id: 2,
    nome: "Secretaria",
    perfil: "secretaria",
    status: "ativo"
  },
  {
    id: 3,
    nome: "Consulta",
    perfil: "consulta",
    status: "inativo"
  }
];
