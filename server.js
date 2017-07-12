require('babel-register')({
    presets: ['react']
});
require('dotenv').load();
const keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY;
const keySecret = process.env.STRIPE_SECRET_KEY;

const express = require('express');
const app = express();
const stripe = require("stripe")(keySecret);
const path = require("path");
const react = require("react");
const reactDOMServer = require("react-dom/server");
const myComponent = require('./client/components/landing_page_fiat.jsx');

app.use(require("body-parser").urlencoded({extended: false}));
//app.use(path.join(__dirname + '/client'));
app.set("view engine", "pug");
app.use(express.static('public'));

currencyDict = {
    "cad": "CAD",
    "eur": "EUR",
    "gbp": "GBP",
    "usd": "USD",
};

app.get("/", (req, res) =>
    res.render("index")
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
  
  stripe.customers.create({
    email: req.body.stripeEmail,
    card: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount: amount,
      description: "Sample Charge",
      currency: selectedCurrency,
      customer: customer.id
    }))
  .catch(err => console.log("Error:", err))
  .then(function(charge) {
    //var props = {"amount": (charge.amount / 100).toFixed(2), "currency": currencyString};
    //var html = reactDOMServer.renderToString(
    //    react.createElement(myComponent, props)
    //);
    //res.send(html);
    res.render("landing_page_fiat", {
        amount:(charge.amount / 100).toFixed(2),
        currency: currencyString
    })
  });
});

app.listen(process.env.PORT || 4567);