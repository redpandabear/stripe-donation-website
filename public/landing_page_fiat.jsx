var React = require('react');

module.exports = React.createClass({
    render: function(){
        return (<div styles="{{text-align: 'center'}}">
            <html>
                <head>
                    <title>Universal App With React</title>
                    <link rel="stylesheet" href="/style.css"/>
                </head>
                <body>
                    <h1> Thank You For Your Donation! </h1>
                    <p> You just donated {this.props.amount} in {this.props.currency} to the Blockchain research and development hub. As a sponsor, we will ensure that you enjoy all of the perks and benefits of our Blockchain R&D hub and that our research efforts will reflect your contributions.</p>
                </body>
            </html>
        </div>);
    }
});