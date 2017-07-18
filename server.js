require('babel-register')({
    presets: ['react']
});
require('dotenv').load();
const keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY;
const keySecret = process.env.STRIPE_SECRET_KEY;

const fs = require('fs');
const express = require('express');
const app = express();
const stripe = require("stripe")(keySecret);
const path = require("path");
const react = require("react");
const reactDOMServer = require("react-dom/server");
const myComponent = require('./client/components/landing_page_fiat.jsx');
const http = require('http');
const https = require('https');
const port = process.env.PORT || 4567; // Set the port number (dependent on whether code is in development or production)

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

currencyDict = { // A mapping from the symbol used for stripe to the symbol the user sees
    "cad": "CAD",
    "eur": "EUR",
    "gbp": "GBP",
    "usd": "USD",
};

app.get("/", function(req, res) {
        if (process.env.PORT) {// check to see if we are working in production
            res.render("index", {environment: "heroku"}); // Render the main donation page using pug
        } else {
            res.render("index", {environment: "development"}); // Render the main donation page using pug
        }
    }
    //res.sendFile(path.join(__dirname, 'client', 'index.html'))
  // res.render("index.html", {keyPublishable})
);

app.get("/public-data-key", function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"key": keyPublishable}));
});

app.post("/charge", (req, res) => {
  // req is information in the form where the user enters their information
  // res.body is information entered into the form except payment information
  // The form ends up being an iFrame that pops up
  // TODO: Follow the instructions given in https://www.youtube.com/watch?v=k66bOHX8MnY to get a React landing page
  // TODO: Make sure that req.body actually contains data from the checkout box
  var self = this;
  const amount = req.body.amount * 100;
  const selectedCurrency = req.body.currency;
  const currencyString = currencyDict[selectedCurrency];

  // This code runs after the user enters their information into the form
  stripe.customers.create({
    email: req.body.stripeEmail, // We create a customer based on the email and token passed by the stripe form
    card: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({ // // A charge is created based on the data in the html form's body
      amount: amount, // 'amount' set earlier based on the body content of the charge form
      description: "Sample Charge",
      currency: selectedCurrency, // 'currency' set earlier from the request body
      customer: customer.id
    }))
  .catch(err => console.log("Error:", err))
  .then(function(charge) {
    res.render("landing_page_fiat", { // Here we are using pug to render the output (see views folder)
        amount:(charge.amount / 100).toFixed(2), // Here we replace 'amount' in the pug page with the user input
        currency: currencyString // Here we replace the 'currency' on the pug page with the user input
    })
  });
});

app.post("/create-invoice", (req, res) => {
    var bitpay = require('bitpay-node-client');
    // need bitauth for authentication purpose
    var bitauth = require('bitauth');
    console.log(__dirname);
    const privateKeyFilename = path.join(__dirname + "/bitpay/keys", 'local.pem')
    const encryptedPrivateKey = fs.readFileSync(privateKeyFilename, 'utf8')
    //The first param is the password that was supplied when you created the key
    var privkey = bitauth.decrypt('', encryptedPrivateKey);

    var client = bitpay.createClient(privkey);
    client.on('error', function(err) {
        // handle client errors here
        console.log(err);
    });

    client.on('ready', function(){
        var data = { price: 100, currency: 'USD' };

        client.as('merchant').post('invoices', data, function(err, invoice) {
            if (err){
                // error handling
                console.log(err);
            }
            else{
                // on success
                console.log('invoice data', invoice);
            }
        });
    });
});

// TODO: When we get the certificate then we will replace http with https
// TODO: Use https://stackoverflow.com/questions/7450940/automatic-https-connection-redirect-with-node-js-express
const server = http.createServer(app).listen(port, function(err){ // This starts the server
    if (err) {
        console.log(err); // Print an error if the server fails to listen
    } else {
        const host = server.address().address;
        const port = server.address().port;
        console.log(`Server listening on ${host}:${port}`); // If this line prints then we can assume we are recieving requests.
    }
});