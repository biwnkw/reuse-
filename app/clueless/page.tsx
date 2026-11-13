
"use client";

import { useState } from "react";
import Link from "next/link";

type Mensagem = {
  id: number;
  autor: "bot" | "usuario";
  texto: string;
};

type Etapa = "ocasiao" | "estilo" | "resultado";

const ocasioes = [
  "trabalho",
  "faculdade",
  "encontro",
  "passeio",
  "evento especial",
];

const estilos = [
  "casual",
  "elegante",
  "romântico",
  "streetwear",
  "minimalista",
];

const combinacoes: Record<string, string[]> = {
  trabalho: [
    "camisa de alfaiataria",
    "calça reta",
    "mocassim ou sapatilha",
  ],
  faculdade: [
    "camiseta básica",
    "jeans vintage",
    "tênis confortável",
  ],
  encontro: [
    "blusa delicada",
    "saia midi ou calça de cintura alta",
    "sapato de sua preferência",
  ],
  passeio: [
    "tricô leve",
    "jeans de modelagem ampla",
    "bolsa de segunda mão",
  ],
  "evento especial": [
    "peça de alfaiataria",
    "acessório vintage",
    "sapato que você já tenha",
  ],
};

export default function CluelessPage() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: 1,
      autor: "bot",
      texto:
        "oi, fashion lover! eu sou a clueless, sua assistente de estilo da reuse. vamos montar um look incrível sem precisar comprar tudo de novo?",
    },
    {
      id: 2,
      autor: "bot",
      texto: "me conta, qual é a ocasião de hoje?",
    },
  ]);

  const [etapa, setEtapa] = useState<Etapa>("ocasiao");
  const [ocasiao, setOcasiao] = useState("");
  const [estilo, setEstilo] = useState("");
  const [entrada, setEntrada] = useState("");

  function adicionarMensagens(
    novas: { autor: "bot" | "usuario"; texto: string }[]
  ) {
    setMensagens((anteriores) => [
      ...anteriores,
      ...novas.map((mensagem, indice) => ({
        ...mensagem,
        id: Date.now() + indice,
      })),
    ]);
  }

  function escolherOpcao(opcao: string) {
    if (etapa === "ocasiao") {
      setOcasiao(opcao);
      setEtapa("estilo");

      adicionarMensagens([
        { autor: "usuario", texto: opcao },
        {
          autor: "bot",
          texto:
            "amei! agora me diz qual estética combina mais com você hoje?",
        },
      ]);
      return;
    }

    if (etapa === "estilo") {
      setEstilo(opcao);
      setEtapa("resultado");

      const pecas = combinacoes[ocasiao];

      adicionarMensagens([
        { autor: "usuario", texto: opcao },
        {
          autor: "bot",
          texto: `perfeito! para ${ocasiao}, eu montaria uma base com ${pecas[0]}, ${pecas[1]} e ${pecas[2]}.`,
        },
        {
          autor: "bot",
          texto: `para deixar o look mais ${opcao}, aposte nos detalhes e nas cores que você gosta. antes de comprar, olha o que já existe no seu guarda-roupa. o segredo é reinventar, não acumular!`,
        },
        {
          autor: "bot",
          texto:
            "quer descobrir peças para complementar essa combinação? dá uma olhada no catálogo da reuse!",
        },
      ]);
    }
  }

  function enviarMensagem(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const texto = entrada.trim();

    if (!texto) return;

    setEntrada("");

    if (etapa !== "resultado") {
      const opcoes = etapa === "ocasiao" ? ocasioes : estilos;
      const encontrada = opcoes.find(
        (opcao) => opcao.toLowerCase() === texto.toLowerCase()
      );

      if (encontrada) {
        escolherOpcao(encontrada);
      } else {
        adicionarMensagens([
          { autor: "usuario", texto },
          {
            autor: "bot",
            texto:
              "amei sua ideia! para começar, escolhe uma das opções aqui embaixo. assim consigo montar sua combinação.",
          },
        ]);
      }
      return;
    }

    const textoNormalizado = texto.toLowerCase();

    let resposta =
      "adorei conversar sobre moda com você! se quiser montar outra combinação, clique em começar de novo.";

    if (
      textoNormalizado.includes("sustent") ||
      textoNormalizado.includes("reuse") ||
      textoNormalizado.includes("reutil")
    ) {
      resposta =
        "moda circular é dar novas possibilidades às peças que já existem. trocar, reutilizar e combinar roupas ajuda a reduzir o desperdício.";
    } else if (
      textoNormalizado.includes("cor") ||
      textoNormalizado.includes("combina")
    ) {
      resposta =
        "uma dica é escolher uma cor principal, uma neutra e uma terceira para os detalhes. experimente também combinações com roupas que você já tem.";
    } else if (
      textoNormalizado.includes("comprar") ||
      textoNormalizado.includes("produto") ||
      textoNormalizado.includes("roupa")
    ) {
      resposta =
        "antes de procurar outra peça, confira seu closet. se faltar alguma coisa, você pode explorar o catálogo da reuse e priorizar itens de segunda mão.";
    }

    adicionarMensagens([
      { autor: "usuario", texto },
      { autor: "bot", texto: resposta },
    ]);
  }

  function reiniciar() {
    setMensagens([
      {
        id: 1,
        autor: "bot",
        texto:
          "voltou! vamos criar uma combinação diferente? qual é a ocasião?",
      },
    ]);
    setEtapa("ocasiao");
    setOcasiao("");
    setEstilo("");
    setEntrada("");
  }

  const opcoesAtuais =
    etapa === "ocasiao"
      ? ocasioes
      : etapa === "estilo"
      ? estilos
      : [];

  return (
    <main className="min-h-screen bg-[#f3ede1] px-4 py-8 text-[#171714] md:py-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-semibold hover:underline"
          >
            ← voltar para reuse
          </Link>

          <span className="rounded-full bg-[#c9afe5] px-4 py-2 text-xs font-bold">
            reuse studio
          </span>
        </header>

        <section className="mb-8">
          <span className="text-sm font-medium text-[#53643b]">
            seu closet digital
          </span>

          <h1 className="mt-2 text-6xl font-black tracking-tighter md:text-8xl">
            clueless<span className="text-[#ef6f91]">.</span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed">
            looks novos, roupas nem tanto. descubra como transformar
            o que você já tem em combinações cheias de personalidade.
          </p>
        </section>

        <section className="overflow-hidden rounded-3xl border-2 border-[#171714] bg-[#faf7f0] shadow-[7px_7px_0px_#171714]">
          <div className="flex items-center justify-between bg-[#c9afe5] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171714] text-xl font-bold text-white">
                c.
              </div>

              <div>
                <h2 className="font-bold">clueless assistant</h2>
                <p className="text-xs">sua consultora de estilo circular</p>
              </div>
            </div>

            <span className="rounded-full bg-[#faf7f0] px-3 py-1 text-xs">
              online
            </span>
          </div>

          <div
            aria-live="polite"
            className="flex h-[390px] flex-col gap-4 overflow-y-auto p-5 md:p-7"
          >
            {mensagens.map((mensagem) => (
              <div
                key={mensagem.id}
                className={`flex ${
                  mensagem.autor === "usuario"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                    mensagem.autor === "usuario"
                      ? "bg-[#171714] text-white"
                      : "bg-[#e9e2f3] text-[#171714]"
                  }`}
                >
                  {mensagem.texto}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#ded6ca] px-5 py-5">
            {opcoesAtuais.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {opcoesAtuais.map((opcao) => (
                  <button
                    key={opcao}
                    type="button"
                    onClick={() => escolherOpcao(opcao)}
                    className="rounded-full border border-[#171714] bg-white px-4 py-2 text-sm transition hover:bg-[#ef6f91]"
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={enviarMensagem}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={entrada}
                onChange={(evento) => setEntrada(evento.target.value)}
                placeholder="escreva sua mensagem..."
                aria-label="mensagem para clueless"
                className="min-w-0 flex-1 rounded-full border border-[#171714] bg-white px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#c9afe5]"
              />

              <button
                type="submit"
                className="rounded-full bg-[#171714] px-5 py-3 text-sm font-semibold text-white hover:bg-[#53643b]"
              >
                enviar
              </button>
            </form>
          </div>
        </section>

        {etapa === "resultado" && (
          <section className="mt-7 rounded-3xl bg-[#e8b63f] p-6">
            <p className="text-xs font-bold uppercase tracking-widest">
              seu look do dia
            </p>

            <h2 className="mt-2 text-2xl font-black">
              {ocasiao} + {estilo}
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {combinacoes[ocasiao].map((peca) => (
                <div
                  key={peca}
                  className="rounded-xl bg-[#faf7f0] p-4 text-sm font-medium"
                >
                  {peca}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/produtos"
                className="rounded-full bg-[#171714] px-5 py-3 text-sm font-semibold text-white"
              >
                explorar produtos
              </Link>

              <button
                type="button"
                onClick={reiniciar}
                className="rounded-full border border-[#171714] px-5 py-3 text-sm font-semibold"
              >
                montar outro look
              </button>
            </div>
          </section>
        )}

        <footer className="mt-10 text-center text-xs text-[#5a4737]">
          reuse © 2026 | coisas boas merecem outra chance
        </footer>
      </div>
    </main>
  );
}
