require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//My routes
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const warehouseRoutes = require("./routes/warehouse");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB GOT CRASHED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", warehouseRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);


//PORT

const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
