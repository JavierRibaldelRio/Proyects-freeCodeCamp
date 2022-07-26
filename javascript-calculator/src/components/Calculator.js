import React, { Component } from 'react';
import CalcButton from './CalButton';

class Calculator extends Component {
    constructor(props) {
        super(props);
    }
    state = {}


    render() {
        return (<div id="calculator">

            <CalcButton area="add" contenido="+" />
            <CalcButton area="display" contenido="Hola" />
            <CalcButton area="substract" contenido="-" />
            <CalcButton contenido="3" />
            <CalcButton area="zero" contenido="0" />


        </div>);
    }
}

export default Calculator;