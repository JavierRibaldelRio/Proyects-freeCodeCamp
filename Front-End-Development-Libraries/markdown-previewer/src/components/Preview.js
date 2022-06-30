
import React, { Component } from 'react';
import Markdown from "marked-react";

class Preview extends Component {
    constructor(props) {
        super(props);

    }
    render() {

        const markdown =
            `Hola **Jpp** ~~Hola~~     `

            ;

        return (
            <div id='preview'>
                <Markdown>{this.props.mark}</Markdown>
            </div>
        );
    }
}

//Expecifica las propiedades

Preview.defaultProps = {

    mark: ""

}


export default Preview;