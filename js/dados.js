// ============================================================
// dados.js - DADOS INICIAIS do Sistema de Gerenciamento Acadêmico
//
// Este arquivo contém SOMENTE os dados iniciais (valores padrão):
// alunosIniciais, cursosIniciais, matriculasIniciais e usuariosIniciais.
// Nenhuma lógica (funções, laços, condições) deve ficar aqui.
//
// Os dados "de verdade" ficam no LocalStorage (ver storage.js). Estes
// arrays só são usados quando ainda não há nada salvo, ou quando o
// usuário pede para restaurar os dados iniciais.
//
// ORDEM DE CARREGAMENTO: dados.js -> storage.js -> app.js
// ============================================================

// Alunos (exercício 30)
const alunosIniciais = [
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
const cursosIniciais = [
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
const matriculasIniciais = [
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
const usuariosIniciais = [
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
