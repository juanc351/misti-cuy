/* ================================================================
   TIPOS DE PUBLICACIONES - MISTI CUY
================================================================ */

/* ================================================================
   TIPO DE PUBLICACIÓN
================================================================ */

export type PublicationType =
  | "REPRODUCTOR"
  | "CONSUMO";

/* ================================================================
   ESTADO DE PUBLICACIÓN
================================================================ */

/*
 * DISPONIBLE:
 * La publicación puede mostrarse y administrarse.
 *
 * NO_DISPONIBLE:
 * La publicación ya no está disponible.
 *
 * En la página pública este estado se mostrará
 * visualmente como "Vendido".
 */
export type PublicationStatus =
  | "DISPONIBLE"
  | "NO_DISPONIBLE";

/* ================================================================
   DATOS BASE
================================================================ */

export interface PublicationBase {
  id: string;

  type: PublicationType;

  quantity: number;

  price: number;

  /*
   * Departamento donde se encuentra
   * la publicación.
   *
   * Este campo se utilizará para:
   *
   * - Filtrar publicaciones en Firestore.
   * - Mostrar el departamento en la tabla.
   */
  department: string;

  observations: string;

  status: PublicationStatus;

  publishedAt?: string;

  updatedAt?: string;
}

/* ================================================================
   REPRODUCTOR
================================================================ */

export interface ReproductorPublication
  extends PublicationBase {
  type: "REPRODUCTOR";

  breed: string;

  line?: string;

  predominantColor?: string;

  sex: "MACHO" | "HEMBRA";
}

/* ================================================================
   CONSUMO
================================================================ */

export interface ConsumoPublication
  extends PublicationBase {
  type: "CONSUMO";

  weight: number;
}

/* ================================================================
   PUBLICACIÓN
================================================================ */

export type Publication =
  | ReproductorPublication
  | ConsumoPublication;

/* ================================================================
   DATOS PARA CREAR
================================================================ */

export type CreatePublicationInput =
  | Omit<
      ReproductorPublication,
      "id" | "publishedAt" | "updatedAt" | "status"
    >
  | Omit<
      ConsumoPublication,
      "id" | "publishedAt" | "updatedAt" | "status"
    >;