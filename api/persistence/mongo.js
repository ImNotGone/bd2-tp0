const { MongoClient } = require("mongodb");
mongoURI = "mongodb://localhost:27017";
dbName = "tp0";
const fs = require("fs");

const client = new MongoClient(mongoURI);
const db = client.db(dbName);
const dbConfig = JSON.parse(fs.readFileSync("config.json", "utf8"))["mongo"];
mongoURI = dbConfig["uri"];
dbName = dbConfig["database"];

const createClient = async (request, response) => {
    try {
        const { nro_cliente, nombre, apellido, direccion, activo } = request.body;

        const document = {
            nro_cliente,
            nombre,
            apellido,
            direccion,
            activo,
        };

        const clients = db.collection("clients");

        // Check if client already exists
        const clientExists = await clients.findOne({ nro_cliente: nro_cliente });
        if (clientExists) {
            return response.status(400).send("Client already exists");
        }

        const result = await clients.insertOne(document);

        response.status(201).send("Client added with ID: " + nro_cliente);
    } catch (error) {
        console.error("Error creating client:", error);
        response.status(400).send("Error: " + error.message);
    }
};

const updateClient = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const { nombre, apellido, direccion, activo } = request.body;

        const document = {
            nombre,
            apellido,
            direccion,
            activo,
        };

        const clients = db.collection("clients");
        const result = await clients.updateOne({ nro_cliente: id }, { $set: document });

        if (result.matchedCount === 0) {
            response.status(404).send("Client not found");
        } else {
            response.status(200).send("Client updated with ID: " + id);
        }
    } catch (error) {
        console.error("Error updating client:", error);
        response.status(400).send("Error: " + error.message);
    }
};

const deleteClient = async (request, response) => {
    try {
        const id = parseInt(request.params.id);

        const clients = db.collection("clients");
        const result = await clients.deleteOne({ nro_cliente: id });

        if (result.deletedCount === 0) {
            response.status(404).send("Client not found");
        } else {
            response.status(200).send("Client deleted with ID: " + id);
        }
    } catch (error) {
        console.error("Error deleting client:", error);
        response.status(400).send("Error: " + error.message);
    }
};

const createProduct = async (request, response) => {
    try {
        const { codigo_producto, marca, nombre, descripcion, precio, stock } = request.body;

        const document = {
            codigo_producto,
            marca,
            nombre,
            descripcion,
            precio,
            stock,
        };

        const producto = db.collection("producto");

        // Check if product already exists
        const productExists = await producto.findOne({ codigo_producto: codigo_producto });
        if (productExists) {
            return response.status(400).send("Product already exists");
        }

        const result = await producto.insertOne(document);

        response.status(201).send("Product added with ID: " + codigo_producto);
    } catch (error) {
        console.error("Error creating product:", error);
        response.status(400).send("Error: " + error.message);
    }
};

const updateProduct = async (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const { marca, nombre, descripcion, precio, stock } = request.body;

        const document = {
            marca,
            nombre,
            descripcion,
            precio,
            stock,
        };

        const producto = db.collection("producto");
        const result = await producto.updateOne({ codigo_producto: id }, { $set: document });

        if (result.matchedCount === 0) {
            response.status(404).send("Product not found");
        } else {
            response.status(200).send("Product updated with ID: " + id);
        }
    } catch (error) {
        console.error("Error updating product:", error);
        response.status(400).send("Error: " + error.message);
    }
};

module.exports = {
    createClient,
    updateClient,
    deleteClient,
    createProduct,
    updateProduct,
};
