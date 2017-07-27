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

const stripe = require("stripe")(stripeData.keySecret);


const http = require('http');
const https = require('https');
const port = require('./server/port-setup.js');
const app = require('./server/app-setup.js');

require('./server/route-environment-development-production.js');
require('./server/route-public-data-key.js');
require('./server/route-stripe-charge.js');
require('./server/route-bitpay-invoice.js');



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