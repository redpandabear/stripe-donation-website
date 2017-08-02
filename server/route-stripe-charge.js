/**
 * Created by danielbruce on 2017-07-27.
 */
const app = require('./app-setup.js');
const stripeData = require('./stripe-data.js');
const currencyDict = require('./currency-dictionary.js')
const stripe = require("stripe")(stripeData.keySecret);

app.post("/charge", (req, res) => {
    // req is information in the form where the user enters their information
    // res.body is information entered into the form except payment information
    // The form ends up being an iFrame that pops up
    // TODO: Follow the instructions given in https://www.youtube.com/watch?v=k66bOHX8MnY to get a React landing page
    // TODO: Make sure that req.body actually contains data from the checkout box
    if (typeof(req.body.currency) !== 'undefined' && req.body.currency !== '') {
        var self = this;
        const amount = parseInt(req.body.amount * 100);
        const selectedCurrency = String(req.body.currency);
        const currencyString = currencyDict[selectedCurrency];

        // This code runs after the user enters their information into the form
        stripe.customers.create({
            email: String(req.body.stripeEmail), // We create a customer based on the email and token passed by the stripe form
            card: String(req.body.stripeToken)
        })
        .then(customer =>
            stripe.charges.create({ // // A charge is created based on the data in the html form's body
                amount: amount, // 'amount' set earlier based on the body content of the charge form
                description: "Sample Charge",
                currency: selectedCurrency, // 'currency' set earlier from the request body
                customer: customer.id
            }))
        .catch(err => console.log("Error:", err))
        .then(function (charge) {
            res.render("landing_page_fiat", { // Here we are using pug to render the output (see views folder)
                amount: (charge.amount / 100).toFixed(2), // Here we replace 'amount' in the pug page with the user input
                currency: currencyString // Here we replace the 'currency' on the pug page with the user input
            })
        });
    } else {
        res.end();
        // This code shouldn't run.
    }
});