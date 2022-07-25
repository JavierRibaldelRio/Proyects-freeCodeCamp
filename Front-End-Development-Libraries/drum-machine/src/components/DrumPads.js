import React, { Component } from 'react';
import teclado from '../data/Teclado';
import DrumPad from './DrumPad'

class DrumPads extends Component {
    constructor(props) {
        super(props);

        this.editarDisplay = this.props.editarDisplay.bind(this);
    }
    render() {

        //Con un map genera todas las teclas le pasa la clave y la función para editar le texto que aparece en display

        var teclas = teclado.map((x) => <DrumPad instrumento={x} key={x.letra} editarDisplay={this.editarDisplay} />);

        return (<div id='DrumPads'>
            {teclas}
        </div>);
    }
}

export default DrumPads;