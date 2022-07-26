import React, { Component } from 'react';


class CalcButton extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (<div className='calc-button'>

        </div>);
    }
}

CalcButton.defaultProps = {

    contenido: ''
}

export default CalcButton;