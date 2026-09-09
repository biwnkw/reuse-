"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const produtos = [
  {
    id: 1,
    nome: "jaqueta vintage",
    categoria: "roupas",
    preco: "R$ 220",
    imagem: "/produtos/jaqueta.png",
    descricao:
      "jaqueta vintage colorida, leve e cheia de personalidade. uma peça boa dessas merece continuar circulando por aí.",
    estado: "ótimo estado",
    tamanho: "M",
    marca: "vintage",
    vendedor: "bia.reuse",
    localizacao: "são paulo, sp",
  },
  {
    id: 2,
    nome: "bolsa vintage",
    categoria: "acessórios",
    preco: "R$ 790",
    imagem: "/produtos/bolsa.png",
    descricao:
      "bolsa vintage preta, clássica e fácil de usar com tudo. tem um desgastinho natural do couro, mas continua linda.",
    estado: "muito bom",
    tamanho: "único",
    marca: "vintage",
    vendedor: "bia.reuse",
    localizacao: "são paulo, sp",
  },
  {
    id: 3,
    nome: "tricô rosa",
    categoria: "roupas",
    preco: "R$ 470",
    imagem: "/produtos/tricot.png",
    descricao:
      "tricô rosa vibrante, com textura marcante e aquela cara de achadinho que deixa qualquer look mais divertido.",
    estado: "ótimo estado",
    tamanho: "M",
    marca: "sem marca",
    vendedor: "bia.reuse",
    localizacao: "são paulo, sp",
  },
];

export default function ProdutoPage() {
  const params = useParams();
  const id = Number(params.id);

  const produtoEncontrado = produtos.find(
    (item) => item.id === id
  );

  const [favoritos, setFavoritos] = useState<number[]>([]);

  useEffect(() => {
    const favoritosSalvos = localStorage.getItem(
      "reuse-favoritos"
    );

    if (favoritosSalvos) {
      setFavoritos(JSON.parse(favoritosSalvos));
    }
  }, []);

  if (!produtoEncontrado) {
    return (
      <main className="produto-nao-encontrado">
        <h1>esse achadinho sumiu :(</h1>

        <Link href="/produtos">
          voltar pro garimpo →
        </Link>

        <style jsx>{`
          .produto-nao-encontrado {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 2rem;
            background: var(--cream);
          }

          h1 {
            font-family: Georgia, "Times New Roman", serif;
            font-size: clamp(3rem, 7vw, 7rem);
            font-weight: 500;
            letter-spacing: -0.06em;
            text-align: center;
          }

          a {
            padding: 1rem 1.4rem;
            background: var(--black);
            color: var(--cream);
            font-weight: 900;
          }
        `}</style>
      </main>
    );
  }

  const produto = produtoEncontrado;
  const estaFavoritado = favoritos.includes(produto.id);

  function alternarFavorito() {
    const produtoId = produto.id;

    const novosFavoritos = favoritos.includes(produtoId)
      ? favoritos.filter(
          (favoritoId) => favoritoId !== produtoId
        )
      : [...favoritos, produtoId];

    setFavoritos(novosFavoritos);

    localStorage.setItem(
      "reuse-favoritos",
      JSON.stringify(novosFavoritos)
    );
  }

  return (
    <main className="produto-detalhe-page">
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

      <section className="produto-detalhe">
        <div className="produto-foto-area">
          <Link href="/produtos" className="voltar">
            ← voltar pro garimpo
          </Link>

          <div className="produto-foto">
            <img
              src={produto.imagem}
              alt={produto.nome}
            />

            <span className="produto-categoria">
              {produto.categoria}
            </span>
          </div>
        </div>

        <div className="produto-conteudo">
          <div className="produto-topo">
            <span className="eyebrow">
              achadinho ReUse!
            </span>

            <button
              type="button"
              className={`favoritar ${
                estaFavoritado ? "favoritado" : ""
              }`}
              aria-label={
                estaFavoritado
                  ? `remover ${produto.nome} dos favoritos`
                  : `favoritar ${produto.nome}`
              }
              onClick={alternarFavorito}
            >
              {estaFavoritado ? "♥" : "♡"}
            </button>
          </div>

          <h1>{produto.nome}</h1>

          <p className="produto-preco">
            {produto.preco}
          </p>

          <p className="produto-descricao">
            {produto.descricao}
          </p>

          <div className="produto-dados">
            <div className="produto-dado">
              <span>estado</span>
              <strong>{produto.estado}</strong>
            </div>

            <div className="produto-dado">
              <span>tamanho</span>
              <strong>{produto.tamanho}</strong>
            </div>

            <div className="produto-dado">
              <span>marca</span>
              <strong>{produto.marca}</strong>
            </div>
          </div>

          <button
            type="button"
            className="comprar"
          >
            quero esse achadinho →
          </button>

          <div className="vendedor">
            <div className="vendedor-avatar">
              b
            </div>

            <div>
              <span>vendido por</span>
              <strong>
                @{produto.vendedor}
              </strong>
              <p>{produto.localizacao}</p>
            </div>
          </div>

          <div className="impacto">
            <span>✦</span>

            <div>
              <strong>
                uma coisinha boa continuando a
                circular.
              </strong>

              <p>
                comprar usado ajuda produtos que
                ainda têm muita vida pela frente a
                encontrarem uma nova história.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="produto-manifesto">
        <div className="manifesto-card manifesto-card-pink">
          use
          <br />
          de novo.
        </div>

        <div className="manifesto-centro">
          <span className="eyebrow">
            second hand / first choice
          </span>

          <h2>
            coisa boa
            <br />
            merece outra vida.
          </h2>
        </div>

        <div className="manifesto-card manifesto-card-green">
          re-
          <br />
          love.
        </div>
      </section>

      <footer>
        <strong>ReUse!</strong>
        <span>são paulo, brasil — 2026</span>
        <span>moda circular. impacto real.</span>
      </footer>

      <style jsx>{`
        .produto-detalhe-page {
          min-height: 100vh;
          background: var(--cream);
        }

        .produto-detalhe {
          padding: 5rem 5vw 8rem;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 6rem;
          align-items: start;
        }

        .produto-foto-area {
          min-width: 0;
        }

        .voltar {
          display: inline-block;
          margin-bottom: 1.5rem;
          padding-bottom: 0.3rem;
          border-bottom: 1px solid transparent;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .voltar:hover {
          border-color: var(--black);
        }

        .produto-foto {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: var(--paper);
        }

        .produto-foto img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .produto-categoria {
          position: absolute;
          left: 18px;
          bottom: 18px;
          padding: 0.6rem 0.8rem;
          background: var(--paper);
          font-size: 0.68rem;
          font-weight: 900;
        }

        .produto-conteudo {
          padding-top: 3rem;
        }

        .produto-topo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .favoritar {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--black);
          border-radius: 50%;
          background: transparent;
          color: var(--black);
          cursor: pointer;
          font-size: 1.6rem;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .favoritar:hover,
        .favoritar.favoritado {
          background: var(--pink);
        }

        .favoritar:hover {
          transform: rotate(-8deg);
        }

        .produto-conteudo h1 {
          margin: 1.2rem 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(4rem, 7vw, 8rem);
          font-weight: 500;
          line-height: 0.88;
          letter-spacing: -0.07em;
        }

        .produto-preco {
          margin: 2rem 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 2rem;
          font-weight: 700;
        }

        .produto-descricao {
          max-width: 570px;
          margin: 2rem 0 0;
          font-size: 1rem;
          line-height: 1.8;
          opacity: 0.78;
        }

        .produto-dados {
          margin-top: 2.5rem;
          display: grid;
          grid-template-columns: repeat(
            3,
            1fr
          );
          border-top: 1px solid
            rgba(23, 23, 20, 0.2);
          border-bottom: 1px solid
            rgba(23, 23, 20, 0.2);
        }

        .produto-dado {
          padding: 1.5rem 1rem 1.5rem 0;
        }

        .produto-dado:not(:last-child) {
          border-right: 1px solid
            rgba(23, 23, 20, 0.2);
        }

        .produto-dado:not(:first-child) {
          padding-left: 1rem;
        }

        .produto-dado span {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.62rem;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .produto-dado strong {
          font-size: 0.9rem;
        }

        .comprar {
          width: 100%;
          margin-top: 2rem;
          padding: 1.3rem;
          border: 1px solid var(--black);
          background: var(--black);
          color: var(--cream);
          cursor: pointer;
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .comprar:hover {
          background: var(--red);
          transform: translateY(-2px);
        }

        .vendedor {
          margin-top: 3rem;
          padding: 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-top: 1px solid
            rgba(23, 23, 20, 0.2);
          border-bottom: 1px solid
            rgba(23, 23, 20, 0.2);
        }

        .vendedor-avatar {
          width: 55px;
          height: 55px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--olive);
          color: var(--paper);
          font-family: Georgia, serif;
          font-size: 1.5rem;
          font-style: italic;
          font-weight: 700;
        }

        .vendedor span {
          display: block;
          margin-bottom: 0.25rem;
          font-size: 0.58rem;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .vendedor strong {
          display: block;
          font-size: 0.9rem;
        }

        .vendedor p {
          margin: 0.25rem 0 0;
          font-size: 0.78rem;
          opacity: 0.55;
        }

        .impacto {
          margin-top: 2rem;
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          background: var(--yellow);
        }

        .impacto > span {
          font-size: 2rem;
        }

        .impacto strong {
          display: block;
          margin-bottom: 0.4rem;
        }

        .impacto p {
          margin: 0;
          font-size: 0.82rem;
          line-height: 1.6;
        }

        .produto-manifesto {
          min-height: 600px;
          padding: 6rem 5vw;
          display: grid;
          grid-template-columns:
            0.7fr 1.6fr 0.7fr;
          gap: 2rem;
          align-items: center;
          background: var(--pink);
          overflow: hidden;
        }

        .manifesto-centro {
          text-align: center;
        }

        .manifesto-centro h2 {
          margin: 1rem 0 0;
          color: var(--red);
          font-family: Georgia,
            "Times New Roman", serif;
          font-size: clamp(
            4rem,
            8vw,
            9rem
          );
          font-weight: 500;
          line-height: 0.85;
          letter-spacing: -0.07em;
        }

        .manifesto-card {
          padding: 2rem;
          font-size: clamp(
            1.8rem,
            3vw,
            3rem
          );
          font-weight: 900;
          line-height: 0.9;
          box-shadow: 0 18px 40px
            rgba(0, 0, 0, 0.12);
        }

        .manifesto-card-pink {
          background: var(--yellow);
          color: var(--red);
          transform: rotate(-8deg);
        }

        .manifesto-card-green {
          background: var(--olive);
          color: var(--paper);
          transform: rotate(8deg);
        }

        @media (max-width: 900px) {
          .produto-detalhe {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .produto-conteudo {
            padding-top: 0;
          }

          .produto-manifesto {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .manifesto-card {
            width: fit-content;
            margin: auto;
          }
        }

        @media (max-width: 600px) {
          .produto-detalhe,
          .produto-manifesto {
            padding-left: 6vw;
            padding-right: 6vw;
          }

          .produto-conteudo h1 {
            font-size: clamp(
              3.8rem,
              17vw,
              6rem
            );
          }

          .produto-dados {
            grid-template-columns: 1fr;
          }

          .produto-dado:not(:last-child) {
            border-right: none;
            border-bottom: 1px solid
              rgba(23, 23, 20, 0.2);
          }

          .produto-dado:not(:first-child) {
            padding-left: 0;
          }

          .manifesto-centro h2 {
            font-size: clamp(
              4rem,
              19vw,
              7rem
            );
          }
        }
      `}</style>
    </main>
  );
}