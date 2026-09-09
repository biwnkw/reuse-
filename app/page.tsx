import Link from "next/link";

const produtos = [
  {
    nome: "jaqueta vintage",
    categoria: "roupas",
    preco: "R$ 220",
    imagem: "/produtos/jaqueta.png",
    alt: "jaqueta vintage colorida",
  },
  {
    nome: "bolsa vintage",
    categoria: "acessórios",
    preco: "R$ 790",
    imagem: "/produtos/bolsa.png",
    alt: "bolsa vintage preta",
  },
  {
    nome: "tricô rosa",
    categoria: "roupas",
    preco: "R$ 470",
    imagem: "/produtos/tricot.png",
    alt: "tricô rosa",
  },
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <div className="brand">ReUse!</div>

        <nav>
          <Link href="/">Início</Link>
          <Link href="/produtos">Explorar</Link>
          <Link href="/favoritos">Favoritos</Link>
          <Link href="/perfil">Perfil</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">SECOND HAND, FIRST CHOICE.</span>

          <h1>
            coisinhas boas
            <br />
            merecem
            <br />
            outra vida.
          </h1>

          <p>
            moda, objetos, arte e outras coisas boas procurando uma próxima
            história.
          </p>

          <div className="hero-actions">
            <Link href="/produtos" className="button-primary">
              GARIMPAR →
            </Link>

            <Link href="/cadastrar" className="button-secondary">
              DESAPEGAR →
            </Link>
          </div>
        </div>

        <div className="hero-art">
          <div className="poster poster-pink">
            GAROTAS LEGAIS
            <br />
            USAM ROUPA
            <br />
            DE BRECHÓ.
          </div>

          <div className="poster poster-yellow">
            RE-USE
            <br />
            RE-WEAR
            <br />
            RE-LOVE
          </div>

          <div className="poster poster-green">
            MODA
            <br />
            CIRCULAR
          </div>
        </div>
      </section>

      <section className="manifesto">
        <p>menos lixo.</p>
        <p>mais estilo.</p>
        <p>mais histórias.</p>
        <p>mais reuso.</p>
      </section>

      <section className="garimpos">
        <div className="section-heading">
          <div>
            <span className="eyebrow">NOVOS NO GARIMPO</span>
            <h2>achadinhos da semana.</h2>
          </div>

          <Link href="/produtos">VER TODOS →</Link>
        </div>

        <div className="product-grid">
          {produtos.map((produto) => (
            <article className="product-card" key={produto.nome}>
              <div className="product-image">
                <img src={produto.imagem} alt={produto.alt} />

                <span className="product-tag">{produto.categoria}</span>
              </div>

              <div className="product-info">
                <div>
                  <h3>{produto.nome}</h3>
                  <p>{produto.categoria}</p>
                </div>

                <strong>{produto.preco}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="closing">
        <p className="eyebrow">RE-USE / RE-WEAR / RE-PEAT</p>

        <h2>
          ei, psiu? comprar usado
          <br />
          não é segunda opção.
        </h2>

        <Link href="/produtos">COMEÇAR A GARIMPAR →</Link>
      </section>

      <footer>
        <strong>ReUse!</strong>
        <span>São Paulo, Brasil — 2026</span>
        <span>Moda circular. Impacto real.</span>
      </footer>
    </main>
  );
}