import './App.css';

import React, { Component } from 'react';

import Markdown from './components/Markdown';
import Preview from './components/Preview';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = { mark: '# Cabecera 1\n ## Cabecera 2\n - Esto es un palabra en **negrita**\n  - Esto es un palabra en *cursiva*\n - Esto es un palabra  ~~tachada~~\n > Esto es una cita\n  \n  Esto es un trozo de código `var e = 7`\n ```\n cout << "Hola, Mark" << endl;\n```\n ![Esto es una imagen](md.png)\n\n Esta es mi página de GitHub https://github.com/JavierRibaldelRio, puedes seguirme, no muerdo ' };

    this.cambioTexto = this.cambioTexto.bind(this)

  }


  //Recoge el texto en markdown
  cambioTexto(m) {

    this.setState({ mark: m.target.value });
  }

  render() {
    return (
      <div className="App" >

        <Markdown cambio={this.cambioTexto} textoOriginal={this.state.mark} />

        <Preview mark={this.state.mark} />

      </div>
    );
  }
}
export default App;
