# Sistema de Gerenciamento Acadêmico - Aula 09 (JavaScript ES6+)

Atividade prática de **Programação Web I** - UNIVEST.
Evolução do projeto anterior: foi adicionada a pasta `js/` com `dados.js` e `app.js`.
O HTML e o CSS não foram alterados, exceto pela inclusão dos dois `<script>` no final do `index.html`.

## Estrutura

```
sistema-academico-aula09/
├── index.html
├── alunos.html
├── aluno-form.html
├── cursos.html
├── curso-form.html
├── matriculas.html
├── matricula-form.html
├── usuarios.html
├── usuario-form.html
│
├── css/
│   └── style.css
│
└── js/
    ├── dados.js
    └── app.js
```

## Como testar

1. Abrir o `index.html` no navegador (por exemplo, com o Live Server do VS Code).
2. Apertar **F12** e abrir a aba **Console**.
3. O console exibe a saída dos exercícios, separados por títulos como `--- Exercício 33 - filter() ---`, e termina com o resumo `=== SISTEMA ACADÊMICO ===`.

Resultado do desafio integrador (exercício 70), obtido dinamicamente dos arrays:

```
=== SISTEMA ACADÊMICO ===

Total de alunos: 3
Alunos ativos: 2

Total de cursos: 3
Cursos ativos: 2

Total de matrículas: 3
Matrículas ativas: 2

Total de usuários: 3
Usuários ativos: 2
```

## Organização do `app.js` (exercício 65)

| Bloco | Exercícios |
|---|---|
| Configuração inicial | 4 a 19 (constantes, `let`, tipos, operadores, condicionais, laços e funções) |
| Operações com alunos | 27 a 29, 31 a 35, 43 a 45, 48, 53 a 55 |
| Operações com cursos | 20 a 26, 46, 47, 50 a 52 |
| Operações com matrículas | 37 a 39 |
| Operações com usuários | 41 e 42 |
| Diagnósticos e comparações | 59 a 64 (bloco extra, com explicações em comentário) |
| Resumo do dashboard | 56 a 58 e 70 |

Cada exercício fica dentro de um bloco `{ }`. Assim, nomes repetidos nos exercícios (`nome`, `aluno`, `cursos`, `calcularMedia`) não geram conflito de declaração.

## Exercício 59 - Versão explícita x compacta

```js
// Explícita
const ativos = alunos.filter((aluno) => {
  return aluno.status === "ativo";
});

// Compacta
const ativos = alunos.filter((aluno) => aluno.status === "ativo");
```

A mesma comparação foi feita com `map()` (nomes dos cursos). Para a **aprendizagem inicial**, a versão explícita é mais adequada: as chaves e o `return` mostram claramente o que a função recebe e devolve. A compacta é mais curta e fica natural depois que o conceito de retorno está dominado.

## Exercícios 60 a 64 - Diagnósticos

| Ex. | Código | Resultado e explicação |
|---|---|---|
| 60 | `const nome = "Ana"; nome = "Carlos";` | `TypeError: Assignment to constant variable.` Uma `const` não pode ser reatribuída. Correção: usar `let` quando o valor precisa mudar. |
| 61 | `quantidade === "10"` (com `quantidade = 10`) | `false`. O `===` compara valor **e tipo**, e `10` (number) é diferente de `"10"` (string). |
| 62 | `alunos[2]` em um array com 2 itens | `undefined`. Os índices começam em 0, então só existem `[0]` e `[1]`. |
| 63 | `find()` sem encontrar nada | Retorna `undefined`. |
| 64 | `filter()` sem encontrar nada | Retorna um **array vazio** (`[]`), com `length` igual a 0. Um array vazio ainda é "verdadeiro" em um `if`, então o correto é verificar o `length`. |

## Exercício 67 - Separação de responsabilidades

```
dados.js  ->  dados     (alunos, cursosCadastrados, matriculas, usuarios)
app.js    ->  lógica    (variáveis, condições, laços, funções, filter/map/find)
```

O `dados.js` só guarda informações e não tem lógica. O `app.js` só processa essas informações. Assim, os dados podem mudar sem mexer na lógica, e a lógica pode ser reutilizada na Aula 10 para gerar a interface a partir dos mesmos arrays.

## Exercício 68 - Testes no console

Foi verificado que:
- não há erros no console;
- os 4 arrays são carregados e acessíveis;
- as funções (`calcularMedia`, `contarMatriculasAtivas`, `buscarCursoPorSigla`, `buscarAlunoPorId`, `filtrarAlunosPorStatus`, `obterNomesAlunos`, `contarRegistros`) retornam o esperado;
- os filtros retornam 2 alunos ativos (Ana Souza e Mariany Santos), 2 cursos ativos, 2 matrículas ativas e 2 usuários ativos;
- as buscas retornam Carlos Silva (aluno), o curso CC e o usuário Administrador, e `undefined` quando não encontram.

## Exercício 69 - Questões teóricas

1. **Diferença entre `let` e `const`:** com `let` o valor pode ser reatribuído; com `const` não. Ambas têm escopo de bloco. Em uma `const` que guarda objeto ou array, o conteúdo ainda pode ser alterado; o que não muda é a referência.
2. **Por que evitar `var`:** ela tem escopo de função (não de bloco), sofre hoisting com valor `undefined` e permite redeclaração, o que causa bugs difíceis de achar. `let` e `const` são mais previsíveis.
3. **O que faz `===`:** é a igualdade estrita; compara valor e tipo, sem conversão automática.
4. **`&&` x `||`:** `&&` (E) só é verdadeiro se **as duas** condições forem verdadeiras; `||` (OU) é verdadeiro se **pelo menos uma** for verdadeira.
5. **Função do `if`:** executar um bloco de código somente quando a condição é verdadeira (desvio condicional).
6. **Para que serve uma função:** agrupar um trecho de código reutilizável, que pode receber parâmetros e devolver um valor, evitando repetição e organizando o programa.
7. **Array x objeto:** o array é uma lista ordenada acessada por índice (`cursos[0]`); o objeto é um conjunto de pares chave-valor acessados pelo nome da propriedade (`aluno.nome`).
8. **`filter()`:** cria um novo array apenas com os elementos que passam no teste; se nenhum passar, retorna `[]`.
9. **`map()`:** cria um novo array transformando cada elemento; o resultado tem o mesmo tamanho do original.
10. **`find()`:** retorna o **primeiro** elemento que satisfaz a condição, ou `undefined` se nenhum satisfizer.
11. **`length`:** informa a quantidade de elementos de um array (ou de caracteres de uma string).
12. **Template literal:** string escrita com crases (`` ` ``) que permite inserir valores com `${...}` e ocupar várias linhas.
13. **Desestruturação:** sintaxe que extrai propriedades de um objeto ou elementos de um array para variáveis, em uma única linha.
14. **Spread operator (`...`):** espalha os elementos de um array ou as propriedades de um objeto, permitindo copiar ou combinar sem alterar o original (a cópia é rasa).
15. **Por que `dados.js` antes de `app.js`:** o navegador executa os scripts na ordem em que aparecem. O `app.js` usa `alunos`, `matriculas` etc.; se for carregado primeiro, ocorre `ReferenceError: alunos is not defined`.

## Restrição da aula (exercício 71)

Não foram usados os recursos de manipulação do DOM, `innerHTML`, `textContent`, eventos, `LocalStorage` nem React. Os resultados aparecem apenas no console.
