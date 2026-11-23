import "server-only";
import { cookies } from "next/headers";

const cookieName = "print_lab_session";

export async function readSessionToken() {
  return (await cookies()).get(cookieName)?.value;
}

export async function saveSessionToken(token: string) {
  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 3 * 60 * 60,
    // La práctica se ejecuta por HTTP local.
    secure: false,
  });
}

export async function clearSessionToken() {
  (await cookies()).delete(cookieName);
}
