
import { NextResponse } from "next/server";

const produtos = [
  {
    id: 1,
    nome: "jaqueta vintage",
    categoria: "roupas",
    preco: 220,
    imagem: "/produtos/jaqueta.png",
    disponivel: true,
  },
  {
    id: 2,
    nome: "bolsa vintage",
    categoria: "acessórios",
    preco: 790,
    imagem: "/produtos/bolsa.png",
    disponivel: true,
  },
  {
    id: 3,
    nome: "tricô rosa",
    categoria: "roupas",
    preco: 470,
    imagem: "/produtos/tricot.png",
    disponivel: true,
  },
];

export async function GET() {
  return NextResponse.json({
    sucesso: true,
    total: produtos.length,
    produtos,
  });
}
