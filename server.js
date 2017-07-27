/* //TODO: IMPLEMENT REACT STUFF LATER
require('babel-register')({
    presets: ['react']
});
const react = require("react");
const reactDOMServer = require("react-dom/server");
const myComponent = require('./client/components/landing_page_fiat.jsx');
*/
const stripeData = require('./server/stripe-data.js');

// Currency data
const currencyDict = require('./server/currency-dictionary.js')
const fs = require('fs');
const stripe = require("stripe")(stripeData.keySecret);
const path = require("path");

const http = require('http');
const https = require('https');
const port = require('./server/port-setup.js');
const app = require('./server/app-setup.js');

require('./server/route-environment-development-production.js');
require('./server/route-public-data-key.js');
require('./server/route-stripe-charge.js');

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