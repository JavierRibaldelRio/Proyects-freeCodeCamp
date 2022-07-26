import React, { Component } from 'react';


class CalcButton extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {



        const estilo = { gridArea: this.props.area };


        return (<button className='calc-button' style={estilo} >

            {this.props.contenido}

        </button>);
    }
}

CalcButton.defaultProps = {

    contenido: ''
}

export default CalcButton;