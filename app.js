const express = require("express");
const app = express();
const cors = require("cors");
const productsRoute = require("./v1/Routes/Product.routes");
const brandsRoute = require("./v1/Routes/Brand.routes");


// middlewares
app.use(express.json());
app.use(cors());


// Routes
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/brands", brandsRoute);



app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

module.exports = app;