import React, { Component } from 'react'

export class EditFishForm extends Component {
    render() {
        return (
            <div className="fish-edit">
                <input name="name" type="text" value={this.props.fish.name} />
                <input
                    name="price"
                    type="text"
                    value={this.props.fish.price}
                />
                <select name="status" value={this.props.fish.status} >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <textarea name="desc" value={this.props.fish.desc} />
                <input
                    name="image"
                    type="text"
                    value={this.props.fish.image}
                />
            </div >
        )
    }
}

export default EditFishForm
