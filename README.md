# Proyecto Integrador Final (PERN) • UTN-FRSR Cohorte 2024

Grupo: Double Commit

Integrantes:
- Cecilia Olejarczik
- Franco Morales
- Gabriel Calcagni

## Plan de Arquitectura y Estructura del Proyecto 'e-Retro Legends'

## 1. Estructura de Carpetas

Se propone una estructura de carpetas modular y escalable, siguiendo las buenas prácticas de React:

```
src/
├── assets/ (Imágenes, iconos, fuentes)
├── components/ (Componentes reutilizables y atómicos)
│   ├── common/ (Botones, inputs, modales, etc.)
│   ├── layout/ (Header, Footer, Sidebar)
│   └── specific/ (Componentes más complejos)
├── contexts/ (Context API para manejo de estado global)
├── hooks/ (Custom Hooks)
├── pages/ (Vistas principales de la aplicación)
│   ├── Auth/ (Login, Register)
│   ├── Buyer/ (Home, ProductDetail, Cart, Checkout, OrderHistory)
│   ├── Seller/ (Dashboard, ProductManagement, OrderManagement)
│   └── Public/ (About, Contact, etc.)
├── services/ (Interacción con APIs, por ejemplo, el backend del usuario)
├── styles/ (Configuración de Tailwind CSS, estilos globales)
├── utils/ (Funciones de utilidad, helpers)
├── App.js (Componente principal)
├── index.js (Punto de entrada de la aplicación)
├── routes.js (Definición de rutas con React Router)
└── tailwind.config.js
```

## 2. Componentes y Sistema de Diseño

Se utilizará una aproximación basada en componentes con Tailwind CSS para un desarrollo rápido y consistente. Los componentes se dividirán en:

*   **Atómicos:** Elementos básicos como botones, campos de entrada, tarjetas de producto.
*   **Moléculas:** Combinación de atómicos, como un formulario de login o una barra de búsqueda.
*   **Organismos:** Secciones completas de la interfaz, como el header o el footer.
*   **Plantillas:** Diseños de página sin contenido real, solo la estructura.
*   **Páginas:** Instancias de plantillas con contenido real.

## 3. Enrutamiento (React Router)

Se configurará React Router para manejar las diferentes vistas de la aplicación, incluyendo rutas protegidas para los paneles de comprador y vendedor. Se definirán rutas anidadas donde sea necesario.

## 4. Gestión de Estado

Para la gestión de estado se considerará el uso de React Context API para estados globales (autenticación, carrito de compras) y `useState`/`useReducer` para estados locales de componentes.

## 5. Estilo Retro (eBay 2000s)

Para lograr el estilo de eBay de los 2000s, se investigarán las características visuales de esa época:

*   **Paleta de colores:** Colores primarios, tonos grises, bordes definidos.
*   **Tipografía:** Fuentes sans-serif comunes de la época (Arial, Verdana, Tahoma).
*   **Bordes y Sombras:** Bordes pronunciados, sombras sutiles o difuminadas.
*   **Diseño:** Layouts basados en tablas (aunque se implementarán con flexbox/grid para modernidad), elementos con gradientes sutiles, iconos pixelados.

## 6. Páginas Principales

*   **Públicas:** Home, Listado de Productos, Detalle de Producto, Login, Register, Acerca de, Contacto.
*   **Comprador:** Carrito de Compras, Finalizar Compra (Checkout), Historial de Pedidos, Perfil.
*   **Vendedor:** Dashboard, Gestión de Productos (Añadir, Editar, Eliminar), Gestión de Pedidos, Perfil de Vendedor.

## 7. Tecnologías

*   **React:** Biblioteca principal para la interfaz de usuario.
*   **Tailwind CSS:** Framework CSS utility-first para estilos.
*   **React Router:** Para la navegación entre páginas.
*   **Context API:** Para gestión de estado global.
*   **Axios/Fetch:** Para la comunicación con el backend (cuando se conecte).

Este plan servirá como guía para la implementación de la aplicación 'e-Retro Legends'.
# e-retro-legends-double-commit
