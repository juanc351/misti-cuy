import "server-only";

import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";

import firebaseApp from "@/lib/firebase-admin";

const SESSION_COOKIE_NAME =
  "misti_cuy_session";

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL?.trim().toLowerCase();

export async function getAdminSession() {
  const cookieStore =
    await cookies();

  const sessionCookie =
    cookieStore.get(
      SESSION_COOKIE_NAME,
    )?.value;

  if (!sessionCookie) {
    return null;
  }

  if (!ADMIN_EMAIL) {
    throw new Error(
      "Falta la variable ADMIN_EMAIL.",
    );
  }

  try {
    const auth =
      getAuth(firebaseApp);

    const decodedToken =
      await auth.verifySessionCookie(
        sessionCookie,
        true,
      );

    const email =
      decodedToken.email
        ?.trim()
        .toLowerCase();

    if (!email || email !== ADMIN_EMAIL) {
      return null;
    }

    return decodedToken;
  } catch {
    return null;
  }
}