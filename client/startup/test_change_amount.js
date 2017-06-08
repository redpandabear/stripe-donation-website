/**
 * Created by danielbruce on 2017-06-08.
 */
var hostName = "localhost:4567";

var g_Controller = new Controller();
g_Controller.initialize();

var handler = null
jQuery.getJSON('http://'+ hostName + "/public-data-key", {}, function(data){
    handler = StripeCheckout.configure({
        key: data.key,
        locale: 'auto',
        name: 'Collider-X',
        description: 'One-time donation',
        token: function(token) {
            $('input#stripeToken').val(token.id);
            $('form').submit();
        }
    })
});

$('#donateButton').on('click', function(e) {
    e.preventDefault();

    $('#error_explanation').html('');
    var amount = $('input#fiat-input-amount').val();
    amount = amount.replace(/\$/g, '').replace(/\,/g, '')

    amount = parseFloat(amount);

    if (isNaN(amount)) {
        $('#error_explanation').html('<p>Please enter a valid amount in USD ($).</p>');
    }
    else if (amount < 5.00) {
        $('#error_explanation').html('<p>Donation amount must be at least $5.</p>');
    }
    else {
        amount = amount * 100; // Needs to be an integer!
        handler.open({
            amount: Math.round(amount)
        })
    }
});