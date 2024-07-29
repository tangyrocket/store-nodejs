const express = require('express'); // Importa el módulo Express.

const productsRouter = require('./products.router'); // Importa el enrutador de productos.

function routerApi(app) {
  const router = express.Router(); // Crea una nueva instancia del enrutador de Express.

  app.use('/api/v1', router); // Define el prefijo '/api/v1' para todas las rutas manejadas por este enrutador.
  router.use('/products', productsRouter); // Define el prefijo '/products' para las rutas manejadas por el enrutador de productos.
}

module.exports = routerApi; // Exporta la función routerApi para que pueda ser utilizada en otras partes de la aplicación.
