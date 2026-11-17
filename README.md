# Sistema de Gerenciamento Acadêmico - Aula 11 (Persistência com LocalStorage)

Atividade prática de **Programação Web I** - UNIVEST.
Evolução do projeto da Aula 10: os dados agora são gravados no **LocalStorage** (em JSON) e continuam disponíveis depois de atualizar (F5) ou fechar a página.

## Estrutura

```
sistema-academico-aula11/
├── index.html, alunos.html, aluno-form.html, cursos.html, curso-form.html,
│   matriculas.html, matricula-form.html, usuarios.html, usuario-form.html
├── css/style.css
└── js/
    ├── dados.js     (somente os dados INICIAIS: alunosIniciais, cursosIniciais, ...)
    ├── storage.js   (chaves + salvarDados, carregarDados, removerDados)
    └── app.js       (lógica + DOM + eventos; usa os dois arquivos anteriores)
```

## Como testar

1. Abrir `alunos.html` com o Live Server e apertar **F12**.
2. Cadastrar um aluno, atualizar a página (F5) e ver que ele continua. Conferir em *DevTools > Application > Local Storage*.
3. Remover um aluno, usar **Inativar/Ativar**, buscar e filtrar. Atualizar a página e conferir o que permaneceu.
4. **Restaurar dados iniciais** volta os alunos ao `dados.js` e grava de novo no LocalStorage.
5. Cursos, matrículas e usuários também são cadastrados pelos formulários e salvos.

## Onde está cada exercício

| Exercícios | Onde |
|---|---|
| 3, 23 a 29, 46, 52, 74 | `js/storage.js` |
| 30, 75 | `js/dados.js` |
| 4 | `<script>` no final de todas as páginas HTML |
| 31 a 38, 40, 42 a 44, 48 a 50, 56 a 58, 60, 66, 67, 72, 76, 83 a 85 | `js/app.js` |
| 5 a 22, 39, 41, 45, 47, 51, 53, 55, 61 a 64, 68, 70, 73 | testes no Console / navegador (comandos abaixo) |
| 11, 17, 18, 24, 36, 54, 59, 62, 65, 69, 71, 77 a 82 | respostas abaixo |

### Decisões de implementação

- **Variável `cursos`.** Antes o array chamava `cursosCadastrados`; agora é `cursosIniciais` (no `dados.js`) e `cursos` (no `app.js`), como no enunciado.
- **`gerarNovoId()`** usa o maior id + 1. Recebe a lista como parâmetro (padrão: `alunos`) para também servir a cursos e usuários.
- **`alterarStatusAluno()`** redesenha com `aplicarFiltros()` e não com `renderizarAlunos(alunos)`, para respeitar a busca e o filtro que estiverem ativos. O card ganhou o botão **Inativar/Ativar**.
- **`carregarDados()`** também devolve o valor padrão se o JSON for válido mas não for uma lista (`Array.isArray`). `salvarDados()` tem `try...catch` para o caso de o armazenamento estar cheio ou bloqueado.
- **`restaurarTodosDados()`** (extra) restaura os quatro conjuntos de uma vez; serve para o exercício 64 (depois do `clear()`).
- **Formulários de curso, matrícula e usuário** ganharam `id` e tratamento do `submit`, senão não haveria o que persistir nos exercícios 56 a 58. O select de alunos da matrícula é montado a partir dos alunos salvos.
- **Usuários sem dados sensíveis (60).** A senha é lida do formulário só para a validação do campo; o objeto salvo tem apenas `id`, `nome`, `perfil` e `status`.
- O arquivo `exercicios-aula09.js` e os experimentos do console da Aula 10 não fazem parte desta entrega.

## Testes no Console (exercícios 5 a 29, 47, 53, 61 a 64)

```js
// 5 a 9
localStorage.setItem("teste", "Funcionando");
console.log(localStorage.getItem("teste"));      // Funcionando
localStorage.removeItem("teste");
console.log(localStorage.getItem("teste"));      // null
localStorage.setItem("nomeSistema", "Sistema Acadêmico");
console.log(localStorage.getItem("nomeSistema")); // continua após F5

// 10 a 16
const alunoTeste = { id: 1, nome: "Ana Souza", curso: "ADS", status: "ativo" };
localStorage.setItem("alunoTeste", alunoTeste);
console.log(localStorage.getItem("alunoTeste")); // [object Object]
const alunoJSON = JSON.stringify(alunoTeste);
console.log(typeof alunoJSON);                    // string
localStorage.setItem("alunoTeste", alunoJSON);
const alunoObjeto = JSON.parse(localStorage.getItem("alunoTeste"));
console.log(alunoObjeto.nome);                    // Ana Souza

// 19 a 22
const alunosTeste = [{ id: 1, nome: "Ana" }, { id: 2, nome: "Carlos" }];
localStorage.setItem("alunosTeste", JSON.stringify(alunosTeste));
for (const aluno of JSON.parse(localStorage.getItem("alunosTeste"))) console.log(aluno.nome);

// 26 a 29 (storage.js carregado)
salvarDados(STORAGE_KEYS.alunos, alunos);
console.log(carregarDados(STORAGE_KEYS.alunos, []));
console.log(carregarDados("chave_inexistente", [])); // [] (valor padrão)

// 47: remover e recarregar -> a aplicação volta aos dados iniciais
removerDados(STORAGE_KEYS.alunos);

// 53 e 55: JSON inválido
localStorage.setItem(STORAGE_KEYS.alunos, "conteudo invalido"); // F5 -> catch + dados iniciais
restaurarAlunos();                                              // corrige o que está salvo

// 61 a 64
sessionStorage.setItem("testeSessao", "ativo");
console.log(sessionStorage.getItem("testeSessao"));
localStorage.clear();      // apaga TODAS as chaves
restaurarTodosDados();     // 64: grava de novo os dados iniciais
```

## Respostas

**11 - Por que o objeto não foi armazenado adequadamente?** O localStorage só guarda **strings**. Ao receber um objeto, converte-o com `toString()`, resultando em `"[object Object]"`, e os dados se perdem.

**17 - Serialização:** `JSON.stringify()` (objeto/array -> string JSON).
**18 - Desserialização:** `JSON.parse()` (string JSON -> objeto/array).

**24 - Por que o prefixo `academico_`?** Todos os sistemas da mesma origem (endereço) compartilham o mesmo localStorage. O prefixo evita que uma chave genérica como `alunos` colida com a de outro sistema e deixa claro a quem cada chave pertence.

**36 - Por que não salvar `totalAlunos`?** É um valor **derivado**: sai de `alunos.length`. Guardá-lo duplicaria a informação e ele ficaria desatualizado se esquecêssemos de atualizá-lo. É melhor calcular a partir do array a cada vez.

**38 - Fluxo do cadastro:** Formulário -> Objeto (`novoAluno`) -> `push()` -> `salvarDados()` -> LocalStorage -> `renderizarAlunos()`.

**54 - `try...catch`:**
1. `try` envolve o código que pode dar erro (aqui, `JSON.parse()`).
2. `catch` recebe o erro e executa um plano B (aqui, registra o erro e devolve o valor padrão).
3. Sem tratamento, o `JSON.parse()` lançaria `SyntaxError`, o script pararia e a página ficaria sem listas nem dashboard.

**59 - Campos que não devem ficar no LocalStorage:** senha (e hash de senha), tokens de acesso/sessão, CPF e documentos, dados bancários e de cartão, e qualquer dado pessoal sensível. O localStorage fica legível no navegador, é acessível a qualquer script da página (inclusive um XSS) e não tem criptografia.

**62 - sessionStorage x localStorage:**
1. Após F5: o `sessionStorage` **permanece** (a mesma aba continua); o localStorage também.
2. Após fechar a aba: o `sessionStorage` é **apagado**; o localStorage permanece.
3. O mais adequado aqui é o **localStorage**, pois os registros devem continuar disponíveis mesmo depois de fechar o navegador.

**65 - Por que `removeItem()` é mais seguro que `clear()`?** `removeItem()` apaga apenas a chave informada. `clear()` apaga **todas** as chaves da origem, inclusive as de outros sistemas e configurações, sem possibilidade de desfazer.

**69 - A busca deveria alterar os dados persistidos?** Não. Busca só muda **o que aparece** na tela; os registros continuam os mesmos. Salvar a cada letra digitada seria desperdício e poderia gravar uma lista filtrada no lugar da completa.

**71 - Regra de persistência:** Cadastro -> salvar; Remoção -> salvar; Alteração -> salvar; Busca -> não salvar; Filtro -> não salvar.

**73 - Teste de IDs:** com ids 1, 2 e 3, remover o 2 e cadastrar de novo gera o id **4** (maior id + 1 = 3 + 1). Com `length + 1` o novo aluno receberia o id 3, **duplicado**.

### Ordem dos scripts (exercício 4)

`dados.js` -> `storage.js` -> `app.js`. O `app.js` executa logo no início `carregarDados(STORAGE_KEYS.alunos, alunosIniciais)`, que depende de `alunosIniciais` (do `dados.js`) e de `carregarDados` e `STORAGE_KEYS` (do `storage.js`). O `storage.js` também usa o que o `dados.js` define quando restauramos. O navegador executa os scripts na ordem em que aparecem; invertida, daria `ReferenceError: ... is not defined`.

### Diagnósticos (77 a 81)

| Ex. | Situação | Problema |
|---|---|---|
| 77 | `localStorage.setItem("alunos", alunos)` | O array é convertido em texto (`"[object Object],..."`) e os dados se perdem. Falta o `JSON.stringify(alunos)`. |
| 78 | `getItem("alunos")` e depois `alunos.push(...)` | `getItem()` devolve uma **string** (ou `null`), e string não tem `push()`: dá `TypeError`. Falta o `JSON.parse()`. |
| 79 | `JSON.parse("texto inválido")` | Lança `SyntaxError` e interrompe o script, a menos que esteja em `try...catch`. |
| 80 | Salvar em `"academico_alunos"` e ler `"academico_aluno"` | Chaves diferentes: `getItem()` devolve `null` e a aplicação cai nos dados iniciais, como se nada tivesse sido salvo. Constantes (`STORAGE_KEYS`) evitam isso. |
| 81 | `push()` e `renderizarAlunos()` sem `salvarDados()` | O aluno aparece na tela, mas só existe na memória: após F5 ele desaparece. |

## Questões teóricas (82)

1. **Persistência:** manter os dados disponíveis depois que a página é recarregada ou fechada.
2. **Web Storage:** API do navegador para guardar pares chave/valor (strings) no computador do usuário; tem `localStorage` e `sessionStorage`.
3. **LocalStorage x SessionStorage:** o localStorage permanece até ser apagado; o sessionStorage dura só enquanto a aba está aberta.
4. **JSON:** *JavaScript Object Notation*, formato de texto para representar objetos e listas.
5. **`JSON.stringify()`:** converte objeto/array em string JSON.
6. **`JSON.parse()`:** converte string JSON em objeto/array.
7. **Serialização:** transformar um objeto ou array em texto para guardar ou transmitir.
8. **Desserialização:** o caminho inverso: reconstruir o objeto ou array a partir do texto.
9. **`setItem(chave, valor)`:** grava (ou substitui) o valor da chave.
10. **`getItem(chave)`:** lê o valor da chave, sempre como string.
11. **`removeItem(chave)`:** apaga uma chave específica.
12. **Risco do `clear()`:** apaga todas as chaves da origem, inclusive as de outros sistemas, sem volta.
13. **`getItem()` sem a chave:** devolve `null`; por isso `carregarDados()` testa `!dados` e devolve o valor padrão.
14. **Constantes para as chaves:** evitam erros de digitação (ex. 80) e deixam a manutenção num único lugar.
15. **Busca e filtro não persistem:** só mudam a visualização, não os dados (ex. 69).
16. **Dashboard sem salvar:** os totais são calculados dos arrays (ex. 36).
17. **`try...catch`:** trata erros sem interromper o programa (ex. 54).
18. **LocalStorage x banco de dados:** limite de cerca de 5 MB, só strings, sem consultas, relacionamentos, controle de acesso, backup ou compartilhamento entre usuários/dispositivos; os dados ficam só naquele navegador e podem ser apagados pelo usuário.
19. **Senhas no LocalStorage:** fica legível por qualquer script da página e por quem usa o computador, sem criptografia; um ataque de XSS leria tudo (ex. 59).
20. **Função do `storage.js`:** concentrar o acesso ao LocalStorage (chaves, salvar, carregar e remover), deixando o `app.js` só com a lógica da aplicação.

## Fluxos (84 e 85)

**Cadastro:** `submit` -> `preventDefault()` -> objeto -> `push()` -> `JSON.stringify()` (dentro de `salvarDados`) -> LocalStorage -> `renderizarAlunos()` -> interface atualizada.

**Inicialização:** página carregada -> `localStorage.getItem()` -> `JSON.parse()` (dentro de `carregarDados`) -> array -> `inicializarAplicacao()` renderiza as listas -> dashboard.
