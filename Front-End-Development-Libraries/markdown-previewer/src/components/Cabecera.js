import React, { Component } from 'react';

import BotonControl from './BotonControl';

import textoOriginal from '../Data/TextoOriginal';

class Cabecera extends Component {
    constructor(props) {
        super(props);
        this.state = { ocultar: false };

        //Funciones de los botones
        this.eliminarTodo = this.eliminarTodo.bind(this);
        this.reiniciar = this.reiniciar.bind(this);


        this.ocultar = this.ocultar.bind(this);

    }


    //Funciones de los botnes del panel del control

    //Pone el contenid de las dos hojas a cero
    eliminarTodo() {

        this.props.editarTexto(' ');
    }

    //Reinicia el contenido de la hoja a el original

    reiniciar() {

        this.props.editarTexto(textoOriginal);
    }

    //Oculta la barra superior
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

                <div className='herramientas'>

                    <BotonControl title="Create a new file" classes="fa-solid fa-file" handleClick={this.reiniciar} />
                    <BotonControl title="Remove all the content" classes="fa-solid fa-eraser" handleClick={this.eliminarTodo} />
                    <BotonControl title="Get Help" classes="fa-solid fa-question" />
                    <BotonControl title="Maximize" classes="fa-solid fa-maximize" />

                </div>

                <div className='herramientas'>

                    <BotonControl title="Download the .md file" classes="fa-solid fa-download" />
                    <BotonControl title="Copy the .md" classes="fa-solid fa-copy" />
                    <BotonControl title="Export to pdf .md" classes="fa-solid fa-file-pdf" />

                </div>
            </div>

        </header >);
    }
}

export default Cabecera;