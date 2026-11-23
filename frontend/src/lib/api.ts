import "server-only";
// Importamos la URL base de nuestro backend.
import { apiUrl } from "./api-url";
// Importamos una función que lee el token
import { readSessionToken } from "./session";
import { redirect } from "next/navigation";

export async function apiFetch(path: string, options: RequestInit = {}) {
  //path: string:Es la ruta del endpoint que queremos consultar.

  // options: RequestInit = {}: Son opciones adicionales para configurar la petición.
  // Por ejemplo: method, headers o body.

  // 1. Leemos el token guardado en la sesión.
  const token = await readSessionToken();

  // 2. Verificamos si existe un token.
  // TODO A: si falta el token, volver al login antes de consultar NestJS.

  //Si no existe una sesión, volver al login 
  if (!token){
    redirect("/login");
  }
  
  // 3. Creamos un objeto de encabezados HTTP.
  // Conservamos los encabezados que llegaron 
  // dentro de options.headers, si existen.
  const headers = new Headers(options.headers);

  // 4. Agregamos el token al encabezado Authorization.
  headers.set("Authorization", `Bearer ${token}`);

  // 5. Hacemos la petición HTTP al backend.
  const response = await fetch(`${apiUrl}${path}`, {
    // Copiamos las opciones recibidas.
    ...options,
    // Enviamos los encabezados preparados,incluyendo Authorization.
    headers,
    cache: "no-store",
  });

  // TODO A: si NestJS responde sin autorización por sesión (401), volver al login.

  //Si NestJS rechaza el token, volver al login
  if (response.status === 401) {
    redirect("/login");
  }

   // 7. Devolvemos la respuesta del backend.

  return response;
}
