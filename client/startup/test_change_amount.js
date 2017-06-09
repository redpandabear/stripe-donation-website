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

});