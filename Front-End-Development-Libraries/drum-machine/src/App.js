import Display from './components/Display';
import './style';
import React, { Component } from 'react';
import teclado from './data/Teclado';
import DrumPad from './components/DrumPad';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { nombreInstrumento: '' };

    this.editarNombre = this.editarNombre.bind(this);

  }


  //Edita el estado
  editarNombre(nombre) {

    console.log("HOla")

    this.setState({ nombreInstrumento: nombre });

  }


  render() {

    //Con un map genera todas las teclas le pasa la clave y la función para editar le texto que aparece en display

    var teclas = teclado.map((x) => <DrumPad instrumento={x} key={x.letra} mandarNombre={this.editarNombre} />);

    return (
      <div id='drum-machine'>

        <Display nombre={this.state.nombreInstrumento} />

        {teclas}


      </div >
    );
  }
}

export default App;
