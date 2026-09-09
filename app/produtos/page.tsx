"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const produtos = [
  {
    id: 1,
    nome: "jaqueta vintage",
    categoria: "roupas",
    preco: 220,
    precoFormatado: "R$ 220",
    imagem: "/produtos/jaqueta.png",
    alt: "jaqueta vintage colorida",
    estado: "ótimo estado",
  },
  {
    id: 2,
    nome: "bolsa vintage",
    categoria: "acessórios",
    preco: 790,
    precoFormatado: "R$ 790",
    imagem: "/produtos/bolsa.png",
    alt: "bolsa vintage preta",
    estado: "muito bom, com desgastinho natural do couro",
  },
  {
    id: 3,
    nome: "tricô rosa",
    categoria: "roupas",
    preco: 470,
    precoFormatado: "R$ 470",
    imagem: "/produtos/tricot.png",
    alt: "tricô rosa",
    estado: "ótimo estado",
  },
];

const categorias = ["todos", "roupas", "acessórios"];

export default function ProdutosPage() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("recentes");
  const [favoritos, setFavoritos] = useState<number[]>([]);

  useEffect(() => {
    const favoritosSalvos = localStorage.getItem("reuse-favoritos");

    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos));
    }
  }, []);

  function alternarFavorito(id: number) {
    const novosFavoritos = favoritos.includes(id)
      ? favoritos.filter((favoritoId) => favoritoId !== id)
      : [...favoritos, id];

    setFavoritos(novosFavoritos);

    localStorage.setItem(
      "reuse-favoritos",
      JSON.stringify(novosFavoritos)
    );
  }

  const produtosFiltrados = useMemo(() => {
    let resultado = produtos.filter((produto) => {
      const correspondeBusca = produto.nome
        .toLowerCase()
        .includes(busca.toLowerCase());

      const correspondeCategoria =
        categoria === "todos" ||
        produto.categoria.toLowerCase() === categoria.toLowerCase();

      return correspondeBusca && correspondeCategoria;
    });

    if (ordenacao === "menor") {
      resultado = [...resultado].sort((a, b) => a.preco - b.preco);
    }

    if (ordenacao === "maior") {
      resultado = [...resultado].sort((a, b) => b.preco - a.preco);
    }

    return resultado;
  }, [busca, categoria, ordenacao]);

  return (
    <main className="explorar-page">
      <header className="topbar">
        <Link href="/" className="brand">
          ReUse!
        </Link>

        <nav>
          <Link href="/">início</Link>
          <Link href="/produtos">explorar</Link>
          <Link href="/favoritos">favoritos</Link>
          <Link href="/perfil">perfil</Link>
        </nav>
      </header>

      <section className="explorar-hero">
        <div>
          <span className="eyebrow">garimpo digital</span>

          <h1>
            encontre coisinhas
            <br />
            boas de novo =)
          </h1>
        </div>

        <div className="explorar-intro">
          <p>
            roupas, acessórios e outras coisinhas esperando uma nova história.
            comprar usado também é escolher com mais intenção.
          </p>

          <span className="rabisco">✦</span>
        </div>
      </section>

      <section className="explorar-tools">
        <div className="search-area">
          <label htmlFor="busca">buscar no garimpo</label>

          <div className="search-box">
            <input
              id="busca"
              type="text"
              placeholder="jaqueta, bolsa, tricô..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />

            <span>⌕</span>
          </div>
        </div>

        <div className="filter-area">
          <span className="filter-label">categorias</span>

          <div className="category-buttons">
            {categorias.map((item) => (
              <button
                key={item}
                type="button"
                className={categoria === item ? "active" : ""}
                onClick={() => setCategoria(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="sort-area">
          <label htmlFor="ordenacao">ordenar</label>

          <select
            id="ordenacao"
            value={ordenacao}
            onChange={(event) => setOrdenacao(event.target.value)}
          >
            <option value="recentes">mais recentes</option>
            <option value="menor">menor preço</option>
            <option value="maior">maior preço</option>
          </select>
        </div>
      </section>

      <section className="catalogo">
        <div className="catalogo-header">
          <p>
            <strong>{produtosFiltrados.length}</strong>{" "}
            {produtosFiltrados.length === 1 ? "achadinho" : "achadinhos"}
          </p>

          <span>second hand / first choice</span>
        </div>

        {produtosFiltrados.length > 0 ? (
          <div className="explorar-grid">
            {produtosFiltrados.map((produto, index) => {
              const estaFavoritado = favoritos.includes(produto.id);

              return (
                <article className="explorar-card" key={produto.id}>
                  <Link
                    href={`/produtos/${produto.id}`}
                    className="produto-link"
                  >
                    <div className="explorar-image">
                      <img src={produto.imagem} alt={produto.alt} />

                      <span className="explorar-tag">
                        {produto.categoria}
                      </span>

                      {index === 0 && (
                        <span className="new-tag">
                          chegou agorinha
                        </span>
                      )}
                    </div>

                    <div className="explorar-product-info">
                      <div>
                        <h2>{produto.nome}</h2>
                        <p>{produto.estado}</p>
                      </div>

                      <strong>{produto.precoFormatado}</strong>
                    </div>
                  </Link>

                  <button
                    className={`favorite-button ${
                      estaFavoritado ? "favoritado" : ""
                    }`}
                    type="button"
                    aria-label={
                      estaFavoritado
                        ? `remover ${produto.nome} dos favoritos`
                        : `favoritar ${produto.nome}`
                    }
                    onClick={() => alternarFavorito(produto.id)}
                  >
                    {estaFavoritado ? "♥" : "♡"}
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="sem-resultados">
            <span>✦</span>

            <h2>nada por aqui :(</h2>

            <p>tenta procurar outra coisinha ou mudar a categoria.</p>

            <button
              type="button"
              onClick={() => {
                setBusca("");
                setCategoria("todos");
                setOrdenacao("recentes");
              }}
            >
              limpar filtros →
            </button>
          </div>
        )}
      </section>

      <section className="explorar-banner">
        <div className="banner-sticker banner-yellow">
          compre
          <br />
          menos.
        </div>

        <div className="banner-copy">
          <span className="eyebrow">
            re-use / re-wear / re-love
          </span>

          <h2>
            escolha
            <br />
            melhor.
          </h2>
        </div>

        <div className="banner-sticker banner-green">
          use
          <br />
          mais.
        </div>
      </section>

      <section className="vender-section">
        <div>
          <span className="eyebrow">
            tem algo paradinho aí?
          </span>

          <h2>
            seu desapego pode ser
            <br />
            o próximo achadinho.
          </h2>
        </div>

        <Link href="/cadastrar">desapegar →</Link>
      </section>

      <footer>
        <strong>ReUse!</strong>
        <span>são paulo, brasil — 2026</span>
        <span>moda circular. impacto real.</span>
      </footer>

      <style jsx>{`
        .explorar-page {
          min-height: 100vh;
          background: var(--cream);
        }

        .explorar-hero {
          min-height: 520px;
          padding: 7rem 5vw 5rem;
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          gap: 4rem;
          align-items: end;
          border-bottom: 1px solid rgba(23, 23, 20, 0.2);
        }

        .explorar-hero h1 {
          margin: 1.2rem 0 0;
          max-width: 950px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(4rem, 8vw, 9rem);
          font-weight: 500;
          line-height: 0.85;
          letter-spacing: -0.075em;
        }

        .explorar-intro {
          position: relative;
          padding-bottom: 1rem;
        }

        .explorar-intro p {
          max-width: 420px;
          margin: 0;
          font-size: 1rem;
          line-height: 1.7;
        }

        .rabisco {
          position: absolute;
          right: 10%;
          top: -100px;
          font-family: Georgia, serif;
          font-size: 5rem;
          transform: rotate(15deg);
        }

        .explorar-tools {
          padding: 2.5rem 5vw;
          display: grid;
          grid-template-columns: 1.2fr 1fr 0.5fr;
          gap: 2rem;
          align-items: end;
          background: var(--paper);
          border-bottom: 1px solid rgba(23, 23, 20, 0.15);
        }

        .search-area label,
        .sort-area label,
        .filter-label {
          display: block;
          margin-bottom: 0.8rem;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .search-box {
          display: flex;
          align-items: center;
          border-bottom: 2px solid var(--black);
        }

        .search-box input {
          width: 100%;
          padding: 0.85rem 0;
          border: 0;
          outline: none;
          background: transparent;
          color: var(--black);
          font: inherit;
          font-size: 1rem;
        }

        .search-box input::placeholder {
          color: rgba(23, 23, 20, 0.4);
        }

        .search-box span {
          font-size: 1.8rem;
        }

        .category-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .category-buttons button {
          padding: 0.75rem 1rem;
          border: 1px solid var(--black);
          background: transparent;
          color: var(--black);
          cursor: pointer;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: lowercase;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease;
        }

        .category-buttons button:hover {
          transform: translateY(-2px);
        }

        .category-buttons button.active {
          background: var(--black);
          color: var(--cream);
        }

        .sort-area select {
          width: 100%;
          padding: 0.85rem;
          border: 1px solid var(--black);
          border-radius: 0;
          outline: none;
          background: var(--cream);
          color: var(--black);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .catalogo {
          padding: 4rem 5vw 8rem;
        }

        .catalogo-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          border-bottom: 1px solid rgba(23, 23, 20, 0.2);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: lowercase;
        }

        .catalogo-header p {
          margin: 0;
        }

        .catalogo-header strong {
          font-size: 1rem;
        }

        .explorar-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 3rem 1.5rem;
        }

        .explorar-card {
          position: relative;
          min-width: 0;
          cursor: pointer;
        }

        .produto-link {
          display: block;
        }

        .explorar-image {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: var(--paper);
        }

        .explorar-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.45s ease;
        }

        .explorar-card:hover .explorar-image img {
          transform: scale(1.035);
        }

        .favorite-button {
          position: absolute;
          right: 16px;
          top: 16px;
          z-index: 3;
          width: 44px;
          height: 44px;
          border: 1px solid var(--black);
          border-radius: 50%;
          background: var(--paper);
          color: var(--black);
          cursor: pointer;
          font-size: 1.45rem;
          line-height: 1;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .favorite-button:hover {
          background: var(--pink);
          transform: rotate(-8deg);
        }

        .favorite-button.favoritado {
          background: var(--pink);
        }

        .explorar-tag,
        .new-tag {
          position: absolute;
          padding: 0.5rem 0.7rem;
          font-size: 0.62rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: lowercase;
        }

        .explorar-tag {
          left: 16px;
          bottom: 16px;
          background: var(--paper);
        }

        .new-tag {
          left: 16px;
          top: 16px;
          background: var(--yellow);
          color: var(--red);
          transform: rotate(-3deg);
        }

        .explorar-product-info {
          padding-top: 1rem;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .explorar-product-info h2 {
          margin: 0;
          font-size: 1rem;
        }

        .explorar-product-info p {
          margin: 0.3rem 0 0;
          font-size: 0.8rem;
          opacity: 0.5;
        }

        .explorar-product-info strong {
          white-space: nowrap;
        }

        .sem-resultados {
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
        }

        .sem-resultados > span {
          font-size: 3rem;
        }

        .sem-resultados h2 {
          margin: 1rem 0 0.5rem;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 3rem;
          font-weight: 500;
        }

        .sem-resultados p {
          margin: 0;
          opacity: 0.65;
        }

        .sem-resultados button {
          margin-top: 2rem;
          padding: 1rem 1.5rem;
          border: 1px solid var(--black);
          background: var(--black);
          color: var(--cream);
          cursor: pointer;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: lowercase;
        }

        .explorar-banner {
          min-height: 600px;
          padding: 6rem 5vw;
          display: grid;
          grid-template-columns: 0.7fr 1.6fr 0.7fr;
          align-items: center;
          gap: 2rem;
          overflow: hidden;
          background: var(--pink);
        }

        .banner-copy {
          text-align: center;
        }

        .banner-copy h2 {
          margin: 1rem 0 0;
          color: var(--red);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(5rem, 9vw, 10rem);
          font-weight: 500;
          line-height: 0.8;
          letter-spacing: -0.07em;
        }

        .banner-sticker {
          padding: 2rem;
          font-size: clamp(1.8rem, 3vw, 3rem);
          font-weight: 900;
          line-height: 0.9;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
        }

        .banner-yellow {
          background: var(--yellow);
          color: var(--red);
          transform: rotate(-8deg);
        }

        .banner-green {
          background: var(--olive);
          color: var(--paper);
          transform: rotate(7deg);
        }

        .vender-section {
          padding: 7rem 5vw;
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 3rem;
          background: var(--cream);
        }

        .vender-section h2 {
          margin: 1rem 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3rem, 5vw, 6rem);
          font-weight: 500;
          line-height: 0.95;
          letter-spacing: -0.05em;
        }

        .vender-section a {
          padding: 1rem 1.4rem;
          border: 1px solid var(--black);
          background: var(--black);
          color: var(--cream);
          white-space: nowrap;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: lowercase;
        }

        .vender-section a:hover {
          background: var(--red);
        }

        @media (max-width: 900px) {
          .explorar-hero {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .explorar-tools {
            grid-template-columns: 1fr;
          }

          .explorar-grid {
            grid-template-columns: 1fr;
          }

          .explorar-banner {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .banner-sticker {
            width: fit-content;
            margin: auto;
          }

          .vender-section {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 600px) {
          .explorar-hero,
          .explorar-tools,
          .catalogo,
          .explorar-banner,
          .vender-section {
            padding-left: 6vw;
            padding-right: 6vw;
          }

          .explorar-hero h1 {
            font-size: clamp(4rem, 17vw, 6rem);
          }

          .rabisco {
            display: none;
          }

          .catalogo-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .banner-copy h2 {
            font-size: clamp(4.5rem, 20vw, 7rem);
          }
        }
      `}</style>
    </main>
  );
}