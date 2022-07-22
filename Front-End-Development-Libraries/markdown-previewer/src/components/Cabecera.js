import React, { Component } from 'react';

import BotonControl from './BotonControl';

import textoOriginal from '../Data/TextoOriginal';

import FileSaver from 'file-saver';


//Genera la cabecera de app

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

        //Elige el icono funcel botor en función de la pantalla esta minimizada o no
        const icono = this.props.maximizada ? "fa-minimize" : "fa-maximize";


        //Le suma al icono el fa-solid para indicar que es una clase de font awosomw
        const classeBotonMin = "fa-solid " + icono;


        return (
            <header id="Cabecera">
                {/* El Título*/}
                <div id='parte-superior' hidden={this.state.ocultar} >
                    <h1 id='titulo-principal'>UNCOMPLICATED MARKDOWN</h1>
                    <button id='cruz' onClick={this.ocultar}><i className="fa-solid fa-xmark"></i> </button>
                </div>

                {/*Las dos barras de herramientas*/}
                <div id='grid-herramientas'>


                    {/* Esta simpre se muestra */}
                    <div className='herramientas'>

                        <BotonControl title="Create a new file" classes="fa-solid fa-file" handleClick={this.reiniciar} />
                        <BotonControl title="Remove all the content" classes="fa-solid fa-eraser" handleClick={this.eliminarTodo} />
                        <BotonControl title="Get Help" classes="fa-solid fa-question" handleClick={this.ayuda} />

                        <BotonControl title="" classes={classeBotonMin} handleClick={this.maximizarMinizar} />;


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