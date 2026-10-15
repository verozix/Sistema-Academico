# Sistema de Gerenciamento Acadêmico - Aula 04 

Atividade prática de **Programação Web I** - UNIVEST.
Evolução do projeto das Aulas 02 (HTML semântico) e 03 (formulários), agora com **CSS externo**.

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

## Aula 02 - HTML semântico
Todas as páginas usam `header`, `nav`, `main`, `section`, `article`, `aside` (na página inicial) e `footer`,
com `lang="pt-BR"`, `charset`, `viewport` e hierarquia de títulos (`h1` > `h2` > `h3`).

## Aula 03 - Formulários
`form` (action/method), `fieldset` + `legend`, `label` associado ao `id` do campo, tipos de `input`
adequados (`text`, `email`, `password`, `number`, `date`, `radio`), `select`/`option`, `textarea`,
botões `submit` e `reset` e validação nativa (`required`, `minlength`, `maxlength`, `min`, `max`, `pattern`).

## Aula 04 - CSS3
O `css/style.css` está organizado em 7 blocos: configurações gerais, tipografia, cabeçalho e navegação,
conteúdo e cards, formulários, botões e rodapé.

| Requisito | Onde |
|---|---|
| CSS externo | `css/style.css`, ligado via `<link>` em todas as páginas |
| Seletor universal | `* { box-sizing: border-box; }` |
| Seletor por elemento | `body`, `header`, `nav`, `main`, `form`, `footer`... |
| Seletor por classe | `.card`, `.aviso`, `.link-acao`, `.botao-secundario`, `.opcao` |
| Seletor por ID | `#dashboard h2` |
| Seletor descendente | `nav a`, `#dashboard h2`, `.card p` |
| Agrupamento | `h1, h2, h3` e `input, select, textarea` |
| Herança | `font-family` e `color` herdados do `body` |
| Cascata | `.botao-secundario` declarado depois de `button` |
| Especificidade | `.card p` vence `article p` |
| Box Model | `margin`, `padding`, `border`, `width`, `box-sizing` |

Nesta etapa não foram usados Flexbox, Grid, Media Queries, JavaScript, DOM, LocalStorage nem React.
