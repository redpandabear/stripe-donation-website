/**
 * Created by danielbruce on 2017-07-27.
 */
const app = require('./app-setup.js');
const fs = require('fs');
const path = require("path");

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