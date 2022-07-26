import React, { Component } from 'react';
import CalcButton from './CalButton';
import Display from './Display';
import Numbers from './Numbers';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = { display: "Hola Sooy disp" }
    }



    render() {
        return (<div id="calculator">
            {/* Display */}

            {/* <Display value={this.state.display} /> */}


            <CalcButton area="display" contenido="/" />

            <CalcButton area="divide" contenido="/" />

            <CalcButton area="multiplay" contenido="x" />

            <CalcButton area="clear" contenido="AC" />



            {/* Operadosre de Operacion */}
            <CalcButton area="add" contenido="+" />
            <CalcButton area="substract" contenido="-" />

            <CalcButton area="decimal" contenido="." />
            <CalcButton area="equals" contenido="=" />

            {/* Numeros */}
            <Numbers />


        </div>);
    }
}

export default Calculator;