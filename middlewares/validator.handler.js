const boom = require("@hapi/boom"); // Importa Boom para manejar errores HTTP.
const Joi = require("joi");
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]; // Obtiene los datos de la solicitud en la propiedad especificada (body, params, etc.).
    const { error } = schema.validate(data, { abortEarly: false }); // Valida los datos usando el esquema proporcionado.

    if (error) {
      next(boom.badRequest(error)); // Si hay errores de validación, pasa un error de Boom al siguiente middleware.
    } else {
      next(); // Si no hay errores, continúa con el siguiente middleware.
    }
  };
}

module.exports = validatorHandler; // Exporta la función validatorHandler.
