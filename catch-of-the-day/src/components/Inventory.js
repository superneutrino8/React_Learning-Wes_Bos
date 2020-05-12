import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends Component {
    state = {
        uid: null,
        owner: null
    }

    static propTypes = {
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        fishes: PropTypes.object
    }

    authHandler = async authData => {
        // 1. Look for the owner
        const storeData = await base.fetch(this.props.storeId, { context: this });
        // console.log(storeData);
        // 2. Claim the store if no owner found
        if (!storeData.owner)
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })

        this.setState({
            uid: authData.user.uid,
            owner: storeData.owner || authData.user.uid
        })
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }

    render() {

        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }

        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p style={{ textAlign: "center" }}>Sorry! You are not the owner of this Store!</p>
                </div>
            )
        }

        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish} />)}
                <AddFishForm addFishes={this.props.addFishes} />
                <button onClick={this.props.loadFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;