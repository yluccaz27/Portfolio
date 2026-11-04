// Monta a seção de projetos a partir de data/projects.json.
// Campos ausentes ou vazios no JSON não geram nenhum elemento na página.

(function () {
  "use strict";

  var ARQUIVO_PROJETOS = "data/projects.json";
  var GITHUB = "https://github.com/yluccaz27";

  // ---------- utilidades ----------

  function el(tag, attrs, filhos) {
    var no = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] === undefined || attrs[k] === null) return;
        if (k === "texto") no.textContent = attrs[k];
        else if (k === "classe") no.className = attrs[k];
        else no.setAttribute(k, attrs[k]);
      });
    }
    (filhos || []).forEach(function (f) { if (f) no.appendChild(f); });
    return no;
  }

  function temTexto(v) { return typeof v === "string" && v.trim() !== ""; }
  function temLista(v) { return Array.isArray(v) && v.some(temTexto); }
  function limpa(lista) { return lista.filter(temTexto); }

  // Texto entre crases (`assim`) vira <code>. Todo o resto entra como texto puro.
  function rico(tag, texto, attrs) {
    var no = el(tag, attrs);
    texto.split("`").forEach(function (parte, i) {
      if (!parte) return;
      no.appendChild(i % 2 ? el("code", { texto: parte }) : document.createTextNode(parte));
    });
    return no;
  }

  function lista(itens, classe) {
    return el("ul", { classe: classe }, limpa(itens).map(function (t) {
      return rico("li", t);
    }));
  }

  function titulo(texto) { return el("h4", { texto: texto }); }

  // ---------- blocos de cada campo ----------

  function blocoNota(p, rotuloExtra) {
    var filhos = [];
    var contexto = limpa([rotuloExtra, p.contexto]).join(". ");
    if (contexto) filhos.push(el("p", { classe: "contexto", texto: contexto }));
    if (temLista(p.stack)) {
      var ul = lista(p.stack, "stack");
      ul.setAttribute("aria-label", "Stack de " + p.nome);
      filhos.push(ul);
    }
    return filhos.length ? el("div", { classe: "nota" }, filhos) : null;
  }

  function blocoDiagrama(d) {
    if (!d || !temTexto(d.src)) return null;
    return el("figure", { classe: "diagrama" }, [
      el("img", { src: d.src, alt: d.alt || "", loading: "lazy", decoding: "async",
                  width: d.largura, height: d.altura }),
      temTexto(d.legenda) ? el("figcaption", { texto: d.legenda }) : null
    ]);
  }

  function blocoImagens(imagens) {
    if (!Array.isArray(imagens)) return [];
    return imagens.filter(function (i) { return i && temTexto(i.src); }).map(function (i) {
      return el("figure", { classe: "imagem-projeto" }, [
        el("img", { src: i.src, alt: i.alt || "", loading: "lazy", decoding: "async",
                    width: i.largura, height: i.altura }),
        temTexto(i.legenda) ? el("figcaption", { texto: i.legenda }) : null
      ]);
    });
  }

  function blocoLinks(p) {
    var links = p.links || {};
    var itens = [];
    if (temTexto(links.repositorio)) {
      itens.push(el("li", null, [el("a", { href: links.repositorio, texto: "Repositório no GitHub" })]));
    }
    if (temTexto(links.demo)) {
      itens.push(el("li", null, [el("a", { href: links.demo, texto: "Abrir demo" })]));
    }
    var filhos = [];
    if (itens.length) filhos.push(el("ul", { classe: "links-projeto", "aria-label": "Links de " + p.nome }, itens));
    if (temTexto(p.avisoRepositorio)) filhos.push(el("p", { classe: "aviso-repo", texto: p.avisoRepositorio }));
    return filhos;
  }

  // Campos do estudo de caso, na ordem do formato padrão.
  function camposEstudo(p, opcoes) {
    var out = [];
    if (opcoes.incluirProblema && temTexto(p.problema)) {
      out.push(titulo("Problema"), rico("p", p.problema));
    }
    if (opcoes.incluirOQueFaz && temTexto(p.oQueFaz)) {
      out.push(titulo("O que faz"), rico("p", p.oQueFaz));
    }
    if (temLista(p.decisoes)) {
      out.push(titulo("Decisões técnicas e trade-offs"), lista(p.decisoes, "decisoes"));
    }
    var diagrama = blocoDiagrama(p.diagrama);
    if (diagrama) out.push(titulo("Diagrama"), diagrama);
    if (temTexto(p.comoRodar)) {
      out.push(titulo("Como rodar"), el("pre", null, [el("code", { texto: p.comoRodar.trim() })]));
    }
    if (temLista(p.aprendizados)) out.push(titulo("Aprendizados"), lista(p.aprendizados));
    if (temLista(p.proximosPassos)) out.push(titulo("Próximos passos"), lista(p.proximosPassos));
    out = out.concat(blocoImagens(p.imagens));
    return out;
  }

  // ---------- fólio (projeto em destaque) ----------

  function folio(p) {
    var idTitulo = "projeto-" + p.id;
    var corpo = el("div", { classe: "corpo" }, [el("h3", { id: idTitulo, texto: p.nome })]);
    camposEstudo(p, { incluirProblema: true, incluirOQueFaz: true }).forEach(function (n) {
      corpo.appendChild(n);
    });
    blocoLinks(p).forEach(function (n) { corpo.appendChild(n); });

    // Inicial em latão no primeiro parágrafo do estudo de caso
    var primeiro = corpo.querySelector("p");
    if (primeiro) primeiro.classList.add("capitular");

    return el("article", { classe: "folio", "aria-labelledby": idTitulo }, [
      el("div", { classe: "registro" }, [blocoNota(p, "Projeto principal"), corpo])
    ]);
  }

  // ---------- lançamento do livro-razão (projeto compacto) ----------

  function lancamento(p) {
    var idTitulo = "projeto-" + p.id;
    var corpo = el("div", { classe: "corpo" }, [el("h3", { id: idTitulo, texto: p.nome })]);
    if (temTexto(p.oQueFaz)) corpo.appendChild(rico("p", p.oQueFaz));

    var estudo = camposEstudo(p, { incluirProblema: true, incluirOQueFaz: false });
    if (estudo.length) {
      corpo.appendChild(el("details", null, [el("summary", { texto: "Ver estudo de caso" })].concat(estudo)));
    }
    blocoLinks(p).forEach(function (n) { corpo.appendChild(n); });

    return el("li", { classe: "lancamento" }, [
      el("article", { classe: "registro", "aria-labelledby": idTitulo }, [blocoNota(p), corpo])
    ]);
  }

  // ---------- montagem ----------

  function renderizar(projetos, alvo) {
    var validos = projetos.filter(function (p) { return p && temTexto(p.id) && temTexto(p.nome); });
    var destaques = validos.filter(function (p) { return p.destaque === true; });
    var demais = validos.filter(function (p) { return p.destaque !== true; });

    var frag = document.createDocumentFragment();
    destaques.forEach(function (p) { frag.appendChild(folio(p)); });
    if (demais.length) {
      frag.appendChild(el("ul", { classe: "livro-razao", "aria-label": "Outros projetos" }, demais.map(lancamento)));
    }
    alvo.textContent = "";
    alvo.appendChild(frag);

    // A seção cresceu depois do carregamento: refaz o salto para a âncora da URL.
    if (location.hash) {
      var destino = document.getElementById(location.hash.slice(1));
      if (destino) {
        var pular = function () { destino.scrollIntoView({ behavior: "instant", block: "start" }); };
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(pular);
        else pular();
      }
    }
  }

  function falha(alvo, erro) {
    console.error("Não foi possível carregar " + ARQUIVO_PROJETOS + ":", erro);
    alvo.textContent = "";
    var p = el("p", { classe: "aviso", texto: "Os projetos não carregaram. Os repositórios estão em " });
    p.appendChild(el("a", { href: GITHUB, texto: "github.com/yluccaz27" }));
    p.appendChild(document.createTextNode("."));
    alvo.appendChild(p);
  }

  function carregarProjetos() {
    var alvo = document.getElementById("lista-projetos");
    if (!alvo) return;
    fetch(ARQUIVO_PROJETOS)
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (dados) {
        var projetos = Array.isArray(dados) ? dados : dados.projetos;
        if (!Array.isArray(projetos)) throw new Error("o JSON precisa ter a lista \"projetos\"");
        renderizar(projetos, alvo);
      })
      .catch(function (e) { falha(alvo, e); });
  }

  // Esconde os botões de currículo enquanto o PDF não estiver no repositório.
  function conferirCurriculo() {
    var links = document.querySelectorAll("[data-curriculo]");
    if (!links.length || location.protocol === "file:") return;
    fetch(links[0].getAttribute("href"), { method: "HEAD" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); })
      .catch(function () {
        links.forEach(function (a) { (a.closest("li") || a).hidden = true; });
      });
  }

  carregarProjetos();
  conferirCurriculo();
})();
