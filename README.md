# Sistema de Gerenciamento Acadêmico - Aula 05 (Flexbox)

Atividade prática de **Programação Web I** - UNIVEST.
Evolução do projeto da Aula 04 (HTML semântico, formulários e CSS básico), agora com **Flexbox**.
Não foi criado um projeto novo: as mesmas páginas e o mesmo `css/style.css` foram evoluídos.

## Estrutura

```
sistema-academico/
├── index.html
├── alunos.html
├── aluno-form.html
├── cursos.html
├── curso-form.html
├── matriculas.html
├── matricula-form.html
├── usuarios.html
├── usuario-form.html
└── css/
    └── style.css
```

## O que mudou da Aula 04 para a Aula 05

| Etapa | Alteração | Onde |
|---|---|---|
| 1 a 4 | Menu em `<ul>` / `<li>` com `nav ul { display: flex; gap: 16px; ... }` | todas as páginas + CSS |
| 3 | Comportamento antigo removido (`display: inline` e `margin-right` nos itens do menu) | CSS |
| 5 e 6 | `<header class="cabecalho">` com título + `<span>`, usando `justify-content: space-between` e `align-items: center` | todas as páginas + CSS |
| 7 e 8 | `<div class="cards">` com `display: flex; flex-wrap: wrap; gap: 16px` | `index.html` + CSS |
| 9 | `.card { flex: 1 1 250px; }` (grow, shrink e basis) | CSS |
| 13 e 14 | `<div class="lista-cards">` com Flexbox nas listagens | alunos, cursos, matrículas e usuários |
| 15 | A mesma classe `.card` é reutilizada em todos os registros | todas as listagens |
| 16 a 18 | `<div class="acoes">` com `justify-content: flex-end; gap: 12px` | os 4 formulários |

## Conceitos de Flexbox identificados

- **Flex Container:** `nav ul`, `.cabecalho`, `.cards`, `.lista-cards` e `.acoes`.
- **Flex Items:** os `li` do menu, o `h1` e o `span` do cabeçalho, os `.card` e os botões.
- **`flex: 1 1 250px`:** `flex-grow: 1` (cresce), `flex-shrink: 1` (encolhe) e `flex-basis: 250px` (tamanho inicial).
- **Quebra de linha:** `flex-wrap: wrap` faz os cards irem para a linha de baixo quando a janela diminui.
- **Espaçamento:** `gap` no lugar de `margin` entre os itens.

## Observações dos experimentos (Etapas 10, 11 e 12)

- `flex-grow: 0`: os cards mantêm 250px e sobra espaço vazio na linha. Com `flex-grow: 1`, eles dividem o espaço livre e preenchem a linha.
- `flex-basis`: com 200px cabem mais cards por linha antes de quebrar; com 300px cabem menos.
- `flex-wrap: nowrap`: todos os cards ficam na mesma linha e são espremidos ao reduzir a janela. Com `wrap`, eles quebram para a linha seguinte.

## Requisitos da Aula 04 mantidos

CSS externo, seletor universal, por elemento, por classe, por ID (`#dashboard h2`), descendente (`nav a`),
agrupamento (`input, select, textarea`), herança, cascata, especificidade (`.card p` vence `article p`),
Box Model (`margin`, `padding`, `border`, `width`, `box-sizing`).

Não foram usados CSS Grid, Media Queries, JavaScript, DOM, LocalStorage nem React.
