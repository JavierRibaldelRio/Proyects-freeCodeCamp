
import React, { Component } from 'react';


class MarkdownInput extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div id='markdown'>

                <textarea id="editor" value={this.props.textoOriginal} onChange={this.props.cambio.bind(this)} />

            </div>);
    }
}

export default MarkdownInput;