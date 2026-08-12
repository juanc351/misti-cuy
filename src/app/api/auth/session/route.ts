import { NextResponse } from "next/server";

import { getAuth } from "firebase-admin/auth";

import firebaseApp from "@/lib/firebase-admin";

const SESSION_COOKIE_NAME =
  "misti_cuy_session";

const SESSION_EXPIRES_IN =
  1000 * 60 * 60 * 24 * 5;

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL?.trim().toLowerCase();

export async function POST(
  request: Request,
) {
  try {
    if (!ADMIN_EMAIL) {
      return NextResponse.json(
        {
          error:
            "La cuenta administradora no está configurada.",
        },
        {
          status: 500,
        },
      );
    }

    const body =
      await request.json();

    const idToken =
      typeof body?.idToken === "string"
        ? body.idToken
        : "";

    if (!idToken) {
      return NextResponse.json(
        {
          error:
            "Token de autenticación requerido.",
        },
        {
          status: 400,
        },
      );
    }

    const auth =
      getAuth(firebaseApp);

    const decodedToken =
      await auth.verifyIdToken(
        idToken,
      );

    const email =
      decodedToken.email
        ?.trim()
        .toLowerCase();

    /* ==========================================================
       COMPROBAR ADMINISTRADOR
    ========================================================== */

    if (
      !email ||
      email !== ADMIN_EMAIL
    ) {
      return NextResponse.json(
        {
          error:
            "Esta cuenta no tiene autorización para acceder al panel.",
        },
        {
          status: 403,
        },
      );
    }

    /* ==========================================================
       CREAR SESSION COOKIE
    ========================================================== */

    const sessionCookie =
      await auth.createSessionCookie(
        idToken,
        {
          expiresIn:
            SESSION_EXPIRES_IN,
        },
      );

    const response =
      NextResponse.json({
        success: true,
      });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionCookie,
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge:
        SESSION_EXPIRES_IN / 1000,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        error:
          "No se pudo crear la sesión.",
      },
      {
        status: 401,
      },
    );
  }
}