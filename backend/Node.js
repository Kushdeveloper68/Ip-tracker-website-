const express = require("express");
const ipinfo = require("ipinfo");
const mongoose = require("mongoose");
const ex = express();
const bodyParser = require("body-parser");
const path = require('path');
const PORT = 5000;
const url = "mongodb+srv://kushpandit68775:kush68775@portfoliodata.wppojw6.mongodb.net/";
const {mongooseConnection} = require('./connection.js');
const {getRouter, postRouter} = require("./route.js");
const {ipGettingAndSave} = require("./middleware.js");

// connection
mongooseConnection(url).then(() => console.log("mongoose connected")).catch(err => console.log(err, "mongoose connection err"));
ex.use(bodyParser.urlencoded({ extended: true }));
ex.use(express.urlencoded({ extended: true }));

ex.use(express.static(path.join(__dirname, './')));
ex.use(express.static('views/public'));

ex.set('view engine' , 'ejs');
ex.set('views', path.resolve('./views/'));
ex.use(ipGettingAndSave);
ex.use("/",getRouter);
ex.use("/",postRouter);
ex.listen(PORT , () => console.log('server started http://localhost:5000/'));