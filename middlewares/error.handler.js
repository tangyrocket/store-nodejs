function logErrors(err, req, res, next) {
    console.error(err); // Imprime el error en la consola para registro.
    next(err); // Pasa el error al siguiente middleware.
  }
  
  function errorHandler(err, req, res, next) {
    res.status(500).json({
      message: err.message, // Devuelve un mensaje de error.
      stack: err.stack // Devuelve la pila de llamadas del error.  
    });
    next(err); // Pasa el error al siguiente middleware, si es necesario.
  }
  
  function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
      // Verifica si el error es un error de Boom.
      const { output } = err;
      res.status(output.statusCode).json(output.payload); // Responde con el código de estado y la carga útil del error Boom.
    } else {
      next(err); // Si no es un error de Boom, pasa el error al siguiente middleware.
    }
  }
  
  module.exports = {
    logErrors, // Exporta la función logErrors.
    errorHandler, // Exporta la función errorHandler.
    boomErrorHandler, // Exporta la función boomErrorHandler.
  };
  