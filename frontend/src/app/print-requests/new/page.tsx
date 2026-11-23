import Link from "next/link";
import { apiFetch } from "../../../lib/api";
import type { Printer, PrintRequest } from "../../../lib/print-types";
//TENER CUIDADO CON EL IMPORT
import { redirect } from "next/navigation";

/* FUNCIÓN PARA CREAR UNA SOLICITUD
  Recibe los datos del formulario y los envía
  al backend de NestJS mediante un POST.
 */

  // TODO C: leer el formulario y enviar el POST con apiFetch.
  // TODO C: solo si responde 201, leer el id de la respuesta y abrir el comprobante.

async function createPrintRequest(formData: FormData) {
  // Indica que esta función se ejecuta en el servidor.
  "use server";

   // 1. OBTIENE LOS DATOS DEL FORMULARIO
  const title = String(formData.get("title") ?? "").trim();
  const pages = Number(formData.get("pages"));
  const printerId = Number(formData.get("printerId"));

  // 2. Enviar los datos al backend A NESTJS

  // apiFetch realiza una petición al backend
  // e incluye automáticamente el token.
  const response = await apiFetch("/print-requests", {
    // POST significa que queremos crear un recurso.
    method: "POST",
    // Indicamos que enviaremos datos en formato JSON.
    headers: {
      "Content-Type": "application/json",
    },

    // Convertimos los datos del formulario a JSON
    // para enviarlos en el cuerpo de la petición.
    body: JSON.stringify({
      title,
      pages,
      printerId,
    }),
  });

  // 3. VERIFICAR SI SE CREÓ LA SOLICITUD

  // 201 significa que el backend creó el recurso.
  // !== significa "diferente de".
  if (response.status !== 201) {
    // Si NO responde 201, termina la función.
    // No redirige al usuario.
    return;
  }

  // 4. LEER LA RESPUESTA DEL BACKEND
  // Convertimos el JSON recibido a un objeto.
  // PrintRequest indica el tipo esperado.
  const request: PrintRequest = await response.json();

  // 5. ABRIR EL COMPROBANTE utilizando el ID real.
  // Redirigimos a la página de detalle utilizando
  // el ID de la solicitud creada por NestJS.
  redirect(`/print-requests/${request.id}`);
}

/*
 * PÁGINA PARA CREAR UNA SOLICITUD
 * Primero obtiene las impresoras disponibles
 * en el sistema y después muestra el formulario.
 */

export default async function NewPrintRequestPage() {
  // La carga de impresoras ya está preparada; usar una sesión iniciada.
  
  // Consultamos el endpoint GET /printers.
  const response = await apiFetch("/printers");

  // Si la respuesta fue exitosa, convertimos el JSON
  // en un arreglo de impresoras.
  const printers: Printer[] = response.ok ? await response.json() : [];

  return (
    <main>
      <h1>Nueva solicitud</h1>
      <Link href="/print-requests">Volver al listado</Link>
      {/*
        Formulario para crear la solicitud.

        action={createPrintRequest} indica que
        al enviarlo se ejecutará esa Server Action.
      */}
      <form className="panel fields" action={createPrintRequest}>
        <label>Título del documento<input name="title" maxLength={100} required /></label>
        
        {/* Campo numérico para las páginas. */}
        <label>Páginas<input name="pages" type="number" min={1} step={1} required /></label>
        
        {/* Campo para seleccionar una impresora. */}
        <label>
          Impresora
          <select name="printerId" defaultValue="" required>

            {/* Opción inicial sin impresora seleccionada. */}
            <option value="" disabled>Seleccionar una impresora</option>

            {/* Recorremos el arreglo de impresoras. */}
            {printers.map((printer) => (
              <option key={printer.id} value={printer.id}>
                
                {/* Mostramos si está disponible. */}
                {printer.name}{printer.isAvailable ? " — disponible" : " — fuera de servicio"}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Enviar solicitud</button>
      </form>
    </main>
  );
}
