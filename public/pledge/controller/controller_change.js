/**
 * Created by danielbruce on 2017-06-08.
 */

ControllerChange = function() {

}

ControllerChange.prototype.initialize = function(){
    var self = this;
    $(document).ready(function() {
        $('body').on('change', '[controllerChangeFunction]', function (event) {
            element = event.target;
            functionToCall = $(element).attr("controllerChangeFunction");
            if (typeof(functionToCall) !== 'undefined' && functionToCall !== null) {
                self[functionToCall](this);
            } else {
                console.log("This code should be unreachable");
            }
        });
    });
}

ControllerChange.prototype.onSetFiatPayAmount = function(element){
    amount = Number(element.innerHTML);
    payAmount = parseInt(amount * 100);
    $(".stripe-button").attr("data-amount", payAmount);
}

console.log("Controller Change Defined");