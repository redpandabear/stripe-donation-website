/**
 * Created by danielbruce on 2017-06-08.
 */

ControllerClick = function() {

}

ControllerClick.prototype.initialize = function(){
    var self = this;
    $(document).ready(function() {
        $('body').on('click', '[controllerClickFunction]', function (event) {
            element = event.target;
            functionToCall = $(this).attr("controllerClickFunction");
            if (typeof(functionToCall) !== 'undefined' && functionToCall !== null) {
                self[functionToCall](this);
            } else {
                console.log("This code should be unreachable");
            }
        });
    });
};

ControllerClick.prototype.openFiatDonation = function(element) {
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
};

ControllerClick.prototype.startFiatDonation = function(element){
    g_IndexView.highlightFiatButton();
    g_IndexView.showFiatDonationPanel();
};

ControllerClick.prototype.startCryptoDonation = function(element){
    g_IndexView.highlightCryptoButton();
    g_IndexView.showCryptoDonationPanel();
};

ControllerClick.prototype.changeCurrency = function(element){
    g_IndexView.toggleDisplayCurrencyList();
}