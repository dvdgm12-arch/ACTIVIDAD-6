### Criterio 1
Creación del proyecto.
// Lanzamos ng new ACTIVIDAD 6 y abrimos repositorio local en GITKRAKEN. Commit inicial. ✅

// npm install bootstrap y añadido en angular.json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
] ✅

// Test BOOTSTRAP realizado correctamente en index.html:  <button class="btn-primary">Test Bootstrap</button> ✅


### Criterio 2
Creación de rutas y componentes.
// Componente FIJO HEADER en carpeta componentes ✅

    // Componentes VISUALES en páginas: ✅
        - USER-LIST
        - USER-VIEW
        - USER-FORM

            - Componente HIJO OPCIONAL EN EL FIJO USER-CARD ✅

// CREACION Y CONFIGURACION DEL SISTEMA DE RUTAS EN APP-routing.module.ts ✅


### Criterio 3
Creación de interfaces y servicios para conectar al api.
//crear interfaz interfaces/user.interface.ts ✅

  //definir interfaz con su logica y su contrato ✅

//crear el servicio que usara httpclient para las peticiones ng g s services/users ✅

  // definir el servicio ✅

// Añadir el import de Provide HTTP en app.config.ts ✅

// definir los metodos del servicio para conectar con la API ⚠️


### Criterio 4
Vista home con la carga de todos los usuarios.
//Chasis basico .html ✅

### Criterio 5
Vista detalle del usuario con todos sus datos y los botones correspondientes.
//Chasis basico .html ✅
// Maquetación básica ✅

### Criterio 5
Vista detalle del usuario con todos sus datos y los botones correspondientes.
// Maquetación básica ✅

### Criterio 6
Vista formulario de nuevo registro de usuario y su funcionalidad conectada con el api.

### Criterio 7
Actualización del usuario reutilizando el componente formulario del registro y conectarlo correctamente con el api.




