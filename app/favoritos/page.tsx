"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const produtos = [
  {
    id: 1,
    nome: "jaqueta vintage",
    categoria: "roupas",
    preco: "R$ 220",
    imagem: "/produtos/jaqueta.png",
    estado: "ótimo estado",
  },
  {
    id: 2,
    nome: "bolsa vintage",
    categoria: "acessórios",
    preco: "R$ 790",
    imagem: "/produtos/bolsa.png",
    estado: "muito bom, com desgastinho natural do couro",
  },
  {
    id: 3,
    nome: "tricô rosa",
    categoria: "roupas",
    preco: "R$ 470",
    imagem: "/produtos/tricot.png",
    estado: "ótimo estado",
  },
];

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const favoritosSalvos = localStorage.getItem("reuse-favoritos");

    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos));
    }

    setCarregando(false);
  }, []);

  function removerFavorito(id: number) {
    const novosFavoritos = favoritos.filter(
      (favoritoId) => favoritoId !== id
    );

    setFavoritos(novosFavoritos);

    localStorage.setItem(
      "reuse-favoritos",
      JSON.stringify(novosFavoritos)
    );
  }

  const produtosFavoritos = produtos.filter((produto) =>
    favoritos.includes(produto.id)
  );

  return (
    <main className="favoritos-page">
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

      <section className="favoritos-hero">
        <span className="eyebrow">
          as coisinhas que você guardou
        </span>

        <div className="hero-grid">
          <h1>
            seus
            <br />
            queridinhos.
          </h1>

          <div className="hero-texto">
            <span>♡</span>

            <p>
              aquele cantinho pra guardar os achadinhos que
              fizeram você pensar “hmmm talvez eu precise disso”.
            </p>
          </div>
        </div>
      </section>

      <section className="favoritos-conteudo">
        {!carregando && produtosFavoritos.length > 0 ? (
          <>
            <div className="favoritos-topo">
              <p>
                <strong>{produtosFavoritos.length}</strong>{" "}
                {produtosFavoritos.length === 1
                  ? "queridinho salvo"
                  : "queridinhos salvos"}
              </p>

              <span>guardadinhos por aqui ♡</span>
            </div>

            <div className="favoritos-grid">
              {produtosFavoritos.map((produto) => (
                <article
                  className="favorito-card"
                  key={produto.id}
                >
                  <Link
                    href={`/produtos/${produto.id}`}
                    className="favorito-link"
                  >
                    <div className="favorito-imagem">
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                      />

                      <span className="favorito-categoria">
                        {produto.categoria}
                      </span>
                    </div>

                    <div className="favorito-info">
                      <div>
                        <h2>{produto.nome}</h2>
                        <p>{produto.estado}</p>
                      </div>

                      <strong>{produto.preco}</strong>
                    </div>
                  </Link>

                  <button
                    type="button"
                    className="remover"
                    onClick={() =>
                      removerFavorito(produto.id)
                    }
                    aria-label={`remover ${produto.nome} dos favoritos`}
                  >
                    ♥
                  </button>
                </article>
              ))}
            </div>
          </>
        ) : !carregando ? (
          <div className="favoritos-vazio">
            <div className="coracao">♡</div>

            <span className="eyebrow">
              ainda tá vazio por aqui
            </span>

            <h2>
              nenhum
              <br />
              queridinho ainda.
            </h2>

            <p>
              vai dar uma voltinha pelo garimpo e salva as
              coisinhas que fizerem seu olho brilhar.
            </p>

            <Link href="/produtos">
              procurar achadinhos →
            </Link>
          </div>
        ) : null}
      </section>

      <section className="favoritos-banner">
        <div className="sticker amarelo">
          viu.
          <br />
          gostou.
        </div>

        <div className="banner-centro">
          <span className="eyebrow">
            guardar também é escolher
          </span>

          <h2>
            deixa aqui
            <br />
            pra depois.
          </h2>
        </div>

        <div className="sticker verde">
          salvou
          <br />♡
        </div>
      </section>

      <footer>
        <strong>ReUse!</strong>
        <span>são paulo, brasil — 2026</span>
        <span>moda circular. impacto real.</span>
      </footer>

      <style jsx>{`
        .favoritos-page {
          min-height: 100vh;
          background: var(--cream);
        }

        .favoritos-hero {
          padding: 7rem 5vw 5rem;
          border-bottom: 1px solid rgba(23, 23, 20, 0.2);
        }

        .hero-grid {
          margin-top: 1rem;
          display: grid;
          grid-template-columns: 1.5fr 0.5fr;
          gap: 4rem;
          align-items: end;
        }

        .favoritos-hero h1 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(5rem, 10vw, 11rem);
          font-weight: 500;
          line-height: 0.78;
          letter-spacing: -0.08em;
        }

        .hero-texto {
          max-width: 360px;
          padding-bottom: 1rem;
        }

        .hero-texto span {
          display: block;
          margin-bottom: 1rem;
          font-family: Georgia, serif;
          font-size: 4rem;
        }

        .hero-texto p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .favoritos-conteudo {
          min-height: 600px;
          padding: 4rem 5vw 8rem;
          background: var(--paper);
        }

        .favoritos-topo {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          border-bottom: 1px solid rgba(23, 23, 20, 0.2);
          font-size: 0.72rem;
          font-weight: 800;
        }

        .favoritos-topo p {
          margin: 0;
        }

        .favoritos-topo strong {
          font-size: 1rem;
        }

        .favoritos-grid {
          display: grid;
          grid-template-columns: repeat(
            3,
            minmax(0, 1fr)
          );
          gap: 3rem 1.5rem;
        }

        .favorito-card {
          position: relative;
        }

        .favorito-link {
          display: block;
        }

        .favorito-imagem {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: var(--cream);
        }

        .favorito-imagem img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .favorito-card:hover
          .favorito-imagem
          img {
          transform: scale(1.035);
        }

        .favorito-categoria {
          position: absolute;
          left: 16px;
          bottom: 16px;
          padding: 0.5rem 0.7rem;
          background: var(--paper);
          font-size: 0.62rem;
          font-weight: 900;
        }

        .favorito-info {
          padding-top: 1rem;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .favorito-info h2 {
          margin: 0;
          font-size: 1rem;
        }

        .favorito-info p {
          margin: 0.3rem 0 0;
          font-size: 0.8rem;
          opacity: 0.5;
        }

        .favorito-info strong {
          white-space: nowrap;
        }

        .remover {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 2;
          width: 44px;
          height: 44px;
          border: 1px solid var(--black);
          border-radius: 50%;
          background: var(--pink);
          color: var(--black);
          cursor: pointer;
          font-size: 1.35rem;
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .remover:hover {
          background: var(--yellow);
          transform: rotate(-8deg);
        }

        .favoritos-vazio {
          min-height: 500px;
          max-width: 850px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
        }

        .coracao {
          margin-bottom: 1rem;
          font-family: Georgia, serif;
          font-size: 5rem;
        }

        .favoritos-vazio h2 {
          margin: 1rem 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(4rem, 8vw, 8rem);
          font-weight: 500;
          line-height: 0.8;
          letter-spacing: -0.07em;
        }

        .favoritos-vazio p {
          max-width: 430px;
          margin: 2rem auto 0;
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .favoritos-vazio a {
          margin-top: 2rem;
          padding: 1rem 1.4rem;
          border: 1px solid var(--black);
          background: var(--black);
          color: var(--cream);
          font-size: 0.72rem;
          font-weight: 900;
        }

        .favoritos-vazio a:hover {
          background: var(--red);
        }

        .favoritos-banner {
          min-height: 600px;
          padding: 6rem 5vw;
          display: grid;
          grid-template-columns: 0.7fr 1.6fr 0.7fr;
          gap: 2rem;
          align-items: center;
          overflow: hidden;
          background: var(--lilac);
        }

        .banner-centro {
          text-align: center;
        }

        .banner-centro h2 {
          margin: 1rem 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(5rem, 9vw, 10rem);
          font-weight: 500;
          line-height: 0.8;
          letter-spacing: -0.07em;
        }

        .sticker {
          padding: 2rem;
          font-size: clamp(1.8rem, 3vw, 3rem);
          font-weight: 900;
          line-height: 0.9;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
        }

        .amarelo {
          background: var(--yellow);
          color: var(--red);
          transform: rotate(-8deg);
        }

        .verde {
          background: var(--olive);
          color: var(--paper);
          transform: rotate(8deg);
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }

          .favoritos-grid {
            grid-template-columns: 1fr;
          }

          .favoritos-banner {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .sticker {
            width: fit-content;
            margin: auto;
          }
        }

        @media (max-width: 600px) {
          .favoritos-hero,
          .favoritos-conteudo,
          .favoritos-banner {
            padding-left: 6vw;
            padding-right: 6vw;
          }

          .favoritos-hero h1 {
            font-size: clamp(
              4.5rem,
              20vw,
              7rem
            );
          }

          .favoritos-topo {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}