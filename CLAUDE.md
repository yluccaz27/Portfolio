# CLAUDE.md: regras do portfólio

Portfólio de Lucca de Oliveira Silva, dev júnior de backend Python (Flask, SQLAlchemy) e Oracle (SQL/PL-SQL). Site estático em uma página só, com conteúdo em português do Brasil.

Público: um recrutador, que pode não ser técnico, precisa entender em 1 minuto quem é o Lucca, o que ele sabe fazer e o que já construiu. Quem é técnico precisa achar evidência de como ele pensa. Vagas alvo: backend Python júnior, automação com Python, full stack júnior. O site é um hub para GitHub, LinkedIn, currículo e estudos de caso: rápido, simples e legível, sem showcase de efeitos.

## Publicação

- Repositório: <https://github.com/yluccaz27/Portfolio>. Site: <https://yluccaz27.github.io/Portfolio/>.
- O GitHub Pages publica pelo workflow `.github/workflows/deploy.yml` a cada push na `main` (ou à mão, em Actions). O workflow valida o `data/projects.json` com `python3 -m json.tool`, copia para `_site` só `index.html`, `assets/`, `data/` e `cv/curriculo-lucca-oliveira-silva.pdf` e publica essa pasta.
- README, CLAUDE.md, `TEMPLATE-README-PROJETO.md` e `cv/LEIA-ME.md` ficam no repositório, mas não vão para o site.
- Todos os caminhos são relativos (`assets/...`, `data/...`), porque o site roda no subcaminho `/Portfolio/`. Nunca use caminho começando com `/`.

## Estrutura

```
index.html                     página única: sobre, competências, projetos, experiência, formação, contato
assets/css/style.css           todo o CSS (tokens, layout, componentes)
assets/js/main.js              monta a seção de projetos a partir do JSON e esconde o botão do PDF se ele faltar
assets/img/favicon.svg         favicon
assets/img/projetos/           diagramas e imagens dos projetos
data/projects.json             fonte única dos projetos
cv/curriculo-lucca-oliveira-silva.pdf   currículo para download (o único PDF versionado)
cv/LEIA-ME.md                  instrução sobre o PDF
.github/workflows/deploy.yml   deploy no GitHub Pages
TEMPLATE-README-PROJETO.md     modelo de README para os outros repositórios
```

## Stack e convenções de código

- HTML, CSS e JavaScript puros. Sem framework, sem build, sem npm e sem dependência além do Google Fonts.
- Nomes de classes, funções, variáveis e tokens em português, ligados ao conceito do livro (`.registro`, `.corpo`, `.nota`, `.folio`, `.livro-razao`, `.lancamento`, `el`, `rico`, `folio`, `lancamento`).
- `main.js`: um IIFE com `"use strict"`, `var` e funções no estilo ES5. O DOM é montado com `createElement` e `textContent` pela função `el()`. Nunca use `innerHTML` com conteúdo do JSON.
- Em `main.js`, campo ausente ou vazio não gera elemento (`temTexto`, `temLista`). Mantenha isso ao criar campos novos.
- Se o JSON falhar, a página mostra um aviso com link para o GitHub. A seção também tem `<noscript>`.

## CSS

- Tokens em `:root` no `style.css`. Use sempre o token, nunca a cor solta:
  - `--couro` `#1E1414`: fundo
  - `--velino` `#E6DCC8`: texto
  - `--latao` `#B8964E`: links e iniciais
  - `--verdete` `#5E8C7E`: stack e foco do teclado
  - `--tinta` `#8C8073`: texto secundário, só em texto de 16px ou mais
  - `--costura` `#3A2B28`: filetes
  - `--couro-claro` `#271A19`: fundo de blocos de código
- Também ficam em `:root` as fontes (`--fonte-titulo`, `--fonte-texto`, `--fonte-codigo`) e as medidas (`--texto` 18px, `--medida` 38rem, `--margem` 13rem, `--vao`, `--respiro`).
- Mobile first, com um breakpoint só: `@media (min-width: 60em)`. Não crie outros sem necessidade.
- Os SVGs em `assets/img/projetos/` usam as mesmas cores da paleta e têm `role="img"`, `<title>` e `<desc>`.

## Regras de conteúdo e tom

- Primeira pessoa, pt-BR, direto. Texto curto e específico, em voz ativa e sentence case.
- Não invente números, métricas, resultados, tecnologias nem links. Sem dado, deixe de fora ou pergunte ao Lucca. Nada de tempo de resposta, usuários ou ganhos inventados.
- Não descreva como pronto o que o Lucca ainda não confirmou.
- Cada afirmação precisa ser verificável no currículo ou nos repositórios. Para decisões técnicas de um projeto, leia o código, não só o README: onde os dois divergem, vale o código.
- Proibido: frases de efeito ("apaixonado por tecnologia", "transformando ideias em código"), adjetivos inflados ("robusto", "revolucionário"), adjetivos vazios, emoji decorativo.

## Privacidade

- Fundação Hemominas: nada de código, nome de sistema, módulo ou tela, dados ou detalhes internos, nem no site nem no PDF. Ela aparece só na experiência, em termos gerais ("sistema interno de gestão de processos jurídicos").
- Podem aparecer: e-mail, LinkedIn, GitHub e a cidade (Belo Horizonte, MG). Não podem: telefone, endereço, documentos e dados de terceiros. Isso vale também para o PDF do currículo.
- Nunca publique IP, hostname interno, token, senha, chave de API, `.env`, `rclone.conf`, conteúdo de `secrets/` ou caminho que revele pasta ou dado privado. Confira prints antes de usar: se aparecer algum desses dados, avise o Lucca em vez de publicar.
- Rascunhos de currículo com dados pessoais ficam fora do git: o `.gitignore` ignora todo `cv/*.pdf`, exceto o currículo publicado.

## Projetos

- Fonte única: `data/projects.json`. Adicionar um projeto é só editar esse arquivo, sem mexer no HTML. Imagens e diagramas vão em `assets/img/projetos/`, em `.webp` ou `.svg`, com `largura` e `altura` no JSON.
- Só `id` e `nome` são obrigatórios. Formato do estudo de caso, na ordem: Problema, O que faz, Stack, Decisões técnicas e trade-offs, Diagrama, Como rodar, Aprendizados, Próximos passos, Links e imagens.
- Campo sem informação fica fora do JSON (ou vazio) e não gera nada na página. Nunca preencha com texto genérico.
- `"destaque": true` vira o fólio completo (hoje só o RPG Legends). Os demais são registros compactos do livro-razão, com o estudo de caso recolhido em `<details>`.
- Link de repositório só se o Lucca passar a URL. Repositório privado usa `avisoRepositorio`.
- Texto entre crases vira `<code>`.
- Tecnologia nova de um projeto entra também em "Competências" no `index.html`, sem duplicar o que já está lá.

## Regras de design

- Qualquer mudança visual (CSS, layout, componente novo, diagrama, imagem) passa pela skill `frontend-design`, mantendo as regras abaixo.
- Conceito: um códice encadernado em couro escuro, com texto em velino e notas na margem. A informação segue a lógica do livro, não do jogo.
- Fontes: IM Fell Double Pica só em h1, h2 e h3 (nunca em texto pequeno). Alegreya Sans em todo o resto, inclusive nos rótulos h4.
- Layout: no desktop (a partir de 60em), corpo à esquerda e coluna de anotações (datas, stack, contexto) à direita, no componente `.registro` com `.corpo` e `.nota`. No celular, a nota vem logo acima do bloco. Sem hero centralizado, e a página fica deslocada à esquerda.
- O RPG Legends ocupa um fólio inteiro, com inicial em latão. Os outros projetos são registros compactos.
- Movimento: só a inicial do fólio "entintando" ao carregar, desligada com `prefers-reduced-motion`. Nenhuma outra animação de entrada.
- Evitar: gradiente roxo/azul, Inter/Roboto/Arial, três cards iguais, emoji decorativo, glassmorphism, sombras e bordas arredondadas idênticas em tudo, rótulos em caixa alta, "→" em botões e links.
- Qualidade mínima: mobile first, tema escuro, contraste de pelo menos 4,5:1 em todo texto, foco visível, navegação por teclado, `alt` em toda imagem, sem rolagem horizontal em 375px.
- Performance: imagens em `.webp` ou `.svg`, com `width` e `height`. Meta de carregamento abaixo de 3 segundos.

## Como trabalhar aqui

- Rodar local: `python -m http.server 8000` na raiz e abrir <http://localhost:8000>. Abrindo o `index.html` direto do disco, os projetos não carregam.
- Antes de publicar, confira no tamanho de celular (375px) e rode o Lighthouse (performance, acessibilidade e boas práticas).
- Não faça commit nem push sem o Lucca pedir. Quando ele pedir: commits pequenos, com mensagens claras em português.
