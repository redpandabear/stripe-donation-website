/**
 * Created by danielbruce on 2017-08-02.
 */

const app = require('./app-setup.js');

app.get("/thank-you-fiat", function(req, res) {
        var data = {amount: req.body.amount, currency: req.body.currency};
        res.render("landing-page-fiat", data); // Render the main donation page using pug
    }
    //res.sendFile(path.join(__dirname, 'client', 'index.html'))
    // res.render("index.html", {stripeData.publishableKey})
);