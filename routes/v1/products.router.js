const express = require("express"); // Importa el módulo Express.
const ProductsService = require("../../services/products.services"); // Importa el servicio de productos.
const validatorHandler = require("../../middlewares/validator.handler"); // Importa el middleware para validación de datos.

const {
  createProcedureSchema,
  updateProcedureSchema,
  getProcedureSchema,
  deleteProcedureSchema
} = require("../../schemas/product.schema"); // Importa los esquemas de validación para productos.

const router = express.Router(); // Crea una nueva instancia del enrutador de Express.
const service = new ProductsService(); // Crea una instancia del servicio de productos.

router.get("/", async (req, res) => {
  // Maneja las solicitudes GET a la ruta '/api/v1/products'.
  const products = await service.find(); // Obtiene la lista de productos del servicio.
  res.json(products); // Devuelve la lista de productos en formato JSON.
});

router.get(
  "/:id",
  validatorHandler(getProcedureSchema, "params"), // Valida el ID del producto en los parámetros de la solicitud.
  async (req, res, next) => {
    // Maneja las solicitudes GET a la ruta '/api/v1/products/:id'.
    try {
      const { id } = req.params; // Extrae el ID del producto de los parámetros.
      const product = await service.findOne(id); // Busca el producto por ID usando el servicio.
      res.json(product); // Devuelve el producto encontrado en formato JSON.
    } catch (e) {
      next(e); // Pasa el error al siguiente middleware para su manejo.
    }
  }
);

router.post(
  "/",
  validatorHandler(createProcedureSchema, "body"), // Valida los datos del nuevo producto en el cuerpo de la solicitud.
  async (req, res) => {
    // Maneja las solicitudes POST a la ruta '/api/v1/products'.
    const body = req.body; // Extrae los datos del nuevo producto del cuerpo de la solicitud.
    const newProduct = await service.create(body); // Crea un nuevo producto usando el servicio.
    res.status(201).json(newProduct); // Devuelve el nuevo producto en formato JSON con el estado 201 (creado).
  }
);

router.patch(
  "/:id",
  validatorHandler(getProcedureSchema, "params"), // Valida el ID del producto en los parámetros de la solicitud.
  validatorHandler(updateProcedureSchema, "body"), // Valida los datos de actualización en el cuerpo de la solicitud.
  async (req, res, next) => {
    // Maneja las solicitudes PATCH a la ruta '/api/v1/products/:id'.
    try {
      const body = req.body; // Extrae los datos de actualización del cuerpo de la solicitud.
      const { id } = req.params; // Extrae el ID del producto de los parámetros.
      const product = await service.update(id, body); // Actualiza el producto usando el servicio.
      res.json(product); // Devuelve el producto actualizado en formato JSON.
    } catch (e) {
      next(e); // Pasa el error al siguiente middleware para su manejo.
    }
  }
);

router.delete('/:id', async (req, res) => {
  // Maneja las solicitudes DELETE a la ruta '/api/v1/products/:id'.
  const { id } = req.params; // Extrae el ID del producto de los parámetros.
  const rpta = await service.delete(id); // Elimina el producto usando el servicio.
  res.json(rpta); // Devuelve la respuesta de eliminación en formato JSON.
});

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación.
