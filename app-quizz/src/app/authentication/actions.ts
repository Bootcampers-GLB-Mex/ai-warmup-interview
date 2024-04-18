"use server";

import { cookies } from "next/headers";
import { decrypt, encrypt } from "./lib";
import { redirect } from "next/navigation";

export async function doLogin(data: string) {
  try {
    const expires = new Date(Date.now() + 60 * (60 * 1000));
    const session = await encrypt({ data, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
  } catch (e: any) {
    console.error(e);
    throw new Error("Failed to login " + e);
  }
  redirect("/warmup");
}

export async function setAccessCode(accessCode) {
  const userSession = cookies().get("session");

  console.log(userSession);
  
  const response = await fetch('http://localhost:3003/interviews/access-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessCode }),
  });
  const result = await response.json();
  return result;
}