# Print Lab API — NestJS

## Arranque

Usar Docker Desktop con contenedores Linux, Docker Compose v2 y Node.js 22.13+ (rama 22) o 24.11+ (rama 24). El proyecto también admite Node.js 20.19+ (rama 20) si es la versión ya instalada en el laboratorio.

En esta carpeta, ejecutar en orden:

```sh
npm ci
docker compose up -d --wait
npm run start:dev
```

Abrir http://127.0.0.1:3040/api/health. Debe mostrar `{"status":"ok"}`. No hace falta crear un `.env` en el backend.

Se crean dos impresoras y dos solicitudes en una base nueva. Los datos se conservan si se reinicia el servidor. Si se reinicia NestJS, volver a iniciar sesión para obtener un JWT nuevo. Para detener solo la base de esta práctica sin borrar los datos: `docker compose stop`.

Si el puerto `5442` ya está en uso, consultar antes de detener un contenedor ajeno. No apuntar este proyecto a una base real: la configuración sincroniza las entidades automáticamente en esta base local.

## Qué completar

| Archivo (dentro de `src/print-requests/`) | Tarea |
| --- | --- |
| `dto/list-print-requests.dto.ts` | Validar el filtro por estado opcional. |
| `print-requests.controller.ts` | Recibir, validar y pasar el filtro al servicio. |
| `print-requests.service.ts` | Filtrar con TypeORM y completar la regla de disponibilidad al crear. |

Antes de resolver los TODO, el GET devuelve todas las solicitudes aun si se envía un filtro; la regla de disponibilidad todavía no se aplica. Probar el `409` de la impresora fuera de servicio después de completar la regla, para no crear registros de prueba por error.

## Consultar en Postman

1. Enviar `POST http://127.0.0.1:3040/api/auth/login` con JSON: `{"email":"student@example.com","password":"PrintLab2026"}`.
2. Copiar el valor de `access_token`. En las rutas privadas, seleccionar **Bearer Token** y pegarlo. No pegues el token en el código.
3. Usar `GET /api/printers` para ver los identificadores reales; no asumirlos. El selector del frontend ya usa este endpoint.
4. Consultar `GET /api/print-requests` para confirmar que haya datos. Las verificaciones finales están en el enunciado.

`npm run build` compila el backend. El ejercicio no requiere añadir pruebas automatizadas.
