import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

import { cuyCategories } from "../src/features/mis-cuyes/data/cuy.categories";
import { cuyVariants } from "../src/features/mis-cuyes/data/cuy.variants";
import { cuyCities } from "../src/features/mis-cuyes/data/cuy.cities";
import { cuyInventory } from "../src/features/mis-cuyes/data/cuy.inventory";

/**
 * ============================================================================
 * MISTI CUY
 *
 * Script:
 * migrate-cuy-catalogs.ts
 *
 * Objetivo:
 * Migrar los datos Mock actuales hacia Firestore.
 *
 * Colecciones:
 *
 * cuyCategories
 * cuyVariants
 * cuyCities
 * cuyInventory
 *
 * IMPORTANTE:
 *
 * - Conserva los IDs actuales.
 * - No modifica los archivos Mock.
 * - No migra productos porque actualmente están vacíos.
 * - updatedAt del inventario se guarda como Timestamp de Firestore.
 * - La interfaz podrá mostrar únicamente la fecha.
 * ============================================================================
 */

/* ============================================================================
   VARIABLES DE ENTORNO
   ============================================================================ */

const projectId = process.env.FIREBASE_PROJECT_ID;

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

/* ============================================================================
   VALIDACIÓN
   ============================================================================ */

if (!projectId || !clientEmail || !privateKey) {
  throw new Error("Faltan las variables de entorno de Firebase Admin.");
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
   COLECCIONES
   ============================================================================ */

const COLLECTIONS = {
  categories: "cuyCategories",
  variants: "cuyVariants",
  cities: "cuyCities",
  inventory: "cuyInventory",
} as const;

/* ============================================================================
   FECHA
   ============================================================================ */

/**
 * Convierte la fecha actual en un Timestamp de Firestore.
 *
 * La hora queda almacenada internamente por Firestore,
 * pero posteriormente el repository podrá mostrar únicamente
 * la fecha al frontend.
 */
function getCurrentTimestamp(): Timestamp {
  return Timestamp.now();
}

/* ============================================================================
   CATEGORÍAS
   ============================================================================ */

async function migrateCategories(): Promise<void> {
  console.log("");
  console.log("Migrando categorías...");

  const batch = db.batch();

  for (const category of cuyCategories) {
    const ref = db.collection(COLLECTIONS.categories).doc(category.id);

    batch.set(ref, category);
  }

  await batch.commit();

  console.log(`✓ ${cuyCategories.length} categorías migradas.`);
}

/* ============================================================================
   VARIEDADES
   ============================================================================ */

async function migrateVariants(): Promise<void> {
  console.log("");
  console.log("Migrando variedades...");

  const batch = db.batch();

  for (const variant of cuyVariants) {
    const ref = db.collection(COLLECTIONS.variants).doc(variant.id);

    batch.set(ref, variant);
  }

  await batch.commit();

  console.log(`✓ ${cuyVariants.length} variedades migradas.`);
}

/* ============================================================================
   CIUDADES
   ============================================================================ */

async function migrateCities(): Promise<void> {
  console.log("");
  console.log("Migrando ciudades...");

  const batch = db.batch();

  for (const city of cuyCities) {
    const ref = db.collection(COLLECTIONS.cities).doc(city.id);

    batch.set(ref, city);
  }

  await batch.commit();

  console.log(`✓ ${cuyCities.length} ciudades migradas.`);
}

/* ============================================================================
   INVENTARIO
   ============================================================================ */

/**
 * Migra el inventario actual.
 *
 * El Mock utiliza:
 *
 * updatedAt: "Hoy"
 *
 * Firestore recibirá:
 *
 * updatedAt: Timestamp
 *
 * El frontend no tendrá que mostrar la hora.
 */
async function migrateInventory(): Promise<void> {
  console.log("");
  console.log("Migrando inventario...");

  const batch = db.batch();

  const updatedAt = getCurrentTimestamp();

  for (const inventoryItem of cuyInventory) {
    const ref = db.collection(COLLECTIONS.inventory).doc(inventoryItem.id);

    const inventoryData = {
      ...inventoryItem,
    };

    delete (
      inventoryData as {
        updatedAt?: string;
      }
    ).updatedAt;

    batch.set(ref, {
      ...inventoryData,
      updatedAt,
    });
  }

  await batch.commit();

  console.log(`✓ ${cuyInventory.length} registros de inventario migrados.`);
}

/* ============================================================================
   EJECUCIÓN
   ============================================================================ */

async function main(): Promise<void> {
  console.log("");
  console.log("======================================");
  console.log("MISTI CUY");
  console.log("Migración de datos");
  console.log("======================================");
  console.log(`Proyecto: ${projectId}`);
  console.log("");

  await migrateCategories();

  await migrateVariants();

  await migrateCities();

  await migrateInventory();

  console.log("");
  console.log("======================================");
  console.log("MIGRACIÓN COMPLETADA");
  console.log("======================================");
  console.log("");
}

/* ============================================================================
   ERROR GLOBAL
   ============================================================================ */

main().catch((error: unknown) => {
  console.error("");
  console.error("======================================");
  console.error("ERROR EN LA MIGRACIÓN");
  console.error("======================================");
  console.error(error);
  console.error("");

  process.exit(1);
});
