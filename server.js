require('dotenv').load();
const keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY;
const keySecret = process.env.STRIPE_SECRET_KEY;

const express = require('express');
const app = express();
const stripe = require("stripe")(keySecret);
const path = require("path");


app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({extended: false}));
//app.use(path.join(__dirname + '/client'));
app.use(express.static(path.join(__dirname + '/client')));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
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

  let amount = 500;
  
  stripe.customers.create({
    email: req.body.stripeEmail,
    card: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    }))
  .catch(err => console.log("Error:", err))
  .then(charge => res.render("charge.pug"));
});

app.listen(4567);