const express = require("express");
const router = express.Router();
const api = require("../utils/apiResponse");
let products = require("../data/products.data");

// GET all
router.get("/", (req, res) => {
    api.success(res, "List Products", products);
});

// GET by ID
router.get("/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return api.error(res, "Product Not Found", 404);

    api.success(res, "Product Found", product);
});

// POST
router.post("/", (req, res) => {
    const { name, price, stock } = req.body;

    if (!name || !price) return api.error(res, "name & price required", 400);

    const newProduct = {
        id: products.length + 1,
        name,
        price,
        stock: stock || 0
    };

    products.push(newProduct);
    api.success(res, "Product Created", newProduct, 201);
});

// PUT
router.put("/:id", (req, res) => {
    const { name, price, stock } = req.body;
    const product = products.find(p => p.id == req.params.id);

    if (!product) return api.error(res, "Product Not Found", 404);

    product.name = name;
    product.price = price;
    product.stock = stock;

    api.success(res, "Product Updated", product);
});

// PATCH
router.patch("/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return api.error(res, "Product Not Found", 404);

    if (req.body.name) product.name = req.body.name;
    if (req.body.price) product.price = req.body.price;
    if (req.body.stock) product.stock = req.body.stock;

    api.success(res, "Product Patched", product);
});

// DELETE
router.delete("/:id", (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    api.success(res, "Product Deleted");
});

// TEST ERROR
router.get("/crash/test/error", (req, res) => {
    throw new Error("Simulated Crash!");
});

module.exports = router;