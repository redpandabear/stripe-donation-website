/**
 * Created by danielbruce on 2017-07-27.
 */

const express = require('express');
const port = require('./port-setup.js')
const app = express();

var host = "";
if (port === 4567){ // Set the host to the proper local (might not be used yet, but useful information)
    host = "https://localhost:"; // development
} else {
    host = "https://lit-journey-78750.herokuapp.com"; // production
}

// TODO: remove client folder
app.use(require("body-parser").urlencoded({extended: false}));
//app.use(path.join(__dirname + '/client'));
app.set("view engine", "pug"); // Setting the view engine to Pug
app.use(express.static('public')); // Allowing rendered pages to access resources in public directory
app.use(express.static('squarespace')); // Allowing rendered pages to access resources in squarespace directory
app.use('/pledge', express.static('public')) // This allows express to use the public directory for static content from the pledge page
app.use('/thank-you-fiat', express.static('public')) // This allows express to use the public directory for static content from the pledge page

console.log("app set up in the following directory:");
console.log(__dirname);

module.exports = app;