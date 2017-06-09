/**
 * Created by danielbruce on 2017-06-08.
 */

ControllerClick = function() {

}

ControllerClick.prototype.initialize = function(){
    var self = this;
    $('[controllerClickFunction]').click(event, function() {
        element = event.target;
        functionToCall = $(element).attr("controllerClickFunction");
        self[functionToCall](event);
    });
}

ControllerClick.prototype.openFiatDonation = function(event){
    event.preventDefault();
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
}