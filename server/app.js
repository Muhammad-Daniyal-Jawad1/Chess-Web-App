const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require('./database/dbConnection');


const cors = require("cors");
const apiRoutes = require('./routes')
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Connecting to Database
connectDB();

// Routing
app.use("/api", apiRoutes);

//Only listen on port if the DB connection is successful
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");

    app.listen(4000, () => {
        console.log("server started listening on port 4000");
    });
})