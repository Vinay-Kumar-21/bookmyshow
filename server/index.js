const express = require('express');
const app = express();

require("dotenv").config();
require("./config/dbconfig");


app.listen(8082, () => {
    console.log("Server started at 8082");
})