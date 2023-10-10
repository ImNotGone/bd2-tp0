const { body } = require("express-validator");

const validateCreateClient = [
    body("nro_cliente").isInt(),
    body("nombre").isString().notEmpty(),
    body("apellido").isString().notEmpty(),
    body("direccion").isString().notEmpty(),
    body("activo").isInt(),
];

const validateUpdateClient = [
    body("nombre").isString().notEmpty(),
    body("apellido").isString().notEmpty(),
    body("direccion").isString().notEmpty(),
    body("activo").isInt(),
];

const validateCreateProduct = [
    body("codigo_producto").isInt(),
    body("marca").isString().notEmpty(),
    body("nombre").isString().notEmpty(),
    body("descripcion").isString().notEmpty(),
    body("precio").isFloat(),
    body("stock").isInt(),
];

const validateUpdateProduct = [
    body("marca").isString().notEmpty(),
    body("nombre").isString().notEmpty(),
    body("descripcion").isString().notEmpty(),
    body("precio").isFloat(),
    body("stock").isInt(),
];

module.exports = {
    validateCreateClient,
    validateUpdateClient,
    validateCreateProduct,
    validateUpdateProduct,
};
