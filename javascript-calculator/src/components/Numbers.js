import React, { Component } from 'react';
import pasarNumeroATexto from '../scripts/PasarANumero';
import CalcButton from './CalButton';


//Almacena todos los números menos el cero

class Numbers extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {

        var botones = []

        //Genera los botones y los guarda
        for (var i = 0; i < 10; i++) {

            botones.push(<CalcButton area={pasarNumeroATexto(i)} contenido={i} key={i} />);
        }


        return (<>

            {botones}

        </>);
    }
}

export default Numbers;