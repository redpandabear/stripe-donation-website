/**
 * Created by danielbruce on 2017-06-08.
 */

Controller = function() {
    this.controllerChange = null;
    this.controllerClick = null;
}

Controller.prototype.initialize = function(){
    this.controllerChange = new ControllerChange();
    this.controllerClick = new ControllerClick();
    this.controllerChange.initialize();
    this.controllerClick.initialize();
}

console.log("Controller Defined");