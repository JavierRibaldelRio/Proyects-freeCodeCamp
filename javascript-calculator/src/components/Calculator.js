import React, { Component } from 'react';
import CalcButton from './CalButton';

class Calculator extends Component {
    constructor(props) {
        super(props);
    }
    state = {}


    render() {
        return (<div id="calculator">

            <CalcButton area="add" contenido="3" />
            <CalcButton area="display" contenido="5" />
            <CalcButton contenido="3" />
            <CalcButton contenido="3" />
            <CalcButton contenido="3" />


        </div>);
    }
}

export default Calculator;