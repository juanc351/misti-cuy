import type { DashboardData } from "../types/dashboard.types";

export const dashboardMockData: DashboardData = {
  stats: [
    {
      id: "stat-1",
      title: "Ventas Totales",
      value: "S/ 18,450",
      description: "Último mes",
      icon: "💰",
      trend: "positive",
      trendLabel: "+12.5%",
    },
    {
      id: "stat-2",
      title: "Pedidos Pendientes",
      value: 24,
      icon: "📦",
      trend: "negative",
      trendLabel: "-3%",
    },
    {
      id: "stat-3",
      title: "Clientes Nuevos",
      value: 142,
      icon: "👥",
      trend: "positive",
      trendLabel: "+8.2%",
    },
    {
      id: "stat-4",
      title: "Productos Activos",
      value: 512,
      description: "Inventario actual",
      icon: "📋",
      trend: "neutral",
    },
  ],

  quickActions: [
    {
      id: "qa-1",
      label: "Nuevo Pedido",
      icon: "📝",
    },
    {
      id: "qa-2",
      label: "Agregar Cliente",
      icon: "👤",
    },
    {
      id: "qa-3",
      label: "Generar Reporte",
      icon: "📊",
    },
    {
      id: "qa-4",
      label: "Configuración",
      icon: "⚙️",
      disabled: false,
    },
  ],

  recentActivities: [
    {
      id: "act-1",
      title: "Pedido #1024 creado",
      description: "Cliente: Distribuidora Norte SAC",
      timestamp: "Hace 5 min",
      icon: "🛒",
    },
    {
      id: "act-2",
      title: "Inventario actualizado",
      description: "Se agregaron 50 unidades de alpaca premium",
      timestamp: "Hace 15 min",
      icon: "📦",
    },
    {
      id: "act-3",
      title: "Reporte mensual generado",
      description: "Ventas de julio 2026",
      timestamp: "Hace 2 horas",
      icon: "📄",
    },
    {
      id: "act-4",
      title: "Nuevo cliente registrado",
      description: "Agroindustrias del Sur EIRL",
      timestamp: "Hace 3 horas",
      icon: "👤",
    },
    {
      id: "act-5",
      title: "Configuración actualizada",
      description: "Parámetros de notificaciones",
      timestamp: "Hace 1 día",
      icon: "⚙️",
    },
  ],

  summary: [
    {
      id: "sum-1",
      label: "Unidades Vendidas",
      value: "1,245",
    },
    {
      id: "sum-2",
      label: "Valor Promedio",
      value: "S/ 48.50",
    },
    {
      id: "sum-3",
      label: "Devoluciones",
      value: "12",
    },
    {
      id: "sum-4",
      label: "Clientes Frecuentes",
      value: "87",
    },
  ],

  overviewCards: [
    {
      id: "over-1",
      title: "Próximos vencimientos",
      description: "Productos con fecha de caducidad cercana",
      icon: "⚠️",
      children: null,
    },
    {
      id: "over-2",
      title: "Rendimiento por zona",
      description: "Zonas con mayor volumen de ventas",
      icon: "📈",
      children: null,
    },
  ],
};
