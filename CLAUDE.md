# CLAUDE.md: regras do portfólio

Portfólio de Lucca de Oliveira Silva, dev júnior de backend Python (Flask, SQLAlchemy) e Oracle (SQL/PL-SQL). Site estático, publicado no GitHub Pages por `.github/workflows/deploy.yml`. Conteúdo em português do Brasil.

Público: um recrutador, que pode não ser técnico, precisa entender em 1 minuto quem é o Lucca, o que ele sabe fazer e o que já construiu. Quem é técnico precisa achar evidência de como ele pensa. Vagas alvo: backend Python júnior, automação com Python, full stack júnior. O site é um hub para GitHub, LinkedIn, currículo e estudos de caso: rápido, simples e legível, sem showcase de efeitos.

## Regras de conteúdo

- Não invente números, métricas, resultados, tecnologias nem links. Sem dado, deixe de fora ou pergunte ao Lucca. Nada de tempo de resposta, usuários ou ganhos inventados.
- Cada afirmação precisa ser verificável no currículo ou nos repositórios. Para decisões técnicas de um projeto, leia o código, não só o README: onde os dois divergem, vale o código.
- Fundação Hemominas: nada de código, nome de sistema ou de tela, dados ou detalhes internos. Ela aparece só na experiência, em termos gerais ("sistema interno de gestão de processos jurídicos").
- Não publique telefone nem endereço, nem no HTML nem no PDF em `cv/`.
- Proibido: frases de efeito ("apaixonado por tecnologia", "transformando ideias em código"), adjetivos vazios, emoji decorativo.
- Texto curto e específico, em voz ativa e sentence case.

## Projetos

- Fonte única: `data/projects.json`. Adicionar um projeto é só editar esse arquivo, sem mexer no HTML.
- Formato do estudo de caso, na ordem: Problema, O que faz, Stack, Decisões técnicas e trade-offs, Diagrama, Como rodar, Aprendizados, Próximos passos, Links e imagens.
- Campo sem informação fica fora do JSON (ou vazio) e não gera nada na página. Nunca preencha com texto genérico.
- `"destaque": true` vira o fólio completo (hoje só o RPG Legends). Os demais são registros compactos de livro-razão.
- Texto entre crases vira `<code>`.

## Regras de design

- Conceito: um códice encadernado em couro escuro, com texto em velino e notas na margem. A informação segue a lógica do livro, não do jogo.
- Paleta (tokens em `:root` no CSS):
  - fundo `#1E1414`
  - texto `#E6DCC8`
  - links e iniciais `#B8964E`
  - stack e foco do teclado `#5E8C7E`
  - texto secundário `#8C8073`, só em texto de 16px ou mais
  - filetes `#3A2B28`
- Fontes: IM Fell Double Pica só em h1, h2 e h3 (nunca em texto pequeno). Alegreya Sans em todo o resto, inclusive nos rótulos h4.
- Layout: no desktop (a partir de 60em), corpo à esquerda e coluna de anotações (datas, stack, contexto) à direita, no componente `.registro` com `.corpo` e `.nota`. No celular, a nota vem logo acima do bloco. Sem hero centralizado, e a página fica deslocada à esquerda.
- O RPG Legends ocupa um fólio inteiro, com inicial em latão. Os outros projetos são registros compactos.
- Movimento: só a inicial do fólio "entintando" ao carregar, desligada com `prefers-reduced-motion`. Nenhuma outra animação de entrada.
- Evitar: gradiente roxo/azul, Inter/Roboto/Arial, três cards iguais, emoji decorativo, glassmorphism, sombras e bordas arredondadas idênticas em tudo, rótulos em caixa alta, "→" em botões e links.
- Qualidade mínima: mobile first, tema escuro, contraste de pelo menos 4,5:1 em todo texto, foco visível, navegação por teclado, `alt` em toda imagem, sem rolagem horizontal em 375px.
- Performance: sem framework e sem dependências além do Google Fonts. Imagens em `.webp` ou `.svg`, com `width` e `height`. Meta de carregamento abaixo de 3 segundos.

## Como trabalhar aqui

- Rodar local: `python -m http.server 8000` na raiz e abrir <http://localhost:8000>.
- Antes de publicar, confira no tamanho de celular (375px) e rode o Lighthouse (performance, acessibilidade e boas práticas).
- Commits pequenos, com mensagens claras em português.
