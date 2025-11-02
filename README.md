# e-Retro-Leyends

Un e-commerce de coleccionables retro construido con PERN (PostgreSQL, Express, React, Node.js).

Grupo: DoubleCommit

## Descripción

e-retro-leyends es una plataforma de comercio electrónico diseñada para la venta de coleccionables retro.  Utiliza un stack PERN para ofrecer una experiencia robusta, escalable y moderna tanto para administradores como para usuarios.

## Características

*   **Autenticación de usuarios:** Registro e inicio de sesión seguros.
*   **Gestión de productos:**  Agregar, editar y eliminar productos.
*   **Carrito de compras:**  Permite a los usuarios agregar productos a un carrito y gestionar sus selecciones.
*   **Proceso de pago:** Integración con Mercado Pago para transacciones seguras.
*   **Gestión de pedidos:**  Administración de pedidos, incluyendo seguimiento del estado.
*   **Diseño responsivo:**  Compatible con una variedad de dispositivos.

## Tecnologías Utilizadas

*   **PostgreSQL:** Base de datos relacional para almacenamiento persistente de datos.
*   **Express:** Framework de Node.js para construir el backend de la aplicación.
*   **React:** Biblioteca de JavaScript para construir la interfaz de usuario.
*   **Node.js:** Entorno de ejecución de JavaScript para el backend.
*   **Mercado Pago:** Plataforma de pagos para procesar transacciones de forma segura.

## Estructura del Proyecto

La estructura del proyecto está organizada en módulos para facilitar el mantenimiento y la escalabilidad.

*   **Backend (Express/Node):**
    *   `src/routes`: Define las rutas de la API.
    *   `src/controllers`: Contiene la lógica de control para cada ruta.
    *   `src/models`: Define los modelos de datos para interactuar con la base de datos PostgreSQL.
    *   `src/config`: Archivos de configuración para la aplicación.
*   **Frontend (React):**
    *   `src/components`: Componentes reutilizables de la interfaz de usuario.
    *   `src/pages`: Páginas principales de la aplicación.
    *   `src/context`:  Contextos para gestionar el estado de la aplicación (ej: carrito, autenticación).
    *   `src/services`:  Funciones para interactuar con el backend.

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

## Consideraciones Adicionales

*   La integración con Mercado Pago requiere la configuración de una cuenta de desarrollador y la obtención de las credenciales necesarias.