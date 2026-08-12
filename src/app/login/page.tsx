"use client";

import { useState } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);

    try {
      /* ==========================================================
         GOOGLE AUTHENTICATION
      ========================================================== */

      const provider =
        new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      const credential =
        await signInWithPopup(
          auth,
          provider,
        );

      /* ==========================================================
         OBTENER ID TOKEN
      ========================================================== */

      const idToken =
        await credential.user.getIdToken();

      /* ==========================================================
         CREAR SESIÓN SEGURA EN EL SERVIDOR
      ========================================================== */

      const response = await fetch(
        "/api/auth/session",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            idToken,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          "No se pudo crear la sesión.",
        );
      }

      /* ==========================================================
         IR AL PANEL
      ========================================================== */

      router.replace("/admin");
      router.refresh();

    } catch (error: unknown) {
      const firebaseError =
        error as {
          code?: string;
        };

      switch (firebaseError.code) {
        case "auth/popup-closed-by-user":
          setError(
            "El inicio de sesión fue cancelado.",
          );
          break;

        case "auth/popup-blocked":
          setError(
            "El navegador bloqueó la ventana de Google.",
          );
          break;

        case "auth/unauthorized-domain":
          setError(
            "Este dominio no está autorizado en Firebase.",
          );
          break;

        case "auth/account-exists-with-different-credential":
          setError(
            "Esta cuenta ya está registrada con otro método de acceso.",
          );
          break;

        case "auth/network-request-failed":
          setError(
            "No se pudo conectar con Firebase. Revisa tu conexión.",
          );
          break;

        default:
          setError(
            "No se pudo iniciar sesión con Google.",
          );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-10">
      <section className="w-full max-w-md">

        {/* ========================================================
            MARCA
        ======================================================== */}

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Misti Cuy
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Panel administrativo
          </p>
        </div>

        {/* ========================================================
            LOGIN
        ======================================================== */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:p-8">

          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-zinc-100">
              Iniciar sesión
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Accede al panel administrativo
              de Misti Cuy.
            </p>
          </div>

          {/* ======================================================
              GOOGLE
          ====================================================== */}

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="
              flex
              min-h-12
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              border
              border-zinc-700
              bg-white
              px-4
              text-sm
              font-semibold
              text-zinc-900
              transition
              hover:bg-zinc-100
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <span
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                text-base
                font-bold
              "
              aria-hidden="true"
            >
              G
            </span>

            <span>
              {loading
                ? "Conectando..."
                : "Continuar con Google"}
            </span>
          </button>

          {/* ======================================================
              ERROR
          ====================================================== */}

          {error && (
            <div
              role="alert"
              className="
                mt-4
                rounded-xl
                border
                border-red-500/20
                bg-red-500/5
                px-4
                py-3
              "
            >
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          )}

        </div>

        {/* ========================================================
            PIE
        ======================================================== */}

        <p className="mt-6 text-center text-xs text-zinc-600">
          Misti Cuy · Panel administrativo
        </p>

      </section>
    </main>
  );
}