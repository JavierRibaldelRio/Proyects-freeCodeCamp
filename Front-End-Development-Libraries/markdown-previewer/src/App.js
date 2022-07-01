import './App.css';

import React, { Component } from 'react';

import MarkdownInput from './components/MarkdownInput';
import Preview from './components/Preview';
import Cabecera from './components/Cabecera';
import styled from 'styled-components';




class App extends Component {

  constructor(props) {

    super(props);

    this.state = { mark: '# Cabecera 1\n## Cabecera 2\n- Esto es un palabra en **negrita**\n- Esto es un palabra en *cursiva*\n- Esto es un palabra ~~tachada~~\n> Esto es una cita\n \nEsto es un trozo de código: `<div></div>`\n```\nconsole.log("Hola, Markdown");\n```\n ![Esto es una imagen](md.png)\n\nEsta es mi página de [GitHub](https://github.com/JavierRibaldelRio), puedes seguirme, no muerdo ' };

    this.cambioTexto = this.cambioTexto.bind(this)



  }


  //Recoge el texto en markdown
  cambioTexto(m) {

    this.setState({ mark: m.target.value });
  }

  render() {
    return (
      <div className="App" >
        <p>Hola</p>
        <Cabecera />

        <main>
          <MarkdownInput cambio={this.cambioTexto} textoOriginal={this.state.mark} />

          <Preview mark={this.state.mark} />
        </main>
      </div>
    );
  }
}
export default App;
