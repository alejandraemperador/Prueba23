import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Print Lab",
  description: "Preparcial práctico full stack",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <header>
          <Link className="brand" href="/">Print Lab</Link>
          <nav aria-label="Navegación principal">
            <Link href="/print-requests">Solicitudes</Link>
            <Link href="/login">Acceso</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
