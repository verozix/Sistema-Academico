# Sistema de Gerenciamento Acadêmico - Aula 10 (DOM e Eventos)

Atividade prática de **Programação Web I** - UNIVEST.
Evolução do projeto da Aula 09: o JavaScript agora lê os arrays do `dados.js` e atualiza a interface por meio do **DOM** e de **eventos**.

## Estrutura

```
sistema-academico-aula10/
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
    ├── dados.js                 (dados de exemplo)
    ├── app.js                   (lógica + DOM + eventos)
    └── exercicios-aula09.js     (exercícios da Aula 09, preservados; não é carregado pelas páginas)
```

## Como testar

1. Abrir o `index.html` com o Live Server e apertar **F12** (aba Console).
2. **index.html**: indicadores calculados a partir dos arrays (total e ativos), primeiro card em destaque e saídas dos exercícios no console.
3. **alunos.html**: lista, busca por nome, filtro por status, botão "Atualizar lista", "Ver detalhes", "Remover" e formulário de cadastro, tudo na mesma página.
4. **cursos.html, matriculas.html, usuarios.html**: listas renderizadas pelo JavaScript.
5. Os dados cadastrados ou removidos ficam só na memória: ao recarregar a página, voltam a ser os do `dados.js`.

## Onde está cada exercício (`js/app.js`)

| Bloco | Exercícios |
|---|---|
| Configuração inicial | 3, 5, 43, 55, 60 (seleção dos elementos) |
| Funções auxiliares e funções da Aula 09 | 77 (textContent + createElement), 69 |
| Exploração do DOM | 4 a 9, 14, 15, 17 a 22 |
| Dashboard | 10 a 13, 73, 74 |
| Alunos | 24 a 33, 38 a 41, 44 a 53, 56 a 72 |
| Cursos, matrículas e usuários | 34 a 36 |
| Diagnósticos | 78 a 82 |
| Inicialização | 75 (organização das funções) |

Fluxo implementado (exercício 85):
`submit` → `preventDefault()` → captura dos campos → objeto `novoAluno` → `alunos.push()` → `renderizarAlunos()` → `atualizarDashboard()` → interface atualizada.

## Decisões de implementação

- **Scripts em todas as páginas.** O mesmo `app.js` roda em todas; por isso as funções verificam se o elemento existe antes de usá-lo (`querySelector()` devolve `null` quando não encontra). A função `definirTexto()` faz essa verificação.
- **Cadastro na página de alunos.** O desafio integrador pede lista, busca, filtro e cadastro na mesma página. Como os dados só ficam na memória, o formulário (`#form-aluno`) está em `alunos.html` e também em `aluno-form.html`, que mostra a lista logo abaixo.
- **Formulário simplificado.** Os campos são `nome`, `email`, `curso` e `status`, os mesmos do objeto `novoAluno`. Os campos de nascimento e observação foram retirados.
- **Novo id.** O enunciado usa `alunos.length + 1`, mas depois de remover um aluno isso poderia repetir um id. Foi usado o maior id atual + 1 (`gerarProximoId`).
- **Dashboard dinâmico.** Os números fixos (245, 8...) foram trocados por spans (`#total-alunos` etc.) preenchidos a partir dos arrays. Cada card mostra também os registros ativos (exercício 13).
- **Experimentos temporários.** Os exercícios que pedem "modificar temporariamente" (38 a 41, 17 a 20) estão documentados em comentários, e o código final mantém a versão mais completa.
- **Sem estilo inline.** O JavaScript só usa `classList` (`destaque`, `status-ativo`, `status-inativo`, `mensagem-vazia`, `mensagem-sucesso`, `mensagem-erro`); a aparência está no `style.css`. Não foi usado `innerHTML` nem LocalStorage.

## Respostas

**Ex. 4 - O que o objeto `document` representa?** A página HTML carregada, como árvore de elementos (DOM). É o ponto de entrada para selecionar, criar e alterar elementos.

**Ex. 9 - `querySelector()` x `querySelectorAll()`:** `querySelector()` devolve só o **primeiro** elemento que corresponde ao seletor (ou `null`); `querySelectorAll()` devolve uma **NodeList com todos** (vazia se não houver nenhum).

**Ex. 32 - Por que limpar a lista antes de renderizar?** Porque `append()` acrescenta ao que já existe. Sem `textContent = ""`, cada renderização repetiria os cards e a lista ficaria duplicada. A limpeza também remove a mensagem de "nenhum resultado" de uma busca anterior (ex. 64).

**Ex. 41 - O que é `event.target`?** O elemento em que o evento ocorreu (por exemplo, o botão que foi clicado).

**Ex. 45 - Diferença com `preventDefault()`:** sem ele, o navegador envia o formulário e recarrega a página, e os dados que estavam só na memória são perdidos. Com ele, a página continua aberta e o JavaScript trata o envio.

**Ex. 71 - O aluno foi removido do array?** Não. `elemento.remove()` retira só o elemento da página; o array `alunos` continua com o registro. DOM e dados são coisas separadas (por isso o exercício 72 remove também do array com `splice()` e renderiza de novo).

### Diagnósticos (78 a 82)

| Ex. | Situação | Resultado |
|---|---|---|
| 78 | `querySelector("#titulo-inexistente")` e depois `.textContent = ...` | O seletor devolve `null`, e atribuir `textContent` a `null` gera `TypeError: Cannot set properties of null`. Verificar com `console.log(titulo)` e testar `if (titulo !== null)`. |
| 79 | `renderizarAlunos(alunos)` duas vezes sem limpar | Cada aluno aparece duas vezes na tela, porque `append()` só acrescenta. |
| 80 | `submit` sem `preventDefault()` | A página é recarregada/navega, a mensagem "Salvando" some do console e os dados em memória se perdem. |
| 81 | `addEventListener("clic", salvar)` | `"clic"` não é um evento existente: não há erro, mas a função nunca é chamada. O correto é `"click"`. |
| 82 | `querySelector(".card")` com dez cards | Retorna **1** elemento (o primeiro). Para obter todos: `querySelectorAll(".card")`. |

### Questões teóricas (83)

1. **DOM:** *Document Object Model*, a representação da página como uma árvore de objetos que o JavaScript pode ler e modificar.
2. **`document`:** objeto que representa a página inteira e oferece métodos para selecionar e criar elementos.
3. **`querySelector()` x `querySelectorAll()`:** primeiro elemento x todos os elementos (ver exercício 9).
4. **`textContent`:** lê ou altera o texto de um elemento, tratando o conteúdo como texto puro.
5. **`value`:** o valor atual de um campo de formulário (o que o usuário digitou ou selecionou).
6. **`classList`:** permite adicionar (`add`), remover (`remove`), alternar (`toggle`) e verificar (`contains`) classes CSS de um elemento.
7. **`createElement()`:** cria um novo elemento HTML na memória (por exemplo, `document.createElement("p")`).
8. **Criar x adicionar ao DOM:** o elemento criado existe só na memória e não aparece; ele só é exibido depois de inserido em um elemento da página, com `append()`.
9. **`append()`:** insere um ou mais elementos (ou textos) no final de outro elemento.
10. **`remove()`:** retira o elemento da página (do DOM).
11. **Evento:** algo que acontece na página, como um clique, a digitação, a escolha de uma opção ou o envio de um formulário.
12. **`addEventListener()`:** registra uma função que será executada quando um tipo de evento ocorrer em um elemento.
13. **`event.target`:** o elemento que originou o evento.
14. **`preventDefault()`:** cancela o comportamento padrão do navegador para o evento (por exemplo, o envio e o recarregamento do formulário).
15. **`input` x `change`:** `input` dispara a cada alteração do campo (a cada letra digitada); `change` dispara quando o valor é confirmado (ao escolher outra opção de um `select` ou ao sair do campo).
16. **Limpar antes de renderizar:** para não duplicar os registros na tela (ver exercício 32).
17. **Vantagem de separar em funções:** reutilizar código, facilitar testes e manutenção e deixar o programa mais legível.
18. **Classes CSS em vez de estilos inline:** mantém a aparência no CSS (um único lugar), facilita a manutenção, permite reaproveitar estilos e deixa o JavaScript só com a lógica.
19. **`textContent` com textos do usuário:** ele insere o conteúdo como texto, nunca como HTML. Assim, algo como `<b>x</b>` aparece literalmente, sem criar elementos nem executar código indesejado (evita injeção de HTML).
20. **Por que os dados somem ao recarregar:** os arrays ficam apenas na memória da página; ao recarregar, o navegador executa o `dados.js` de novo e os valores voltam ao estado original. Para manter os dados seria preciso um armazenamento permanente (LocalStorage ou servidor), que será visto depois.
