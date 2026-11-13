
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
          <Link href="/clueless">Clueless ✦</Link>
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

                <span className="product-tag">
                  {produto.categoria}
                </span>
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

      <section
        style={{
          backgroundColor: "#c9afe5",
          padding: "80px 24px",
          color: "#171714",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          <div style={{ flex: "1 1 350px" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: "#171714",
                color: "#ffffff",
                padding: "9px 16px",
                borderRadius: "30px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              CONHEÇA SUA NOVA BESTIE
            </span>

            <h2
              style={{
                fontSize: "clamp(56px, 9vw, 110px)",
                fontWeight: 900,
                letterSpacing: "-5px",
                lineHeight: 1,
                marginTop: "25px",
                marginBottom: "24px",
              }}
            >
              clueless<span style={{ color: "#ef6f91" }}>.</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(19px, 2vw, 26px)",
                fontWeight: 600,
                lineHeight: 1.4,
                maxWidth: "560px",
              }}
            >
              sem ideia do que vestir?
              <br />
              deixa que a gente pensa junto.
            </p>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                maxWidth: "480px",
                marginTop: "18px",
                marginBottom: "32px",
              }}
            >
              sua consultora de estilo circular chegou.
              descubra combinações, reinvente seu closet
              e encontre novas possibilidades para suas roupas.
              porque estilo de verdade não precisa de desperdício.
            </p>

            <Link
              href="/clueless"
              style={{
                display: "inline-block",
                backgroundColor: "#171714",
                color: "#ffffff",
                padding: "18px 30px",
                borderRadius: "50px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 800,
              }}
            >
              MONTAR MEU LOOK →
            </Link>
          </div>

          <div
            style={{
              flex: "1 1 280px",
              maxWidth: "390px",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                backgroundColor: "#faf7f0",
                border: "3px solid #171714",
                borderRadius: "24px",
                padding: "25px",
                boxShadow: "10px 10px 0px #171714",
                transform: "rotate(3deg)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "35px",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 800 }}>
                  clueless studio
                </span>

                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    backgroundColor: "#53643b",
                  }}
                />
              </div>

              <div
                style={{
                  backgroundColor: "#e8b63f",
                  borderRadius: "18px",
                  padding: "25px",
                  marginBottom: "18px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "55px",
                    fontWeight: 900,
                    letterSpacing: "-4px",
                  }}
                >
                  wear.
                  <br />
                  repeat.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#e9e2f3",
                  borderRadius: "15px",
                  padding: "18px",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  marginBottom: "15px",
                }}
              >
                oi, fashion lover! qual é a ocasião de hoje?
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#171714",
                    color: "#ffffff",
                    borderRadius: "20px",
                    padding: "12px 20px",
                    fontSize: "13px",
                  }}
                >
                  quero montar um look!
                </span>
              </div>

              <p
                style={{
                  marginTop: "30px",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                LESS WASTE. MORE TASTE.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="closing">
        <p className="eyebrow">RE-USE / RE-WEAR / RE-PEAT</p>

        <h2>
          ei, psiu? comprar usado
          <br />
          não é segunda opção.
        </h2>

        <Link href="/produtos">
          COMEÇAR A GARIMPAR →
        </Link>
      </section>

      <footer>
        <strong>ReUse!</strong>
        <span>São Paulo, Brasil — 2026</span>
        <span>Moda circular. Impacto real.</span>
      </footer>
    </main>
  );
}
