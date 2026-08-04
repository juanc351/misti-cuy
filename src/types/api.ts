/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Tipos para respuestas de API.
 * ============================================================================
 */

export interface ApiResponse<T> {
  success: boolean;

  message?: string;

  data: T;
}

export interface ApiError {
  message: string;

  status: number;
}