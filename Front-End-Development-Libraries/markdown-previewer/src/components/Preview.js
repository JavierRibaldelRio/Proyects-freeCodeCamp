
import React, { Component } from 'react';
import Markdown from "marked-react";

//Devuelve fomateado el markdown

class Preview extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        //REenderiza un objetno markdown al cual le introduces un  fomateadostring en formato markdown y el componente devuelve todo bien
        return (
            <div id='preview'>
                <Markdown breaks={true}>{this.props.mark}</Markdown>
            </div>
        );
    }
}

//Expecifica las propiedades

Preview.defaultProps = {

    mark: ""

}


export default Preview;