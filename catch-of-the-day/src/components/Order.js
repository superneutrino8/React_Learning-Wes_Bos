import React, { Component } from 'react'

import { formatPrice } from "../helpers";

class Order extends Component {
    state = {}

    renderOder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';

        if(!fish) return null;

        if (!isAvailable) {
            return <li key={key}>
                Sorry {fish ? fish.name : 'fish'} is not available
            </li>
        }
        else {
            return <li key={key}>
                {count} lbs {fish.name}&nbsp;
                {formatPrice(count * fish.price)}
            </li>
        }
    }

    render() {
        const orderIDs = Object.keys(this.props.order);
        const total = orderIDs.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return (prevTotal + (count * fish.price));
            }
            else {
                return prevTotal;
            }
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                    {orderIDs.map(this.renderOder)}
                </ul>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;