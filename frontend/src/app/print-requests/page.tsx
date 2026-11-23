//¿QUÉ HACE ESTE ARCHIVO?
//Muestra una página con las solicitudes de impresión.

//Permite:
// 1. Consultar las solicitudes desde NestJS.
// 2. Filtrarlas por estado (por ejemplo, pending).
// 3. Mostrar las solicitudes usando .map().
// 4. Entrar al detalle de cada solicitud.
// 5. Ir al formulario para crear una solicitud.
// 6. Cerrar la sesión del usuario.

//Sirve para navegar entre páginas de nuestra aplicación.
import Link from "next/link";
import { redirect } from "next/navigation";
import { clearSessionToken } from "../../lib/session";

// Se encarga de consultar NestJS enviando el token.
import { apiFetch } from "../../lib/api";

// Define la estructura que debe tener cada solicitud.
import type { PrintRequest } from "../../lib/print-types";

async function logout() {
  // Se ejecuta en el servidor de Next.js.
  "use server";
  await clearSessionToken();
  redirect("/login");
}

//searchParams contiene parámetros de la URL.
type PrintRequestsPageProps ={
  searchParams: Promise <{status?:string}>;
};

export default async function PrintRequestsPage({searchParams,
  }: PrintRequestsPageProps) {
  // TODO B: recibir searchParams, pedir el listado con apiFetch y mostrar las solicitudes.
  
  // 1. LEER EL FILTRO DE LA URL
  // Esperamos los parámetros de la URL.
  const {status} = await searchParams;

  // 2. CONSTRUIR LA RUTA PARA EL BACKEND
  // Si status tiene un valor, agregamos ese filtro como parámetro de consulta.
  const path = status
  ? `/print-requests?status=${encodeURIComponent(status)}`
  : "/print-request";

  // 3. CONSULTAR NESTJS
  // apiFetch agrega el token.

  // La petición GET se realiza al backend.
  const response = await apiFetch(path);

  // 4. COMPROBAR SI LA PETICIÓN FUNCIONÓ
  if(!response.ok){
    throw new Error (
      "No se pudieron obtener las solicitudes."
    );
  }

  // 5. CONVERTIR LA RESPUESTA A JSON
  // response.json() lee los datos enviados
  // por el backend y los convierte a JavaScript.

  // PrintRequest[] significa que esperamos un arreglo de solicitudes de impresión.
  const requests: PrintRequest[] = await response.json();


  // TODO B: agregar los enlaces Todas y Pendientes debajo de la navegación de acciones.
  return (
    <main>
      <h1>Solicitudes de impresión</h1>
      <div className="actions">
        <Link className="button" href="/print-requests/new">Nueva solicitud</Link>
        <form action={logout}><button type="submit">Cerrar sesión</button></form>
      </div>

      {/* Contenedor de filtros */}
      <div className="actions">
        <Link href="/print-requests">Todas</Link>
        <Link href="/print-requests?status=pending">
          Pendientes
        </Link>
      </div>

      {/*Sección donde mostramos las solicitudes*/}
      <section className="panel" aria-label="Solicitudes">
        {/*
          .map() recorre el arreglo requests.
          Por cada solicitud crea un <article>.

          request representa UNA solicitud del arreglo en cada iteración.
        */}
        {requests.map((request) => (
          <article key={request.id}>
            <h2>{request.title}</h2>
            <p>Páginas: {request.pages}</p>
            <p>Impresora: {request.printer.name}</p>
            <p>Estado: {request.status}</p>

            <Link href={`/print-requests/${request.id}`}>
              Ver comprobante
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
