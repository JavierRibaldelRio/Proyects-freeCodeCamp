function Display(props) {

    var estilo = { gridArea: "display" }

    return (<div id='display' className="calc-button" style={estilo}> {props.value} </div>);
}

Display.defaultProps = {

    value: ""
}

export default Display;