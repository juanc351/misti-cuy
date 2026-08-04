/**
 * ============================================================================
 * MISTI CUY
 * ----------------------------------------------------------------------------
 * Tipos comunes reutilizables.
 * ============================================================================
 */

export type Id = string;

export interface BaseEntity {
  id: Id;

  createdAt: Date;

  updatedAt: Date;
}

export interface Pagination {
  page: number;

  pageSize: number;

  total: number;
}

export interface Option<T = string> {
  label: string;

  value: T;
}