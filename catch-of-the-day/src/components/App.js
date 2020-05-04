import React, { Component } from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

import sampleFishes from '../sample-fishes';

class App extends Component {
    state = {
        fishes: {},
        order: {}
    };
    
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

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order />
                <Inventory addFishes={this.addFishes} loadFishes={this.loadFishes} />
            </div>
        );
    }
}

export default App;