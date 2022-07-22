import './App.css';

import React, { Component } from 'react';

import MarkdownInput from './components/MarkdownInput';
import Preview from './components/Preview';
import Cabecera from './components/Cabecera';

import textoOriginal from './Data/TextoOriginal';

class App extends Component {

  constructor(props) {

    super(props);

    //Asigna el texto original y la pantalla completa a falso
    this.state = { mark: textoOriginal, pantallaCompleta: false };

    this.cambioTextoInput = this.cambioTextoInput.bind(this);

    this.editarTexto = this.editarTexto.bind(this);

    this.maximizarMinimizar = this.maximizarMinimizar.bind(this);
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

  maximizarMinimizar() {

    //Invierte el valor de mostrar
    this.setState((state, props) => ({

      pantallaCompleta: !state.pantallaCompleta

    }));

  }

  render() {

    var claseInput = (this.state.pantallaCompleta) ? 'markdown-max' : "";

    return (
      <div className="App" >

        {/* Se le introducen una función para poder editar el texto y el texto actual*/}
        <Cabecera editarTexto={this.editarTexto} texto={this.state.mark} ocultarMostrar={this.maximizarMinimizar} maximizada={this.state.pantallaCompleta} />


        <main>
          <MarkdownInput cambio={this.cambioTextoInput} textoOriginal={this.state.mark} clase={claseInput} />

          {/* Si la pantalla es completa elimina la previsualización */}
          {!this.state.pantallaCompleta ? <Preview mark={this.state.mark} /> : null}

        </main>
      </div>
    );
  }
}
export default App;
