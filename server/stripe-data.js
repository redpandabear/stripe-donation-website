/**
 * Created by danielbruce on 2017-07-27.
 */

const dotenv = require('dotenv').config({path: __dirname + '/../.env'});
//dotenv.load();
const dotEnvData = dotenv.parsed;
var stripeData = {};
stripeData.keyPublishable = dotEnvData.STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY;
stripeData.keySecret = dotEnvData.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;

console.log("Publishable stripe key:");
console.log(stripeData.keyPublishable);

module.exports = stripeData;