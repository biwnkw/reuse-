import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReUse!",
  description: "Marketplace de moda circular e segunda mão",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}