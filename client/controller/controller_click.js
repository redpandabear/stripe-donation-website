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