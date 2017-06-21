var React = require('react');

module.exports = React.createClass({
    render: function(){
        return (<div>
            <h1> Thank You For Your Donation! </h1>
            <p> You just donated {this.props.amount} to the Blockchain research and development hub. As a sponsor, we will ensure that you enjoy all of the perks and benefits of our Blockchain R&D hub and that our research efforts will reflect your contributions.</p>
        </div>);
    }
});