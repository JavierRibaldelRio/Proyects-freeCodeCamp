import './App.css';

import React, { Component } from 'react';

import MarkdownInput from './components/MarkdownInput';
import Preview from './components/Preview';
import Cabecera from './components/Cabecera';

import textoOriginal from './Data/TextoOriginal';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = { mark: textoOriginal, mostrar: true };

    this.cambioTextoInput = this.cambioTextoInput.bind(this);

    this.editarTexto = this.editarTexto.bind(this);

    this.ocultarMostrar = this.ocultarMostrar.bind(this);


  }

  //Cambia el estado del texto que se esta mostrand

  editarTexto(nuevoTexto) {

    this.setState({ mark: nuevoTexto });
  }


  //Recoge el texto en markdown de un inputy se lo manda a la función que edita el estado
  cambioTextoInput(m) {

    this.editarTexto(m.target.value);

  }


  //Ocultar la preview

  ocultarMostrar() {

    //Invierte el valor de mostrar
    this.setState((state, props) => ({

      mostrar: !state.mostrar

    }));

  }

  render() {

    if (this.mostrar === true) {


    }


    return (
      <div className="App" >

        {/* Se le introducen una función para poder editar el texto y el texto actual*/}
        <Cabecera editarTexto={this.editarTexto} texto={this.state.mark} ocultarMostrar={this.ocultarMostrar} />


        <main>
          <MarkdownInput cambio={this.cambioTextoInput} textoOriginal={this.state.mark} />

          <Preview mark={this.state.mark} />
        </main>
      </div>
    );
  }
}
export default App;
