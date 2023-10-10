const express = require("express");
const bodyParser = require("body-parser");
const { validationResult } = require("express-validator");

const app = express();
const db = require("./queries");
const {
    validateCreateClient,
    validateUpdateClient,
    validateCreateProduct,
    validateUpdateProduct,
} = require("./validations");
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

// Home
app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
});

// 1
// Dar de alta a nuevos clientes, baja y modificacion de los ya existentes
app.post("/clients", validateCreateClient, (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    db.createClient(request, response);
});

app.put("/clients/:id", validateUpdateClient, (request, response) => {
    if (isNaN(request.params.id) || request.params.id < 0) {
        return response.status(400).send("Invalid ID");
    }

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    db.updateClient(request, response);
});

app.delete("/clients/:id", (request, response) => {
    if (isNaN(request.params.id) || request.params.id < 0) {
        return response.status(400).send("Invalid ID");
    }

    db.deleteClient(request, response);
});

// 2
// Dar de alta nuevos productos y modificacion de los ya existentes.
// Tenga en cuenta que el precio de un producto es sin IVA.
app.post("/products", validateCreateProduct, (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    db.createProduct(request, response);
});

app.put("/products/:id", validateUpdateProduct, (request, response) => {
    if (isNaN(request.params.id) || request.params.id < 0) {
        return response.status(400).send("Invalid ID");
    }

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    db.updateProduct(request, response);
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
