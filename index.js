const express = require("express"); // Importa el módulo Express para crear el servidor.
const app = express(); // Crea una instancia de una aplicación Express.
const port = 3000; // Define el puerto en el que el servidor escuchará las solicitudes.
const cors = require("cors");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler"); // Importa los middleware para manejo de errores.

const routerApi = require("./routes/v1"); // Importa el enrutador de la API desde el archivo especificado.

app.use(express.json()); // Middleware para analizar cuerpos de solicitud en formato JSON.

const whitelist = ["http://localhost:8080", "*"]; // Define una lista blanca de orígenes permitidos para CORS.
const options = {
  origin: (origin, callback) => {
    // Define las opciones de CORS.
    if (whitelist.includes(origin) || !origin) {
      // Si el origen está en la lista blanca, permite el acceso.
      callback(null, true);
    } else {
      // Si no, devuelve un error.
      callback(new Error("Acceso no permitido desde esta dirección"));
    }
  },
};

app.use(cors(options)); // Aplica las opciones de CORS a todas las rutas de la aplicación.

routerApi(app); // Llama a la función para registrar las rutas de la API en la aplicación.

app.use(logErrors); // Middleware para registrar errores.
app.use(boomErrorHandler); // Middleware específico para manejar errores de Boom.
app.use(errorHandler); // Middleware general para manejar errores.

app.listen(port, () => {
    // Inicia el servidor y escucha en el puerto especificado.
  });