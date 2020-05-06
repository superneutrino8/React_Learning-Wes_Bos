import React, { Component } from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';

import Base from '../base';

import sampleFishes from '../sample-fishes';

class App extends Component {
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount() {
        const {params} = this.props.match;
        this.ref = Base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentWillUnmount() {
        Base.removeBinding(this.ref);
    }

    addFishes = (fish) => {
        console.log('INSIDE App.js');
        // 1. Create copy of state
        const fishes = { ...this.state.fishes };
        // 2. Makes changes in copy
        fishes[`fish${Date.now()}`] = fish;
        // 3. Make changes in State
        this.setState({
            fishes: fishes,
        })
    };

    loadFishes = (event) => {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder = (key) => {
        // 1. Create copy of state
        const order = { ...this.state.order };
        // 2. Make changes in copy
        order[key] = order[key] + 1 || 1;
        // 3. Push changes in state
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {
                            Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]} />)
                        }
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFishes={this.addFishes} loadFishes={this.loadFishes} />
            </div>
        );
    }
}

export default App;