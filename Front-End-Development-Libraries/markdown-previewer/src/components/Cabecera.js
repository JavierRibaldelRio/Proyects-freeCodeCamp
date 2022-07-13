import React, { Component } from 'react';

import BotonControl from './BotonControl';

class Cabecera extends Component {
    constructor(props) {
        super(props);
        this.state = { ocultar: false };

        this.ocultar = this.ocultar.bind(this);
    }

    ocultar() {

        this.setState({ ocultar: true });
    }

    render() {
        return (<header id="Cabecera">

            <div id='parte-superior' hidden={this.state.ocultar} >
                <h1 id='titulo-principal'>UNCOMPLICATED MARKDOWN</h1>
                <button id='cruz' onClick={this.ocultar}><i className="fa-solid fa-xmark"></i> </button>
            </div>
            <div id='grid-herramientas'>

                <div />

                <div id='herramientas'>

                    <BotonControl title="Download the .md file" classes="fa-solid fa-download" />
                    <BotonControl title="Copy the .md" classes="fa-solid fa-copy" />

                </div>
            </div>

        </header >);
    }
}

export default Cabecera;