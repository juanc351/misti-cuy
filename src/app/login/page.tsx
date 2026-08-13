"use client";

import { useState } from "react";

import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError(
        "Ingresa tu correo electrónico.",
      );
      return;
    }

    if (!password) {
      setError(
        "Ingresa tu contraseña.",
      );
      return;
    }

    setLoading(true);

    try {
      /* ==========================================================
         FIREBASE AUTHENTICATION
      ========================================================== */

      const credential =
        await signInWithEmailAndPassword(
          auth,
          normalizedEmail,
          password,
        );

      /* ==========================================================
         OBTENER ID TOKEN
      ========================================================== */

      const idToken =
        await credential.user.getIdToken(
          true,
        );

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
        let message =
          "No tienes autorización para acceder al panel.";

        try {
          const data =
            await response.json();

          if (
            typeof data?.error ===
            "string"
          ) {
            message = data.error;
          }
        } catch {
          // Mantener mensaje por defecto.
        }

        // Cerramos la sesión de Firebase
        // si el servidor rechaza al usuario.
        await signOut(auth);

        throw new Error(message);
      }

      /* ==========================================================
         ACCESO AL PANEL
      ========================================================== */

      router.replace("/admin");
      router.refresh();
    } catch (error: unknown) {
      const firebaseError =
        error as {
          code?: string;
          message?: string;
        };

      switch (
        firebaseError.code
      ) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setError(
            "El correo o la contraseña no son correctos.",
          );
          break;

        case "auth/invalid-email":
          setError(
            "El correo electrónico no es válido.",
          );
          break;

        case "auth/user-disabled":
          setError(
            "Esta cuenta está deshabilitada.",
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Demasiados intentos. Espera unos minutos e inténtalo nuevamente.",
          );
          break;

        case "auth/network-request-failed":
          setError(
            "No se pudo conectar con Firebase. Revisa tu conexión.",
          );
          break;

        default:
          setError(
            firebaseError.message ||
              "No se pudo iniciar sesión.",
          );
          break;
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
              FORMULARIO
          ====================================================== */}

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            {/* ====================================================
                CORREO
            ==================================================== */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value,
                  )
                }
                disabled={loading}
                placeholder="admin@misticuy.pe"
                className="
                  min-h-12
                  w-full
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-950
                  px-4
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-zinc-600
                  focus:border-zinc-500
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              />
            </div>

            {/* ====================================================
                CONTRASEÑA
            ==================================================== */}

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value,
                  )
                }
                disabled={loading}
                placeholder="••••••••"
                className="
                  min-h-12
                  w-full
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-950
                  px-4
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-zinc-600
                  focus:border-zinc-500
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              />
            </div>

            {/* ====================================================
                BOTÓN
            ==================================================== */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                min-h-12
                w-full
                items-center
                justify-center
                rounded-xl
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
              {loading
                ? "Iniciando sesión..."
                : "Iniciar sesión"}
            </button>

          </form>

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
            FOOTER
        ======================================================== */}

        <p className="mt-6 text-center text-xs text-zinc-600">
          Misti Cuy · Panel administrativo
        </p>

      </section>
    </main>
  );
}