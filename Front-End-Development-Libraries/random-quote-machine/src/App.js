import './App.css';
import QuoteBox from './components/QuoteBox';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);

    //Almacena los posibles colores
    this.state = {
      colores: [
        '#663F46', '#00Bb2D', '#e8C138', '#FE5E41', '#344966', '#9D8420',
        '#E9aaa9', '#355834', '#DF367C', '#FCA17D', '#0F5257', '#CC5803',
        '#BCD1BA', '#81F495', '#878E88'
      ]
    };

    this.numeroAleatorio = this.numeroAleatorio.bind(this);
    this.nuevoColor = this.nuevoColor.bind(this);

  }


  //Devulve un número aleatorio random
  numeroAleatorio(maxim) {
    return Math.floor(Math.random() * maxim);
  }


  //Genera un nuevo colro
  nuevoColor() {

    this.setState({ color: this.state.colores[this.numeroAleatorio(this.state.colores.length)] });
  }


  //Al empezar el componente elige aleatoriamente un color
  componentDidMount() {

    this.nuevoColor();
  }

  render() {


    //Almacena el estilo del color y su animación
    const estilo = {
      backgroundColor: this.state.color,
      transition: "all ease",

      transitionDuration: '1.75s',
    }


    //A QuoteBox se elimina la función de cambio de color y de gnerar número aleatorio

    return (
      <div className="App container-fluid" style={estilo} >
        <QuoteBox cambioColor={this.nuevoColor} numeroAleatorio={this.numeroAleatorio} />
      </div>
    );
  }
}

export default App;
