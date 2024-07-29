const Joi = require("joi");


const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(10).max(60);
const price = Joi.number().precision(2).min(0);
const category = Joi.number().integer();
const stock = Joi.number().integer();
const sku = Joi.string().length(7);
const state = Joi.boolean();
const isBlock = Joi.boolean();

const createProcedureSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  category: category.required(),
  stock: stock.required(),
  sku: sku.required(),
  state: state.required(),
  isBlock: isBlock.required(),
});

const updateProcedureSchema = Joi.object({
  name: name,
  description: description,
  price: price,
  category: category,
  stock: stock,
  sku: sku,
  state: state,
  isBlock: isBlock,
});

const deleteProcedureSchema = Joi.object({
    id: id.required()
});

const getProcedureSchema = Joi.object({
  id: id.required()
});


module.exports = {createProcedureSchema, updateProcedureSchema, deleteProcedureSchema, getProcedureSchema};