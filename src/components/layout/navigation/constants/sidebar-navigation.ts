import type { SidebarSection } from '../types/sidebar.types';

export const sidebarNavigation: SidebarSection[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
      },
    ],
  },
  {
    id: 'comercial',
    title: 'Comercial',
    items: [
      {
        id: 'clientes',
        label: 'Clientes',
      },
      {
        id: 'pedidos',
        label: 'Pedidos',
      },
      {
        id: 'ventas',
        label: 'Ventas',
      },
    ],
  },
  {
    id: 'sistema',
    title: 'Sistema',
    items: [
      {
        id: 'reportes',
        label: 'Reportes',
      },
      {
        id: 'configuracion',
        label: 'Configuración',
      },
    ],
  },
];