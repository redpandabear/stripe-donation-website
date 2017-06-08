/**
 * Created by danielbruce on 2017-06-08.
 */

Controller = function() {
    this.controllerChange = null;
}

Controller.prototype.initialize = function(){
    this.controllerChange = new ControllerChange();
    this.controllerChange.initialize();
}

console.log("Controller Defined");