"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function doLogin(data: { uid: string; email: string; username: string }) {
  try {
  const expires = new Date(Date.now() + 60 * (60 * 1000));
  const session = btoa(JSON.stringify({ user: data, expires }));

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
  } catch (e: any) {
    console.error(e);
    throw new Error("Failed to login " + e);
  }
  redirect("/warmup");
}
