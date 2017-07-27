/**
 * Created by danielbruce on 2017-07-27.
 */
const app = require('./app-setup.js');
const stripeData = require('./stripe-data.js');

app.get("/public-data-key", function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"key": stripeData.keyPublishable}));
});