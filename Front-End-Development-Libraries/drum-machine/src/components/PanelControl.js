import React, { Component } from 'react';
import Display from './Display';

class PanelControl extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (<div id='panel-control'>
            <Display nombre={this.props.contenidoDisplay} />


            <h1>DRUM MACHINE</h1>
        </div>);
    }
}

export default PanelControl;