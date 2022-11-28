const express = require("express");
const app = express();
const cors = require("cors");
const productsRoute = require("./v1/Routes/Product.routes");
const brandsRoute = require("./v1/Routes/Brand.routes");
const categoriesRoute = require("./v1/Routes/Category.routes");
const stockRoute = require("./v1/Routes/Stock.routes");


// middlewares
app.use(express.json());
app.use(cors());


// Routes
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/brands", brandsRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/stocks", stockRoute);



app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

module.exports = app;