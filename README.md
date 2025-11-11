# e-Retro-Leyends

Un e-commerce de coleccionables retro construido con PERN (PostgreSQL, Express, React, Node.js).

Grupo: DoubleCommit
Integrantes:

- Cecilia Olejarczyk
- Franco Morales
- Gabriel Calcagni

## Link al drive con el video demostrativo

* **https://drive.google.com/drive/folders/1Axln-fyaAM2L-uT-8ejoLsbAzE-4iBIt?usp=sharing**

## Descripción

e-Retro Legends es una plataforma de comercio electrónico especializada en la compra y venta de artículos deportivos retro y coleccionables. Conecta a compradores y vendedores en un ecosistema seguro y fácil de usar, ofreciendo una experiencia robusta y moderna.
La plataforma permite a los usuarios actuar como compradores (buyers) o vendedores (sellers), con funcionalidades específicas para cada rol.

## Características principales

## Estilo Retro (eBay 2000s)

Para lograr el estilo de eBay de los 2000s, se investigarán las características visuales de esa época:

- **Paleta de colores:** Colores primarios, tonos grises, bordes definidos.
- **Tipografía:** Fuentes sans-serif comunes de la época (Arial, Verdana, Tahoma).
- **Bordes y Sombras:** Bordes pronunciados, sombras sutiles o difuminadas.
- **Diseño:** Layouts basados en tablas (aunque se implementarán con flexbox/grid para modernidad), elementos con gradientes sutiles, iconos pixelados.

## Páginas Principales

- **Públicas:** Home, Listado de Productos, Detalle de Producto, Login, Register, Acerca de, Contacto.
- **Comprador:** Carrito de Compras, Finalizar Compra (Checkout), Historial de Pedidos, Perfil.
- **Vendedor:** Dashboard, Gestión de Productos (Añadir, Editar, Eliminar), Gestión de Pedidos, Perfil de Vendedor.

### Para Compradores

**Búsqueda y Filtrado:** Buscar productos por nombre, categoría y descripción con búsqueda normalizadora de acentos
- **Categorías:** Fútbol, Basketball, Tenis, Baseball y Otros Deportes
- **Carrito de Compras:** Gestión completa del carrito con validación de stock
- **Checkout:** Proceso de compra seguro en 3 pasos (Envío → Pago → Revisión)
- **Historial de Órdenes:** Visualización de compras realizadas
- **Detalle de Productos:** Información completa incluyendo galería de imágenes, especificaciones y valoraciones

### Para Vendedores

* **Dashboard Personalizado:** Estadísticas de ventas, pedidos pendientes y productos activos
* **Gestión de Inventario:** Crear, editar y eliminar productos
* **Formulario de Productos:** Información completa: nombre, descripción, precio, stock, condición, envío
* **Gestión de Pedidos:** Ver órdenes recientes y su estado
* **Análisis:** Productos más vendidos y estadísticas en tiempo real

### General

* **Autenticación Segura:** Login/Register con validación de credenciales
* **Protección de Rutas:** Rutas protegidas según rol de usuario
* **Envíos:** Sistema flexible de envío con costos configurables
* **Condiciones de Productos:** Nuevo, Usado (Excelente/Muy Bueno/Bueno), Réplica, Coleccionable
* **Política de Privacidad y Términos:** Documentación legal completa


## Tecnologías Utilizadas

*   **PostgreSQL:** Base de datos relacional para almacenamiento persistente de datos.
*   **Express:** Framework de Node.js para construir el backend de la aplicación.
*   **React:** Biblioteca de JavaScript para construir la interfaz de usuario.
*   **Node.js:** Entorno de ejecución de JavaScript para el backend.
*   **Mercado Pago:** Plataforma de pagos para procesar transacciones de forma segura.
*   **Tailwind CSS:** Framework CSS utility-first para estilos.
*   **React Router:** Para la navegación entre páginas.
*   **Context API:** Para gestión de estado global.
*   **Axios/Fetch:** Para la comunicación con el backend (cuando se conecte).


## Autenticación y Seguridad

* **Cookies HTTPOnly** - Almacenamiento seguro de tokens
- **Encriptación SSL** - Datos en tránsito
- **Validación de Formularios** - Frontend y backend

## Estructura del Proyecto

La estructura del proyecto está organizada en módulos para facilitar el mantenimiento y la escalabilidad.

*   **Backend (Express/Node):**
    *   `src/routes`: Define las rutas de la API.
    *   `src/controllers`: Contiene la lógica de control para cada ruta.
    *   `src/models`: Define los modelos de datos para interactuar con la base de datos PostgreSQL.
    *   `src/config`: Archivos de configuración para la aplicación.
    *   `src/middleware`: Middeware para autenticacion
*   **Frontend (React):**
    *   `src/components`: Componentes reutilizables de la interfaz de usuario.
    *   `src/pages`: Páginas principales de la aplicación.
    *   `src/context`:  Contextos para gestionar el estado de la aplicación (ej: carrito, autenticación).
    *   `src/services`:  Funciones para interactuar con el backend.

## 🔐 Autenticación y Autorización

### Flujo de Autenticación
1. Usuario se registra con email, contraseña y rol (buyer/seller)
2. Backend valida y almacena en PostgreSQL (contraseña encriptada)
3. Se genera cookie HTTPOnly con token de sesión
4. Usuario puede acceder a rutas protegidas según su rol

## 🛒 Sistema de Carrito

### CartContext
- Manejo de estado local con localStorage
- Validación automática de stock
- Métodos:
  - `addToCart(product, quantity)` - Agregar con validación
  - `removeFromCart(productId)` - Eliminar producto
  - `updateQuantity(productId, quantity)` - Actualizar cantidad
  - `getCartTotal()` - Calcular total
  - `clearCart()` - Vaciar carrito

### Características
- Stock dinámico (evita sobre-venta)
- Cálculo automático de impuestos (10%)
- Envío gratis para compras > $45000
- Persistencia con localStorage

## 📦 Gestión de Productos

### Estructura de Producto
```javascript
{
  id: UUID,
  name: string,
  description: string,
  price: number,
  originalPrice: number (opcional),
  stock: number,
  category: 'futbol' | 'basketball' | 'tenis' | 'baseball' | 'otros',
  condition: 'nuevo' | 'usado-excelente' | 'usado-muy-bueno' | 'usado-bueno' | 'replica' | 'coleccionable',
  brand: string,
  year: string,
  size: string,
  color: string,
  images: string[] (URLs),
  shipping: 'free' | number,
  seller: string,
  seller_id: UUID,
  category: string
}
```

### Funcionalidades
- Búsqueda normalizada (sin acentos)
- Filtrado por categoría
- Edición de productos (solo dueño)
- Eliminación de productos
- Galerías de imágenes
- Descuentos automáticos

## Instrucciones de Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL del repositorio]
    ```
2.  **Navegar al directorio del proyecto:**
    ```bash
    cd e-retro-leyends
    ```
3.  **Instalar las dependencias del backend:**
    ```bash
    cd backend
    npm install
    ```
4.  **Instalar las dependencias del frontend:**
    ```bash
    cd ../frontend
    npm install
    ```
5.  **Configurar la base de datos PostgreSQL:**
    *   Crear una base de datos con el nombre `e_retro_leyends`.
    *   Actualizar el archivo de configuración del backend (`.env`) con las credenciales de la base de datos.
6.  **Iniciar el servidor:**
    *   En el directorio del backend:
        ```bash
        npm start
        ```
    *   En el directorio del frontend:
        ```bash
        npm start
        ```

## 📝 Consideraciones Importantes

1. **Autenticación:** Las credenciales se envían en cookies HTTPOnly seguras
2. **Storage:** El carrito se persiste en localStorage del navegador
3. **Validación:** Se valida tanto en frontend como en backend
4. **Imágenes:** Se almacenan URLs en la BD (no archivos directos)
5. **Búsqueda:** Normaliza acentos para mejor UX


## Consideraciones Adicionales

*   La integración con Mercado Pago requiere la configuración de una cuenta de desarrollador y la obtención de las credenciales necesarias.
