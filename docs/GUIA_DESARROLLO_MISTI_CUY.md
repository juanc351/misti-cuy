# GUIA DE DESARROLLO - MISTI CUY

## Propósito

Este documento define la metodología de trabajo utilizada para construir la plataforma digital Misti Cuy.

El objetivo es desarrollar un producto profesional utilizando buenas prácticas de ingeniería de software.

---

# 1. Metodología de Desarrollo

El proyecto será construido por fases.

Cada fase debe:

1. Tener un objetivo definido.
2. Ser implementada.
3. Ser probada.
4. Ser validada.
5. Ser documentada.

No se avanzará a una nueva fase sin comprobar que la anterior funciona correctamente.

---

# 2. Flujo de Trabajo con Inteligencia Artificial

La inteligencia artificial será utilizada como herramienta de apoyo.

Herramientas:

- ChatGPT.
- Gemini.

Funciones:

- Análisis de arquitectura.
- Generación de código.
- Revisión técnica.
- Documentación.
- Solución de errores.

---

# 3. Proceso para generar código

El flujo será:

## Paso 1

Definir qué se necesita construir.

Ejemplo:

Crear componente de tarjeta de producto para mostrar cuyes.

---

## Paso 2

Crear un prompt detallado.

El prompt debe indicar:

- Objetivo.
- Tecnología utilizada.
- Restricciones.
- Ubicación del archivo.
- Resultado esperado.

---

## Paso 3

Revisión del resultado.

Antes de copiar código:

Se revisará:

- Calidad.
- Seguridad.
- Compatibilidad.
- Arquitectura.

---

## Paso 4

Implementación.

El código aprobado será agregado al proyecto.

---

# 4. Organización del Código

Reglas:

## Componentes

Los componentes reutilizables estarán en:

src/components/

Ejemplos:

- Botones.
- Tarjetas.
- Formularios.
- Navbar.
- Footer.

---

## Funcionalidades

Cada módulo de negocio estará separado:

src/features/


Ejemplos:

- Catálogo.
- Videos.
- Educación.
- Contacto.

---

## Servicios

La comunicación con bases de datos estará separada:
src/services/
No se mezclará lógica de negocio con diseño visual.

---

# 5. Reglas de Programación

## Código limpio

El código debe ser:

- Legible.
- Ordenado.
- Documentado cuando sea necesario.
- Fácil de mantener.

---

## Evitar duplicación

Antes de crear algo nuevo:

Comprobar si ya existe un componente reutilizable.

---

## Mobile First

Todo diseño debe comenzar pensando en celulares.

Después se adapta a:

- Tablets.
- Computadoras.

---

# 6. Pruebas

Antes de considerar terminado un módulo:

Se debe comprobar:

## Funcionalidad

¿Hace lo que debe hacer?

## Diseño

¿Se visualiza correctamente?

## Responsive

¿Funciona en diferentes tamaños?

## Rendimiento

¿Carga rápido?

---

# 7. Control de Versiones

Se utilizará Git.

Cada cambio importante debe tener un registro.

Ejemplo:
git commit -m "Crear estructura inicial del proyecto"

Los mensajes deben explicar claramente qué cambio se realizó.

---

# 8. Entornos del Proyecto

Existirán tres ambientes:

## Desarrollo

Uso local.

Ejemplo:
ocalhost:3000

---

## Pruebas

Validación antes de publicar.

---

## Producción

Página disponible para clientes.

---

# 9. Seguridad

Consideraciones:

- No publicar claves privadas.
- Utilizar variables de entorno.
- Proteger rutas administrativas.
- Validar información recibida.
- Mantener dependencias actualizadas.

---

# 10. Comunicación del Proyecto

Cuando se solicite ayuda técnica:

Siempre indicar:

- Qué se quiere lograr.
- Qué archivo se está modificando.
- Qué error aparece.
- Qué versión de tecnología se utiliza.

---

# 11. Estado Actual

## Completado

✅ Arquitectura definida.

✅ Plan de desarrollo creado.

✅ Documentación inicial creada.

✅ Node.js instalado.

✅ npm funcionando.

✅ Git instalado.


## Pendiente

⬜ Configuración de Visual Studio Code.

⬜ Instalación de extensiones.

⬜ Creación del proyecto Next.js.

⬜ Primera ejecución en navegador.

---

# 12. Objetivo Final

Construir una plataforma profesional para Misti Cuy que permita:

- Mostrar productos.
- Captar clientes.
- Educar sobre crianza.
- Crear confianza.
- Escalar la marca digitalmente.
