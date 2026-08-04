/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Home Module
 *
 * Tipos oficiales del Story Engine.
 * ============================================================================
 */

/**
 * Posición de la imagen dentro del capítulo.
 */
export type StoryLayout =
  | "left"
  | "right";

/**
 * Estado del capítulo.
 */
export type StoryStatus =
  | "published"
  | "draft";

/**
 * Capítulo de la historia de Misti Cuy.
 */
export interface Story {

  /**
   * Identificador único.
   */
  id: number;

  /**
   * Número del capítulo.
   */
  chapter: number;

  /**
   * Título principal.
   */
  title: string;

  /**
   * Descripción del capítulo.
   */
  description: string;

  /**
   * Reflexión o conclusión.
   */
  conclusion: string;

  /**
   * Imagen principal.
   */
  image: string;

  /**
   * Posición de la imagen.
   */
  layout: StoryLayout;

  /**
   * Estado del capítulo.
   */
  status: StoryStatus;
}