const express = require("express");
const app = express();
const cors = require("cors");
const productsRoute = require("./v1/Routes/Product.routes");
const brandsRoute = require("./v1/Routes/Brand.routes");
const categoriesRoute = require("./v1/Routes/Category.routes");
const stockRoute = require("./v1/Routes/Stock.routes");
const storeRoute = require("./v1/Routes/Store.routes");
const suppliersRoute = require("./v1/Routes/Supplier.routes");
const usersRoute = require("./v1/Routes/User.routes");


// middlewares
app.use(express.json());
app.use(cors());


// Routes
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/brands", brandsRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/stocks", stockRoute);
app.use("/api/v1/stores", storeRoute);
app.use("/api/v1/suppliers", suppliersRoute);
app.use("/api/v1/user", usersRoute);



app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

module.exports = app;