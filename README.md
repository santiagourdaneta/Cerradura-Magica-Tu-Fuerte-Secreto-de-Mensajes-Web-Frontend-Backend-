
# ✨ Cerradura Mágica: Tu Fuerte Secreto de Mensajes Web (Frontend + Backend)

-----

## 📄 Descripción del Proyecto

**Cerradura Mágica** es una aplicación web completa (Full-Stack) que te permite enviar y recibir **mensajes secretos de forma segura y privada**. Construida con **Node.js y Express** en el backend para gestionar los datos, y un frontend moderno con **HTML, CSS (Pico.css) y JavaScript**, esta aplicación simula un fuerte digital donde solo tú decides quién tiene acceso a tus comunicaciones.

El proyecto incluye:

* **Backend Robusto**: Desarrollado con Express.js, maneja las solicitudes de los clientes para **guardar y recuperar mensajes** de forma segura, almacenándolos en un archivo `JSON` local.

* **Frontend Intuitivo**: Una interfaz de usuario limpia y responsiva, diseñada con el minimalista framework **Pico.css**, que facilita el envío y la visualización de mensajes.

* **Seguridad Mejorada**: Implementa **CORS** para restringir el acceso a la API, permitiendo la comunicación solo desde dominios autorizados (tu propia aplicación).

* **Pruebas Exhaustivas**: Incluye pruebas unitarias para el backend con **Jest** y pruebas de extremo a extremo para el frontend con **Cypress**, asegurando la fiabilidad y el correcto funcionamiento de todas las funcionalidades.

Este proyecto es ideal para aprender sobre el desarrollo web Full-Stack, la **seguridad básica de APIs (CORS)** y las **pruebas automatizadas** de aplicaciones web.

-----

## 🌟 Características Destacadas

* **Envío y Recepción de Mensajes**: Interfaz simple para interactuar con los mensajes.

* **Almacenamiento Local**: Mensajes persistentes guardados en `mensajes.json`.

* **Diseño Moderno y Responsivo**: Gracias a Pico.css.

* **Seguridad CORS**: Control de acceso a la API.

* **Backend con Node.js/Express**: Manejo eficiente de solicitudes HTTP.

* **Frontend con HTML/CSS/JS**: Experiencia de usuario directa.

* **Pruebas Automatizadas**:

* **Jest**: Para el backend (servidor).

* **Cypress**: Para el frontend (interfaz de usuario).

-----

## 🚀 Cómo Empezar (Setup Local)

Para poner en marcha tu propio Fuerte Secreto de Mensajes:

1. **Clona el Repositorio:**

```bash

git clone https://github.com/santiagourdaneta/Cerradura-Magica-Tu-Fuerte-Secreto-de-Mensajes-Web-Frontend-Backend-/

cd Cerradura-Magica-Tu-Fuerte-Secreto-de-Mensajes-Web-Frontend-Backend-

```

*(Recuerda cambiar `tu-usuario` por tu nombre de usuario de GitHub)*

2. **Instala Dependencias:**

```bash

npm install

```

3. **Inicia el Robot Guardián (Backend):**

Abre una Terminal y ejecuta:

```bash

node server.js

```

Verás `Robot escuchando en la puerta http://localhost:3000`. Mantén esta Terminal abierta.

4. **Accede a la Pantalla de Control (Frontend):**

Abre tu navegador web y ve a `http://localhost:3000`.

-----

## 🧪 Ejecutando las Pruebas

### Pruebas de Backend (Jest)

Asegúrate de que el servidor no esté corriendo (`Ctrl+C` en la Terminal del robot si está activo).

```bash

npm test

```

### Pruebas de Frontend (Cypress)

1. Asegúrate de que el Robot Guardián esté corriendo (`node server.js`).

2. Abre una **nueva Terminal** y ejecuta:

```bash

npx cypress open

```

3. En la interfaz de Cypress, selecciona "E2E Testing" y haz clic en `mensajes.cy.js` para ver las pruebas en acción.

-----

## 🛠️ Tecnologías Utilizadas

* **Backend**: Node.js, Express.js

* **Frontend**: HTML5, CSS3 (Pico.css), JavaScript

* **Testing**: Jest (Backend), Cypress (Frontend E2E)

* **Gestión de Paquetes**: npm

-----

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes ideas para mejorar la "Cerradura Mágica", ¡no dudes en abrir un *issue* o enviar un *pull request*!

-----




