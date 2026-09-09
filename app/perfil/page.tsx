import Link from "next/link";

export default function PerfilPage() {
  return (
    <main className="perfil-page">
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

      <section className="perfil-hero">
        <span className="eyebrow">meu cantinho</span>

        <h1>
          oi,
          <br />
          bia =)
        </h1>

        <p>
          seus desapegos, seus achadinhos e um pouquinho da sua
          história por aqui.
        </p>
      </section>

      <section className="perfil-conteudo">
        <div className="perfil-card">
          <div className="avatar">b</div>

          <div>
            <span className="mini">perfil</span>
            <h2>bia.reuse</h2>
            <p>são paulo, brasil</p>
          </div>
        </div>

        <div className="perfil-numeros">
          <div>
            <strong>03</strong>
            <span>desapegos</span>
          </div>

          <div>
            <strong>♡</strong>
            <span>favoritos</span>
          </div>

          <div>
            <strong>01</strong>
            <span>nova história</span>
          </div>
        </div>

        <div className="perfil-acoes">
          <Link href="/cadastrar" className="acao-principal">
            desapegar uma coisinha →
          </Link>

          <Link href="/favoritos" className="acao-secundaria">
            ver meus queridinhos
          </Link>
        </div>
      </section>

      <section className="perfil-banner">
        <div className="adesivo">
          re-
          <br />
          use.
        </div>

        <div>
          <span className="eyebrow">menos coisa parada</span>
          <h2>
            mais histórias
            <br />
            circulando.
          </h2>
        </div>
      </section>

      <footer>
        <strong>ReUse!</strong>
        <span>são paulo, brasil — 2026</span>
        <span>moda circular. impacto real.</span>
      </footer>

      <style>{`
        .perfil-page {
          min-height: 100vh;
          background: var(--cream);
        }

        .perfil-hero {
          padding: 7rem 5vw 5rem;
          border-bottom: 1px solid rgba(23, 23, 20, 0.2);
        }

        .perfil-hero h1 {
          margin: 1rem 0 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(5rem, 11vw, 12rem);
          font-weight: 500;
          line-height: 0.75;
          letter-spacing: -0.08em;
        }

        .perfil-hero p {
          max-width: 460px;
          margin: 3rem 0 0 auto;
          font-size: 1rem;
          line-height: 1.7;
        }

        .perfil-conteudo {
          padding: 5rem 5vw 8rem;
          background: var(--paper);
        }

        .perfil-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .avatar {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--pink);
          font-family: Georgia, serif;
          font-size: 3rem;
          font-style: italic;
        }

        .mini {
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .perfil-card h2 {
          margin: 0.4rem 0 0;
          font-family: Georgia, serif;
          font-size: 2.5rem;
          font-weight: 500;
        }

        .perfil-card p {
          margin: 0.3rem 0 0;
          opacity: 0.55;
        }

        .perfil-numeros {
          margin-top: 4rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--black);
          border-bottom: 1px solid var(--black);
        }

        .perfil-numeros div {
          padding: 2rem;
        }

        .perfil-numeros div:not(:last-child) {
          border-right: 1px solid var(--black);
        }

        .perfil-numeros strong {
          display: block;
          font-family: Georgia, serif;
          font-size: 3rem;
          font-weight: 500;
        }

        .perfil-numeros span {
          display: block;
          margin-top: 0.4rem;
          font-size: 0.75rem;
        }

        .perfil-acoes {
          margin-top: 3rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .perfil-acoes a {
          padding: 1rem 1.4rem;
          border: 1px solid var(--black);
          font-size: 0.75rem;
          font-weight: 900;
        }

        .acao-principal {
          background: var(--black);
          color: var(--cream);
        }

        .acao-principal:hover {
          background: var(--red);
        }

        .acao-secundaria {
          background: transparent;
          color: var(--black);
        }

        .perfil-banner {
          min-height: 500px;
          padding: 6rem 5vw;
          display: grid;
          grid-template-columns: 0.6fr 1.4fr;
          gap: 4rem;
          align-items: center;
          background: var(--lilac);
        }

        .perfil-banner h2 {
          margin: 1rem 0 0;
          font-family: Georgia, serif;
          font-size: clamp(4rem, 8vw, 9rem);
          font-weight: 500;
          line-height: 0.82;
          letter-spacing: -0.07em;
        }

        .adesivo {
          width: fit-content;
          padding: 2rem;
          background: var(--yellow);
          color: var(--red);
          font-size: 3rem;
          font-weight: 900;
          line-height: 0.85;
          transform: rotate(-7deg);
        }

        @media (max-width: 700px) {
          .perfil-numeros,
          .perfil-banner {
            grid-template-columns: 1fr;
          }

          .perfil-numeros div:not(:last-child) {
            border-right: 0;
            border-bottom: 1px solid var(--black);
          }
        }
      `}</style>
    </main>
  );
}