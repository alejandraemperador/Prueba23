import { redirect } from "next/navigation";
import { apiUrl } from "../../lib/api-url";
import { saveSessionToken } from "../../lib/session";

async function login(formData: FormData) {
  "use server";

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
    }),
    cache: "no-store",
  }).catch(() => null);

  if (!response?.ok) redirect("/login?error=1");
  const data = await response.json().catch(() => null);
  if (typeof data?.access_token !== "string") redirect("/login?error=1");

  await saveSessionToken(data.access_token);
  redirect("/print-requests");
}

type LoginPageProps = { searchParams: Promise<{ error?: string }> };

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  return (
    <main>
      <h1>Iniciar sesión</h1>
      {error === "1" && <p role="alert">Revisar las credenciales o comprobar que NestJS esté iniciado.</p>}
      <form className="panel fields" action={login}>
        <label>Correo<input name="email" type="email" autoComplete="username" required /></label>
        <label>Contraseña<input name="password" type="password" autoComplete="current-password" required /></label>
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
