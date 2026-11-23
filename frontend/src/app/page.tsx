import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Solicitudes de impresión</h1>
      <p>Laboratorio de impresión · Preparcial práctico</p>
      <div className="actions">
        <Link className="button" href="/login">Iniciar sesión</Link>
        <Link href="/print-requests">Ver solicitudes</Link>
      </div>
    </main>
  );
}
