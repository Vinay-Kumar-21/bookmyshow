const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
require("./config/dbconfig");

const userRoute = require("./routes/userRoutes");
const movieRoute = require("./routes/movieRoutes");
const theatreRoute=require("./routes/theatreRoutes");

app.use(cors());

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/theatre",theatreRoute);
app.use("/api/movie", movieRoute);



app.listen(8082, () => {
    console.log("Server started at 8082");
})