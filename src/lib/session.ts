import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "./auth";

export async function requireSession(returnTo: string) {
  await connection();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(returnTo)}&reason=protected`);
  }
  return session;
}
