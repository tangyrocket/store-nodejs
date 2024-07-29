const { faker } = require("@faker-js/faker"); // Importa Faker para generar datos falsos.
const boom = require("@hapi/boom"); // Importa Boom para manejar errores HTTP personalizados.

class ProductsService {
  constructor() {
    this.products = []; // Inicializa un array vacío para almacenar productos.
    this.currentId = 1;
    this.generate(); // Llama al método generate para llenar el array con productos falsos.
  }
  /**
   * Genera una lista inicial de productos falsos.
   * Cada producto tiene un ID único, un nombre y un estado de bloqueo.
   */
  generate() {
    const limit = 20; // Define el límite de productos a generar.
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: this.currentId++, // Genera un UUID único para el producto.
        name: faker.animal.type(), // Genera un nombre de producto falso.
        isBlock: faker.datatype.boolean(), // Genera un estado de bloqueo falso.
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(), // Genera un UUID único para el nuevo producto.
      ...data, // Añade los datos proporcionados al nuevo producto.
    };
    this.products.push(newProduct); // Añade el nuevo producto a la lista.
    return newProduct; // Devuelve el nuevo producto.
  }


  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products); // Resuelve la promesa con la lista de productos después de un retraso de 1 segundo.
      }, 1000);
    });
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id == id); // Busca el producto por su ID.
    if (!product) {
      throw boom.notFound("Product not found"); // Lanza un error 404 si el producto no se encuentra.
    }
    if (product.isBlock) {
      throw boom.conflict("Product is block"); // Lanza un error 409 si el producto está bloqueado.
    } else {
      return product; // Devuelve el producto encontrado.
    }
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id == id); // Encuentra el índice del producto a actualizar.
    if (index === -1) {
      throw boom.notFound("Product not found"); // Lanza un error 404 si el producto no se encuentra.
    }

    const product = this.products[index]; // Obtiene el producto actual.
    this.products[index] = {
      ...product, // Mantiene los datos del producto actual.
      ...changes, // Aplica los cambios proporcionados.
    };
    return this.products[index]; // Devuelve el producto actualizado.
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id == id); // Encuentra el índice del producto a eliminar.
    if (index === -1) {
      throw new Error("Product not found"); // Lanza un error si el producto no se encuentra.
    }
    this.products.splice(index, 1); // Elimina el producto de la lista.
    return { id }; // Devuelve el ID del producto eliminado.
  }
}

module.exports = ProductsService; // Exporta la clase ProductsService.
