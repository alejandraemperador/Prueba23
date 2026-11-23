import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import type { PrintRequest } from "../../../lib/print-types";

type DetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PrintRequestDetailPage({params,
  }: DetailPageProps) {
  // TODO C: leer id de params y consultar la solicitud mediante apiFetch.
  // TODO C: mostrar los datos del comprobante sin depender del formulario.
  
  //1. OBTENER EL ID DE LA SOLICITUD

  // Extrae el ID de la URL.
  const { id } = await params;

  // 2. CONSULTAR LA SOLICITUD EN NESTJS
  // Realiza una petición GET para obtener
  // los datos de la solicitud con ese ID.
  const response = await apiFetch(`/print-requests/${id}`);

  // 3. VERIFICAR SI EXISTE LA SOLICITUD

  // Si NestJS responde 404, significa
  // que no encontró esa solicitud.
  if (response.status === 404) {
    notFound();
  }

  // 4. VERIFICAR SI OCURRIÓ OTRO ERROR

  // Si la respuesta no fue exitosa,
  // lanza un error y detiene la ejecución.

  if (!response.ok) {
    throw new Error("No se pudo consultar el comprobante.");
  }

  // 5. OBTENER LOS DATOS DEL COMPROBANTE

  // Convierte el JSON enviado por NestJS
  // en un objeto de tipo PrintRequest.
  const request: PrintRequest = await response.json();

  // 6. MOSTRAR EL COMPROBANTE EN PANTALLA
  return (
    <main>
      <h1>Comprobante</h1>

      {/* Enlace para regresar al listado de solicitudes. */}
      <Link href="/print-requests">Volver al listado</Link>

      {/* Sección que contiene los datos de la solicitud. */}
      <section className="panel" aria-label="Detalle de la solicitud">
        <p>ID: {request.id}</p>
        <p>Título: {request.title}</p>
        <p>Páginas: {request.pages}</p>
        <p>Impresora: {request.printer.name}</p>
        <p>Estado: {request.status}</p>
      </section>

    </main>
  );
}
