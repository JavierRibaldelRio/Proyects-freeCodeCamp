
import React, { Component } from 'react';
import Markdown from "marked-react";


class Preview extends Component {
    constructor(props) {
        super(props);

    }
    render() {


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