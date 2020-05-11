import React, { Component } from 'react';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';



class Inventory extends Component {
    state = {}
    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(key => <EditFishForm fish={this.props.fishes[key]} />)}
                <AddFishForm addFishes={this.props.addFishes} />
                <button onClick={this.props.loadFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;