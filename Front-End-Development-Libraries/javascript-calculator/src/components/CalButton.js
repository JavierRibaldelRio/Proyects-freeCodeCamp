import React, { Component } from 'react';


class CalcButton extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }
    state = {}

    onClick() {

        this.props.handleClick(this.props.contenido);
    }
    render() {



        //Genera el estilo con el area si hay un ara definida

        if (this.props.area !== undefined) {

            var estilo = { gridArea: this.props.area };
        }
        //Genera la id con la nid si existe, sino con el area
        let nid = (this.props.nid === null) ? this.props.area : this.props.nid;


        return (<button id={nid} className='calc-button' style={estilo} onClick={this.onClick} >

            {this.props.contenido}

        </button>);
    }
}

CalcButton.defaultProps = {

    contenido: '',
    nid: null,
    handleClick: () => { }
}

export default CalcButton;