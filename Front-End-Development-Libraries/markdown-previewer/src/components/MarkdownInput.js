
import React, { Component } from 'react';

//Genera la parte de el programa donde el usuario intoroduce el pseudocódigo de markdown

class MarkdownInput extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        //Genera una textarea donde el usuario introduce el código en markdown
        return (
            <div id='markdown' className={this.props.clase}>
                <textarea id="editor" value={this.props.textoOriginal} onChange={this.props.cambio.bind(this)} />
            </div>);
    }
}

export default MarkdownInput;