const express = require('express');
const app = express();
require("dotenv").config();
require("./config/dbconfig");

const userRoute = require("./routes/userRoutes");

app.use(express.json());
app.use("/", userRoute);



app.listen(8082, () => {
    console.log("Server started at 8082");
})