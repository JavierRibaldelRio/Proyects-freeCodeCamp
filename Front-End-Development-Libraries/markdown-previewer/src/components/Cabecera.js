import React, { Component } from 'react';

import BotonControl from './BotonControl';

import textoOriginal from '../Data/TextoOriginal';

import FileSaver from 'file-saver';

class Cabecera extends Component {
    constructor(props) {
        super(props);
        this.state = { ocultar: false };

        //Funciones de los botones
        this.eliminarTodo = this.eliminarTodo.bind(this);
        this.reiniciar = this.reiniciar.bind(this);
        this.copiar = this.copiar.bind(this);
        this.guardarMD = this.guardarMD.bind(this);
        this.ayuda = this.ayuda.bind(this);
        this.maximizarMinizar = this.maximizarMinizar.bind(this);


        //Función que se ocupa de eliminar la cabecera
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

    //Copia el md al porta papeles
    copiar() {

        navigator.clipboard.writeText(this.props.texto);

    }

    guardarMD() {
        //Crea el blob que se va a guardar

        const blob = new Blob([this.props.texto], { type: 'text/md' });

        //untitled

        FileSaver.saveAs(blob, 'untitled.md');
    }

    //Te manda al menu de ayuda
    ayuda() {

        const enlaceAyuda = "https://www.markdownguide.org/";

        window.open(enlaceAyuda, '_blank');

    }

    //Minimiza o máximiza la página de edición
    maximizarMinizar() {

        this.ocultar();

        this.props.ocultarMostrar();

    }

    //Oculta la barra superior
    ocultar() {

        this.setState({ ocultar: true });
    }

    render() {

        const botonMaxMin = <BotonControl title="" classes="fa-solid fa-maximize" handleClick={this.maximizarMinizar} />;

        return (<header id="Cabecera">

            <div id='parte-superior' hidden={this.state.ocultar} >
                <h1 id='titulo-principal'>UNCOMPLICATED MARKDOWN</h1>
                <button id='cruz' onClick={this.ocultar}><i className="fa-solid fa-xmark"></i> </button>
            </div>
            <div id='grid-herramientas'>

                <div className='herramientas'>

                    <BotonControl title="Create a new file" classes="fa-solid fa-file" handleClick={this.reiniciar} />
                    <BotonControl title="Remove all the content" classes="fa-solid fa-eraser" handleClick={this.eliminarTodo} />
                    <BotonControl title="Get Help" classes="fa-solid fa-question" handleClick={this.ayuda} />

                    {botonMaxMin}


                </div>

                {/*Si no esta maximizada la pantalla lo muestra*/}

                {!this.props.maximizada ?

                    <div className='herramientas'>

                        <BotonControl title="Download the .md file" classes="fa-solid fa-download" handleClick={this.guardarMD} />
                        <BotonControl title="Copy the .md" classes="fa-solid fa-copy" handleClick={this.copiar} />

                    </div> : null
                }
            </div>

        </header >);
    }
}

export default Cabecera;