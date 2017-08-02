/**
 * Created by danielbruce on 2017-08-02.
 */

const app = require('./app-setup.js');

app.get("/thank-you-fiat", function(req, res) {
        // try http://localhost:4567/thank-you-fiat/?amount=30&currency=CAD
        var data = {amount: req.query.amount, currency: req.query.currency};
        res.render("landing-page-fiat", data); // Render the main donation page using pug
    }
    //res.sendFile(path.join(__dirname, 'client', 'index.html'))
    // res.render("index.html", {stripeData.publishableKey})
);