/* //TODO: IMPLEMENT REACT STUFF LATER
require('babel-register')({
    presets: ['react']
});
const react = require("react");
const reactDOMServer = require("react-dom/server");
const myComponent = require('./client/components/landing_page_fiat.jsx');
*/

// Stripe Setup
const stripeData = require('./server/stripe-data.js');
console.log("Publishable stripe key:");
console.log(stripeData.keyPublishable);
// Currency data
const currencyDict = require('./server/currency-dictionary.js')

const fs = require('fs');
const stripe = require("stripe")(stripeData.keySecret);
const path = require("path");

const http = require('http');
const https = require('https');
const port = require('./server/port-setup.js');
const app = require('./server/app-setup.js');

require('./server/environment-development-production.js');

app.get("/public-data-key", function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"key": stripeData.keyPublishable}));
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
    var bitpay = require('bitpay-rest');
    // need bitauth for authentication purpose
    var bitauth = require('bitauth');
    console.log(__dirname);
    const privateKeyFilename = path.join(__dirname + "/bitpay/keys", 'local.pem');
    const encryptedPrivateKey = process.env.BITPAY_PRIVATE_KEY || fs.readFileSync(privateKeyFilename, 'utf8'); // Done for deployment on Heroku
    //The first param is the password that was supplied when you created the key
    var privkey = bitauth.decrypt('', encryptedPrivateKey);

    var client = bitpay.createClient(privkey);
    client.on('error', function(err) {
        // handle client errors here
        console.log(err);
    });

    client.on('ready', function(){
        var amount = parseFloat(req.body.bitcoinAmount);
        var data = { price: amount, currency: 'BTC' };
        client.as('merchant').post('invoices', data, function(err, invoice) {
            if (err){
                // error handling
                console.log(err);
            }
            else{
                // on success
                // TODO: Save the email here with the url address so that we know who contributed
                console.log('invoice data', invoice);
                res.redirect(invoice.url);
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