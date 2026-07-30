# ESTRUCTURA DEL PROYECTO - MISTI CUY

## Objetivo

Este documento define la organización interna del código fuente de Misti Cuy.

La arquitectura está diseñada para permitir crecimiento futuro, mantenimiento sencillo y separación correcta de responsabilidades.

---

# Estructura general
misti-cuy/

├── docs/
│
├── public/
│
├── src/
│
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .env.local

---

# Carpeta src

La carpeta principal del desarrollo.

Contendrá toda la lógica de la aplicación.
src/

├── app/
├── components/
├── features/
├── services/
├── hooks/
├── types/
├── utils/
├── config/
├── constants/
├── providers/
├── context/
├── database/
├── seo/
└── lib/

---

# src/app

Responsabilidad:

Manejar las rutas y páginas de Next.js.

Aquí estarán las vistas que verá el usuario.

Ejemplo:
src/app/

├── page.tsx
├── catalogo/
├── aprende/
├── videos/
├── nosotros/
└── contacto/
---

# src/components

Componentes visuales reutilizables.

Ejemplos:

- Botones.
- Tarjetas.
- Navbar.
- Footer.
- Modales.

Estructura:
components/

├── ui/
└── layout/

---

# src/features

Módulos principales del negocio.

Cada funcionalidad importante tendrá su propio espacio.

Ejemplo:
features/

├── home/
├── catalog/
├── learning/
├── videos/
├── contact/
└── admin/

---

# src/services

Comunicación con servicios externos.

Ejemplo:

- Supabase.
- APIs.
- Consultas de datos.

Archivos:
services/

├── catalogService.ts
└── contentService.ts

---

# src/hooks

Funciones reutilizables de React.

Ejemplo:
hooks/

├── useFilters.ts
└── useMediaQuery.ts

---

# src/types

Definiciones de tipos TypeScript.

Ejemplo:
types/

├── catalog.ts
├── content.ts
└── database.ts

---

# src/utils

Funciones auxiliares.

Ejemplo:
utils/

├── whatsappLink.ts
├── formatters.ts
└── validators.ts

---

# src/config

Configuraciones generales.

Ejemplo:
config/

├── site.ts
├── navigation.ts
└── metadata.ts

---

# src/constants

Valores que no cambian frecuentemente.

Ejemplo:
constants/

├── breeds.ts
├── categories.ts
└── colors.ts
---

# src/database

Documentación y configuración de base de datos.

Ejemplo:
database/

├── migrations/
├── schema/
└── seeds/
---

# src/providers

Proveedores globales de React.

Ejemplo:

- Tema.
- Sesión.
- Notificaciones.

---

# src/context

Estados globales compartidos.

Ejemplo:

- Usuario.
- Catálogo.
- Filtros.

---

# src/seo

Optimización para buscadores.

Contendrá:

- Metadata.
- Sitemap.
- Robots.
- Datos estructurados.

---

# src/lib

Configuraciones de librerías externas.

Ejemplo:
lib/

└── supabase.ts
---

# Reglas de organización

## Regla 1

No colocar código sin saber su responsabilidad.

---

## Regla 2

Las páginas no deben contener toda la lógica.

La lógica debe separarse en:

- Components.
- Features.
- Services.

---

## Regla 3

Los componentes deben poder reutilizarse.

---

## Regla 4

Cada nueva funcionalidad debe analizar dónde pertenece antes de crear archivos.

---

# Estado actual

Documentación creada:

✅ MASTER_PLAN_MISTI_CUY.md

✅ DECISIONES_TECNICAS_MISTI_CUY.md

✅ GUIA_DESARROLLO_MISTI_CUY.md

⬜ ESTRUCTURA_PROYECTO_MISTI_CUY.md


# Próximo paso

Después de completar la documentación inicial:

1. Configurar Visual Studio Code.
2. Instalar extensiones.
3. Crear proyecto Next.js.
4. Ejecutar primera versión local.