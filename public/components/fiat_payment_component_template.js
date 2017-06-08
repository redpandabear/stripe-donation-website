/**
 * Created by danielbruce on 2017-06-07.
 */
module exports = function(props) {
    return (
        <form action="/charge" method="post">
            <article><label>Amount: $5.00</label></article>
            <script class="stripe-button" src="//checkout.stripe.com/v2/checkout.js" data-locale="auto" data-description="Sample Charge" data-amount="{this.props.amount}"></script>
        </form>
    )
};