/**
 * Created by danielbruce on 2017-07-27.
 */

const dotenv = require('dotenv').config({path: __dirname + '/../.env'});
//dotenv.load();
var stripeData = {};
if (typeof(dotenv) !== 'undefined' && typeof(dotenv.parsed) !== 'undefined') {
    //development
    const dotEnvData = dotenv.parsed;
    stripeData.keyPublishable = dotEnvData.STRIPE_PUBLISHABLE_KEY;
    stripeData.keySecret = dotEnvData.STRIPE_SECRET_KEY;
} else {
    //production
    stripeData.keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY;
    stripeData.keySecret = process.env.STRIPE_SECRET_KEY;
}

console.log("Publishable stripe key:");
console.log(stripeData.keyPublishable);

module.exports = stripeData;