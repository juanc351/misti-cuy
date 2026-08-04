# Navigation System

## Descripción

Sistema oficial de navegación de Misti Cuy.

Este módulo es utilizado por todas las páginas públicas de la aplicación y constituye el único punto de entrada para la navegación principal.

---

## Componentes

### Navigation

Componente principal.

Responsable de renderizar automáticamente la versión Desktop o Mobile según el dispositivo.

---

### NavigationDesktop

Header utilizado en escritorio.

Incluye:

- Logo
- Navegación principal
- Página activa

---

### NavigationMobile

Header utilizado en dispositivos móviles.

Incluye:

- Botón volver (opcional)
- Título
- Botón menú

---

### NavigationDrawer

Menú desplegable para dispositivos móviles.

Características:

- Overlay
- Animación
- Cierre al tocar fuera
- Cierre mediante botón

---

### NavigationLogo

Logo reutilizable del sistema.

---

### NavigationItem

Elemento reutilizable del menú.

Es utilizado por:

- Desktop
- Drawer

---

## Configuración

Las opciones oficiales del menú se encuentran en:

navigation.constants.ts

---

## Tipos

Los contratos oficiales se encuentran en:

navigation.types.ts

---

## Arquitectura

```
navigation
│
├── Navigation.tsx
├── NavigationDesktop.tsx
├── NavigationMobile.tsx
├── NavigationDrawer.tsx
├── NavigationLogo.tsx
├── NavigationItem.tsx
├── navigation.constants.ts
├── navigation.types.ts
├── index.ts
└── README.md
```

---

## Filosofía

Este módulo representa el Sistema Oficial de Navegación de Misti Cuy.

Toda nueva página pública deberá utilizar este sistema y no implementar un menú propio.
