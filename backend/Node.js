const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require("express");
const ipinfo = require("ipinfo");
const mongoose = require("mongoose");
const ex = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 7000;
const url = process.env.DBURL || "mongodb://127.0.0.1:27017/schoolwebsite";
const {mongooseConnection} = require('./connection.js');
const {getRouter, postRouter} = require("./route.js");
const {ipGettingAndSave} = require("./middleware.js");

// connection
mongooseConnection(url).then(() => console.log("mongoose connected")).catch(err => console.log(err, "mongoose connection err"));
ex.use(bodyParser.urlencoded({ extended: true }));
ex.use(express.urlencoded({ extended: true }));
// Set EJS as the template engine
// Serve static files (e.g., CSS, JS) from the public folder
ex.set('view engine' , 'ejs');
ex.set('views', path.resolve('views/'));
ex.set('views', path.join(__dirname, 'views')); // Points to 'backend/views'
ex.use(express.static('views/public'));
ex.use(express.static(path.join(__dirname, 'views/public')));

ex.use(ipGettingAndSave);
ex.use("/",getRouter);
ex.use("/",postRouter);
ex.listen(PORT , () => console.log('server started http://localhost:5000/'));