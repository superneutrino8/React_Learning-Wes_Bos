import React, { Component } from 'react';

import AddFishForm from './AddFishForm';

class Inventory extends Component {
    state = {}
    render() {
        return (
            <div className="inventory">
                <p>Inventory</p>
                <AddFishForm addFishes={this.props.addFishes} />
                <button onClick={this.props.loadFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;