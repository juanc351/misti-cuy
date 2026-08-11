import "server-only";

import {
  cert,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";

import {
  getFirestore,
  type Firestore,
} from "firebase-admin/firestore";

/**
 * ============================================================================
 * MISTI CUY
 *
 * Firebase Admin
 *
 * Uso exclusivo del servidor.
 *
 * Arquitectura:
 *
 * Firebase / Firestore
 *        ↓
 * Firebase Admin
 *        ↓
 * Repository
 *        ↓
 * cuy.server.ts
 *        ↓
 * Vercel Cache
 *        ↓
 * Client
 *
 * Las credenciales nunca deben llegar al navegador.
 * ============================================================================
 */

/* ============================================================================
   VARIABLES DE ENTORNO
============================================================================ */

const projectId =
  process.env.FIREBASE_PROJECT_ID?.trim();

const clientEmail =
  process.env.FIREBASE_CLIENT_EMAIL?.trim();

const privateKey =
  process.env.FIREBASE_PRIVATE_KEY
    ?.replace(/\\n/g, "\n")
    .trim();

/* ============================================================================
   VALIDACIÓN
============================================================================ */

if (
  !projectId ||
  !clientEmail ||
  !privateKey
) {
  throw new Error(
    "Faltan las variables de entorno de Firebase Admin.",
  );
}

/* ============================================================================
   FIREBASE APP
============================================================================ */

/**
 * Reutilizamos la instancia existente si Firebase
 * ya fue inicializado.
 *
 * Esto evita inicializar Firebase varias veces
 * durante el desarrollo con Next.js.
 */

const firebaseApp: App =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });

/* ============================================================================
   FIRESTORE
============================================================================ */

/**
 * Instancia central de Firestore.
 */

export const db: Firestore =
  getFirestore(firebaseApp);

export default firebaseApp;