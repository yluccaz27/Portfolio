# Portfólio de Lucca de Oliveira Silva

Site estático (HTML, CSS e JavaScript puro) com meu resumo, competências, projetos, experiência e formação. Publicado no GitHub Pages.

## Estrutura

```
index.html                     página única com todas as seções
assets/css/style.css           estilos (paleta, tipografia e layout)
assets/js/main.js              lê data/projects.json e monta os projetos
assets/img/                    favicon e imagens dos projetos
data/projects.json             lista de projetos (único arquivo a editar)
cv/                            currículo em PDF para download
.github/workflows/deploy.yml   publicação automática no GitHub Pages
TEMPLATE-README-PROJETO.md     modelo de README para os outros repositórios
CLAUDE.md                      regras de conteúdo e design do site
```

Não há build, framework nem dependências. As únicas requisições externas são as fontes do Google Fonts.

## Rodar localmente

O navegador não carrega `data/projects.json` quando o `index.html` é aberto direto do disco (`file://`). Use um servidor local na raiz do repositório:

```bash
python -m http.server 8000
```

Depois abra <http://localhost:8000>. Qualquer outro servidor estático serve, por exemplo `npx serve`.

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
- O deploy valida o JSON. Uma vírgula sobrando faz a publicação falhar sem derrubar o site no ar.

## Currículo em PDF

Coloque o arquivo em `cv/curriculo-lucca-oliveira-silva.pdf`. Ele fica público, então use uma versão sem telefone e sem endereço. Enquanto o arquivo não existir, os botões de download ficam escondidos.

## Deploy

A cada push na branch `main`, o workflow `.github/workflows/deploy.yml`:

1. valida o `data/projects.json`;
2. copia só os arquivos do site (`index.html`, `assets`, `data` e o PDF de `cv`) para `_site`;
3. publica `_site` no GitHub Pages.

O workflow também pode ser rodado à mão em Actions → "Publicar no GitHub Pages" → Run workflow.

### Configuração única no GitHub

1. Crie um repositório público chamado `yluccaz27.github.io`. Com esse nome, o site fica em `https://yluccaz27.github.io`. Com qualquer outro nome, ele fica em `https://yluccaz27.github.io/<nome-do-repo>/`, e o site funciona igual, porque todos os caminhos são relativos.
2. No repositório, abra Settings → Pages e, em "Build and deployment" → Source, escolha **GitHub Actions**. Faça isso antes do primeiro push: sem essa opção, o primeiro deploy falha. Se isso acontecer, rode o workflow de novo em Actions.
3. Envie o código:
   ```bash
   git remote add origin https://github.com/yluccaz27/yluccaz27.github.io.git
   git push -u origin main
   ```
4. Abra a aba Actions e acompanhe o primeiro deploy. O endereço do site aparece no resumo do job.
