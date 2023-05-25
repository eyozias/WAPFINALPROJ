const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
const authRoutes = require("./authRoutes");

const app = express();
app.use(cors());
app.use(express.json()); //req.body = {...}

app.use("/login", authRoutes);
app.use("/products", productRouter);
app.use("/order", orderRouter);

app.listen(3000, () => console.log("listen on 3000"));
