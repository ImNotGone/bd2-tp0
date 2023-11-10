const { Pool } = require("pg");
const fs = require("fs");

// Read the database configuration from db-config.json
const dbConfig = JSON.parse(fs.readFileSync("config.json", "utf8"))["postgres"];

if (!dbConfig) {
    console.error("Could not read postgres configuration");
    process.exit(1);
}

// Create a PostgreSQL connection pool using the imported credentials
const pool = new Pool(dbConfig);

// Test the connection
console.log("Connecting to PostgreSQL...");
pool.query("SELECT NOW()", (error, results) => {
    if (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1);
    }
    console.log("Connected to PostgreSQL");
});

const createClient = (request, response) => {
    const { nro_cliente, nombre, apellido, direccion, activo } = request.body;

    pool.query(
        "INSERT INTO e01_cliente (nro_cliente, nombre, apellido, direccion, activo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [nro_cliente, nombre, apellido, direccion, activo],
        (error, results) => {
            if (error) {
                response.status(400).send("Error: " + error.detail);
            } else {
                response
                    .status(201)
                    .send(`Client added with ID: ${nro_cliente}`);
            }
        },
    );
};

const updateClient = (request, response) => {
    const id = parseInt(request.params.id);
    const { nombre, apellido, direccion, activo } = request.body;

    pool.query(
        "UPDATE e01_cliente SET nombre=$2, apellido=$3, direccion=$4, activo=$5 WHERE nro_cliente=$1 RETURNING *",
        [id, nombre, apellido, direccion, activo],
        (error, results) => {
            if (error) {
                response.status(400).send("Error: " + error.detail);
            } else {
                if (results.rowCount == 0) {
                    return response.status(404).send("Client not found");
                }
                response.status(200).send(`Client modified with ID: ${id}`);
            }
        },
    );
};

const deleteClient = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        "DELETE FROM e01_cliente WHERE nro_cliente = $1",
        [id],
        (error, results) => {
            if (error) {
                response.status(400).send("Error: " + error.detail);
            } else {
                if (results.rowCount == 0) {
                    return response.status(404).send("Client not found");
                } else {
                    response.status(200).send(`Client deleted with ID: ${id}`);
                }
            }
        },
    );
};

const createProduct = (request, response) => {
    const { codigo_producto, marca, nombre, descripcion, precio, stock } =
        request.body;

    pool.query(
        "INSERT INTO e01_producto (codigo_producto, marca, nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [codigo_producto, marca, nombre, descripcion, precio, stock],
        (error, results) => {
            if (error) {
                response.status(400).send("Error: " + error.detail);
            } else {
                response
                    .status(201)
                    .send(`Product added with ID: ${codigo_producto}`);
            }
        },
    );
};

const updateProduct = (request, response) => {
    const id = parseInt(request.params.id);
    const { marca, nombre, descripcion, precio, stock } = request.body;

    pool.query(
        "UPDATE e01_producto SET marca=$2, nombre=$3, descripcion=$4, precio=$5, stock=$6 WHERE codigo_producto=$1 RETURNING *",
        [id, marca, nombre, descripcion, precio, stock],
        (error, results) => {
            if (error) {
                response.status(400).send("Error: " + error.detail);
            } else {
                if (results.rowCount == 0) {
                    return response.status(404).send("Product not found");
                }
                response.status(200).send(`Product modified with ID: ${id}`);
            }
        },
    );
};

module.exports = {
    createClient,
    updateClient,
    deleteClient,
    createProduct,
    updateProduct,
};
