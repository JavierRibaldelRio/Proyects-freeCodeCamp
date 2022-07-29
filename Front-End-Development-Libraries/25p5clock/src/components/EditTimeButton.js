import React, { Component } from 'react';


class EditTimeButton extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.props.handleClick.bind(this);

    }
    state = {}
    render() {


        const clases = "button-dec-inc " + this.props.clases;

        return (<button id={this.props.nid} onClick={this.handleClick} className={clases} disabled={this.props.desactivado} />);
    }

}

EditTimeButton.defaultProps = {

    nid: '',
    handleClick: () => { },
    clases: ''
}

export default EditTimeButton;