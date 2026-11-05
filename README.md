# Portfólio de Lucca de Oliveira Silva

Site estático com meu resumo, competências, projetos, experiência e formação, e o currículo em PDF para download.

Site publicado: **<https://yluccaz27.github.io/Portfolio/>**

## Stack

- HTML, CSS e JavaScript puros, sem framework, build ou dependências.
- As únicas requisições externas são as fontes do Google Fonts (IM Fell Double Pica e Alegreya Sans).
- Os projetos vêm de `data/projects.json` e o `assets/js/main.js` monta a seção.
- Publicado no GitHub Pages por um workflow do GitHub Actions.

## Rodar localmente

O navegador não carrega `data/projects.json` quando o `index.html` é aberto direto do disco (`file://`). Use um servidor local na raiz do repositório:

```bash
python -m http.server 8000
```

Depois abra <http://localhost:8000>. Qualquer outro servidor estático serve, por exemplo `npx serve`.

## Estrutura

```
index.html                     página única com todas as seções
assets/css/style.css           estilos (paleta, tipografia e layout)
assets/js/main.js              lê data/projects.json e monta os projetos
assets/img/                    favicon e imagens dos projetos
data/projects.json             lista de projetos (único arquivo a editar)
cv/                            currículo em PDF para download e LEIA-ME
.github/workflows/deploy.yml   publicação automática no GitHub Pages
TEMPLATE-README-PROJETO.md     modelo de README para os outros repositórios
CLAUDE.md                      regras de conteúdo, privacidade e design do site
```

Só `index.html`, `assets/`, `data/` e o PDF do currículo vão para o site. Os outros arquivos ficam apenas no repositório.

## Adicionar um projeto

Edite só o `data/projects.json`. Cada item da lista `projetos` vira um estudo de caso. Não é preciso mexer no HTML.

```json
{
  "id": "nome-curto-sem-espaco",
  "nome": "Nome do projeto",
  "destaque": false,
  "contexto": "Projeto pessoal",
  "problema": "O que resolve e por que fiz.",
  "oQueFaz": "O que o projeto faz, em uma ou duas frases.",
  "stack": ["Python", "Flask"],
  "decisoes": ["O que escolhi, o que descartei e por quê."],
  "diagrama": {
    "src": "assets/img/projetos/arquivo.svg",
    "alt": "Descrição do diagrama para leitores de tela",
    "legenda": "Texto abaixo do diagrama",
    "largura": 360,
    "altura": 900
  },
  "comoRodar": "git clone ...\ncd ...\npython main.py",
  "aprendizados": ["..."],
  "proximosPassos": ["..."],
  "links": { "repositorio": "https://github.com/...", "demo": "" },
  "avisoRepositorio": "Repositório privado por enquanto.",
  "imagens": [{ "src": "assets/img/projetos/tela.webp", "alt": "...", "legenda": "...", "largura": 1200, "altura": 750 }]
}
```

Regras:

- Só `id` e `nome` são obrigatórios. Todo campo vazio ou ausente é omitido na página, sem texto genérico no lugar.
- `"destaque": true` mostra o projeto como fólio completo, com todos os campos abertos. Os demais entram como registros compactos, com o estudo de caso recolhido em "Ver estudo de caso".
- Texto entre crases (`` `app.py` ``) aparece formatado como código.
- A ordem na página segue a ordem do arquivo.
- Imagens: use `.webp` ou `.svg`, com no máximo 1600 px de largura, em `assets/img/projetos/`. Informe `largura` e `altura` para evitar que a página "pule" ao carregar.
- Antes de usar um print, confira se não aparece IP, senha, token, nome de usuário ou caminho privado.
- O deploy valida o JSON. Uma vírgula sobrando faz a publicação falhar sem derrubar o site no ar.

## Currículo em PDF

O arquivo publicado é `cv/curriculo-lucca-oliveira-silva.pdf`. Ele fica público para download, com tudo o que estiver nele, por isso não leva telefone nem endereço. Se o arquivo não existir, os botões de download ficam escondidos.

Qualquer outro PDF em `cv/` é ignorado pelo git (`.gitignore`) e não vai para o site. Assim, um rascunho com dados pessoais não é publicado por engano.

## Deploy

A cada push na branch `main`, o workflow `.github/workflows/deploy.yml`:

1. valida o `data/projects.json`;
2. copia só os arquivos do site (`index.html`, `assets`, `data` e o PDF de `cv`) para `_site`;
3. publica `_site` no GitHub Pages.

O workflow também pode ser rodado à mão em Actions → "Publicar no GitHub Pages" → Run workflow.

Configuração do repositório: ele precisa ser público (no plano gratuito, o Pages não publica repositórios privados) e, em Settings → Pages → Source, a opção escolhida é **GitHub Actions**. Todos os caminhos do site são relativos, então ele funciona no subcaminho `/Portfolio/` sem ajuste.

Para o site ficar na raiz (`https://yluccaz27.github.io`), renomeie o repositório para `yluccaz27.github.io` em Settings → General e atualize o remote:

```bash
git remote set-url origin https://github.com/yluccaz27/yluccaz27.github.io.git
```

## Atualizar o site

1. Edite o conteúdo: projetos no `data/projects.json`, o resto no `index.html`.
2. Rode localmente e confira no desktop e na largura de celular (375px), sem rolagem horizontal.
3. Rode o Lighthouse (performance, acessibilidade e boas práticas).
4. Faça commits pequenos, com mensagens em português, e envie para a `main`. O deploy roda sozinho.

As regras de texto, privacidade e design estão no [CLAUDE.md](CLAUDE.md).
