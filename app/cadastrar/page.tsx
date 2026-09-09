"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function CadastrarPage() {
  const [enviado, setEnviado] = useState(false);

  function cadastrarProduto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviado(true);
  }

  return (
    <main className="cadastro-page">
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

      <section className="cadastro-hero">
        <span className="eyebrow">hora de desapegar</span>

        <h1>
          passa
          <br />
          pra frente.
        </h1>

        <p>
          aquela coisinha parada pode virar o próximo achadinho
          de alguém.
        </p>
      </section>

      <section className="cadastro-area">
        {!enviado ? (
          <form onSubmit={cadastrarProduto}>
            <div className="campo campo-grande">
              <label htmlFor="nome">o que você tá desapegando?</label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="ex: jaqueta vintage"
                required
              />
            </div>

            <div className="linha">
              <div className="campo">
                <label htmlFor="categoria">categoria</label>
                <select id="categoria" name="categoria" required>
                  <option value="">escolhe uma</option>
                  <option value="roupas">roupas</option>
                  <option value="acessorios">acessórios</option>
                  <option value="objetos">objetos</option>
                  <option value="outros">outras coisinhas</option>
                </select>
              </div>

              <div className="campo">
                <label htmlFor="preco">precinho</label>
                <input
                  id="preco"
                  name="preco"
                  type="number"
                  placeholder="R$"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="linha">
              <div className="campo">
                <label htmlFor="estado">estado da peça</label>
                <select id="estado" name="estado" required>
                  <option value="">como ela tá?</option>
                  <option value="novo">novinha</option>
                  <option value="otimo">ótimo estado</option>
                  <option value="bom">bom estado</option>
                  <option value="usado">usadinha, mas ainda boa</option>
                </select>
              </div>

              <div className="campo">
                <label htmlFor="tamanho">tamanho</label>
                <input
                  id="tamanho"
                  name="tamanho"
                  type="text"
                  placeholder="ex: M"
                />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="descricao">conta um pouquinho sobre ela</label>
              <textarea
                id="descricao"
                name="descricao"
                placeholder="estado, história, detalhes..."
                rows={6}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="imagem">foto da coisinha</label>
              <input id="imagem" name="imagem" type="file" accept="image/*" />
            </div>

            <button type="submit">colocar no garimpo →</button>
          </form>
        ) : (
          <div className="sucesso">
            <span>✦</span>

            <h2>
              prontinho,
              <br />
              tá no garimpo =)
            </h2>

            <p>
              sua coisinha ganhou a chance de encontrar uma nova história.
            </p>

            <Link href="/produtos">ver o garimpo →</Link>
          </div>
        )}
      </section>

      <footer>
        <strong>ReUse!</strong>
        <span>são paulo, brasil — 2026</span>
        <span>moda circular. impacto real.</span>
      </footer>

      <style jsx>{`
        .cadastro-page {
          min-height: 100vh;
          background: var(--cream);
        }

        .cadastro-hero {
          padding: 7rem 5vw 5rem;
          border-bottom: 1px solid rgba(23, 23, 20, 0.2);
        }

        .cadastro-hero h1 {
          margin: 1rem 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(5rem, 10vw, 11rem);
          font-weight: 500;
          line-height: 0.75;
          letter-spacing: -0.08em;
        }

        .cadastro-hero p {
          max-width: 450px;
          margin: 3rem 0 0 auto;
          line-height: 1.7;
        }

        .cadastro-area {
          padding: 6rem 5vw 8rem;
          background: var(--paper);
        }

        form {
          max-width: 900px;
          margin: auto;
        }

        .linha {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .campo {
          margin-bottom: 2.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.8rem;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        input,
        select,
        textarea {
          width: 100%;
          padding: 1rem 0;
          border: 0;
          border-bottom: 1px solid var(--black);
          border-radius: 0;
          outline: 0;
          background: transparent;
          color: var(--black);
          font: inherit;
        }

        textarea {
          resize: vertical;
        }

        form button,
        .sucesso a {
          display: inline-block;
          margin-top: 1rem;
          padding: 1.2rem 1.6rem;
          border: 1px solid var(--black);
          background: var(--black);
          color: var(--cream);
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 900;
        }

        form button:hover,
        .sucesso a:hover {
          background: var(--red);
        }

        .sucesso {
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
        }

        .sucesso > span {
          font-size: 4rem;
        }

        .sucesso h2 {
          margin: 1rem 0;
          font-family: Georgia, serif;
          font-size: clamp(4rem, 8vw, 8rem);
          font-weight: 500;
          line-height: 0.8;
          letter-spacing: -0.07em;
        }

        .sucesso p {
          max-width: 430px;
          line-height: 1.7;
        }

        @media (max-width: 700px) {
          .linha {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>
    </main>
  );
}