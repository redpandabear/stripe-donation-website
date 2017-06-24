/**
 * Created by danielbruce on 2017-06-08.
 */

ControllerChange = function() {

}

ControllerChange.prototype.initialize = function(){
    var self = this;
    $(document).ready(function() {
        $('[controllerChangeFunction]').change(event, function () {
            element = event.target;
            functionToCall = $(element).attr("controllerChangeFunction");
            self[functionToCall](event);
        });
    });
}

ControllerChange.prototype.onSetFiatPayAmount = function(event){
    element = event.target;
    amount = Number(element.innerHTML)
    payAmount = parseInt(amount * 100)
    $(".stripe-button").attr("data-amount", payAmount);
}

console.log("Controller Change Defined");