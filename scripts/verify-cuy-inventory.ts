import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

/**
 * ============================================================================
 * MISTI CUY
 *
 * Script:
 * verify-cuy-inventory.ts
 *
 * Objetivo:
 * Verificar que la colección cuyInventory de Firestore
 * contiene correctamente los registros migrados.
 *
 * Este script:
 *
 * - NO modifica Firestore.
 * - NO crea documentos.
 * - NO elimina documentos.
 * - SOLO lee y verifica.
 * ============================================================================
 */

/* ============================================================================
   VARIABLES DE ENTORNO
   ============================================================================ */

const projectId = process.env.FIREBASE_PROJECT_ID;

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

const privateKey =
  process.env.FIREBASE_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

/* ============================================================================
   VALIDACIÓN
   ============================================================================ */

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Faltan las variables de entorno de Firebase Admin."
  );
}

/* ============================================================================
   FIREBASE
   ============================================================================ */

const firebaseApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });

const db = getFirestore(firebaseApp);

/* ============================================================================
   CONFIGURACIÓN
   ============================================================================ */

const COLLECTION = "cuyInventory";

const EXPECTED_IDS = [
  "inventory-001",
  "inventory-002",
  "inventory-003",
  "inventory-004",
  "inventory-101",
  "inventory-102",
  "inventory-103",
];

/* ============================================================================
   EJECUCIÓN
   ============================================================================ */

async function main(): Promise<void> {
  console.log("");
  console.log("======================================");
  console.log("MISTI CUY");
  console.log("Verificación de inventario");
  console.log("======================================");
  console.log(`Proyecto: ${projectId}`);
  console.log(`Colección: ${COLLECTION}`);
  console.log("");

  const snapshot = await db
    .collection(COLLECTION)
    .get();

  /* ==========================================================================
     CANTIDAD
     ========================================================================== */

  console.log(`Documentos encontrados: ${snapshot.size}`);

  if (snapshot.size === EXPECTED_IDS.length) {
    console.log("✓ Cantidad correcta: 7 documentos.");
  } else {
    console.error(
      `✗ Cantidad incorrecta. Esperados: ${EXPECTED_IDS.length}.`
    );
  }

  console.log("");

  /* ==========================================================================
     DOCUMENTOS
     ========================================================================== */

  const foundIds = new Set<string>();

  for (const doc of snapshot.docs) {
    const data = doc.data();

    foundIds.add(doc.id);

    console.log("--------------------------------------");
    console.log(`Documento: ${doc.id}`);

    console.log(
      `category: ${String(data.category ?? "")}`
    );

    console.log(
      `variantId: ${String(data.variantId ?? "")}`
    );

    console.log(
      `cityId: ${String(data.cityId ?? "")}`
    );

    console.log(
      `status: ${String(data.status ?? "")}`
    );

    console.log(
      `ageRange: ${String(data.ageRange ?? "")}`
    );

    console.log(
      `averageWeight: ${String(data.averageWeight ?? "")}`
    );

    console.log(
      `presentation: ${String(data.presentation ?? "")}`
    );

    console.log(
      `males: ${String(data.males ?? "")}`
    );

    console.log(
      `females: ${String(data.females ?? "")}`
    );

    console.log(
      `quantity: ${String(data.quantity ?? "")}`
    );

    /* ========================================================================
       UPDATED AT
       ======================================================================== */

    const updatedAt = data.updatedAt;

    if (updatedAt instanceof Timestamp) {
      console.log("updatedAt: ✓ Timestamp");

      const date = updatedAt
        .toDate()
        .toLocaleDateString("es-PE");

      console.log(`fecha: ${date}`);
    } else {
      console.error(
        "updatedAt: ✗ No es un Timestamp de Firestore."
      );
    }
  }

  console.log("");
  console.log("======================================");
  console.log("VERIFICACIÓN DE IDs");
  console.log("======================================");

  /* ==========================================================================
     IDs
     ========================================================================== */

  for (const expectedId of EXPECTED_IDS) {
    if (foundIds.has(expectedId)) {
      console.log(`✓ ${expectedId}`);
    } else {
      console.error(`✗ Falta ${expectedId}`);
    }
  }

  /* ==========================================================================
     FINAL
     ========================================================================== */

  const missingIds = EXPECTED_IDS.filter(
    (id) => !foundIds.has(id)
  );

  console.log("");
  console.log("======================================");

  if (
    snapshot.size === EXPECTED_IDS.length &&
    missingIds.length === 0
  ) {
    console.log("VERIFICACIÓN COMPLETADA");
    console.log("✓ Inventario correcto.");
  } else {
    console.log("VERIFICACIÓN CON OBSERVACIONES");
    console.log("Revisar los resultados anteriores.");
  }

  console.log("======================================");
  console.log("");
}

/* ============================================================================
   ERROR GLOBAL
   ============================================================================ */

main().catch((error: unknown) => {
  console.error("");
  console.error("======================================");
  console.error("ERROR EN LA VERIFICACIÓN");
  console.error("======================================");
  console.error(error);
  console.error("");

  process.exit(1);
});