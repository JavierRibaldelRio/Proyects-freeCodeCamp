import React, { Component } from 'react';


class Display extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (

            <div id='display'>

                {this.props.nombre}


            </div>

        );
    }
}

Display.defaultProps = {

    nombre: " "
}

export default Display;