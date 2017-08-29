/**
 * Created by danielbruce on 2017-06-08.
 */

/*if ($("#environment").text() === "development"){
    var hostName = "localhost:4567"; // development
} else {
    var hostName = 'lit-journey-78750.herokuapp.com' // production
}*/
var urlCall = "";
var hostName = $("#environment").text();
if (hostName === "localhost:4567"){
    urlCall = 'http://' + hostName + "/public-data-key";
} else {
    urlCall = 'https://' + hostName + "/public-data-key";
}

// http://lit-journey-78750.herokuapp.com/public-data-key
var handler = null;
requestStripeToken = function() {
    jQuery.getJSON(urlCall, {}, function (data) {
        handler = StripeCheckout.configure({
            key: data.key,
            locale: 'auto',
            name: 'Collider-X',
            description: 'One-time Donation',
            zipCode: true,
            'billing-address': true,
            currency: g_IndexView.getSelectedCurrency(),
            token: function (token) {
                // JSON.stringify(token)
                // "{"id":"tok_1ASbDzJhOI3fNLAdXGeeNKgJ","object":"token","card":{"id":"card_1ASbDzJhOI3fNLAdD227J8gR","object":"card","address_city":null,"address_country":null,"address_line1":null,"address_line1_check":null,"address_line2":null,"address_state":null,"address_zip":null,"address_zip_check":null,"brand":"Visa","country":"US","cvc_check":"pass","dynamic_last4":null,"exp_month":6,"exp_year":2019,"funding":"credit","last4":"4242","metadata":{},"name":"g@g.com","tokenization_method":null},"client_ip":"173.244.48.86","created":1496969019,"email":"g@g.com","livemode":false,"type":"card","used":false}"
                $('input#stripeToken').val(token.id);
                $('input#stripeEmail').val(token.email);
                $('input#currency').val(g_IndexView.getSelectedCurrency());
                $('.fiat-donation-form').submit();
            }
        })
    });
}
requestStripeToken();

$(window).on('popstate', function() {
    handler.close();
});

/*setInterval(function(){
    $('#player').seekTo(0);
}, 5000);*/