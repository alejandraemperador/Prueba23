# Print Lab Web — Next.js

## Arranque

Con NestJS iniciado, ejecutar en esta carpeta:

```sh
npm ci
npm run dev
```

Abrir http://127.0.0.1:3041/login. Ingresar con `student@example.com` y `PrintLab2026`. Al entrar, debe mostrarse la página base de solicitudes. En **Nueva solicitud** deben aparecer las dos impresoras; en el proyecto inicial el formulario **todavía no guarda**.

No se necesita `.env.local` para los puertos del enunciado. Si se cambia el puerto de la API, usar `.env.example` como referencia para crear `.env.local` y reiniciar Next.js. No añadir el JWT al archivo.

## Qué completar

| Archivo | Tarea |
| --- | --- |
| `src/lib/api.ts` | Completar las dos redirecciones de sesión. La lectura de la cookie y el encabezado Bearer están preparados. |
| `src/app/print-requests/page.tsx` | Leer el filtro, hacer el GET, mostrar datos y agregar los enlaces de filtro. |
| `src/app/print-requests/new/page.tsx` | Completar la acción de creación. El formulario y la carga de impresoras ya están preparados. |
| `src/app/print-requests/[id]/page.tsx` | Leer el ID de la ruta, consultar el detalle y mostrar el comprobante. |

`apiFetch` devuelve una **respuesta HTTP**. Primero se revisa su estado y, cuando corresponda, se lee el JSON. El login, la cookie, el cierre de sesión, los estilos y los tipos ya están listos. No implementar roles ni agregar pantallas de carga, errores o éxito.

`npm run build` comprueba la compilación. Si hay un rechazo, no se debe navegar a un comprobante de un pedido inexistente.
