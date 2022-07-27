function Display(props) {

    var estilo = { gridArea: "display" }

    return (<div id='display' style={estilo}> {props.value} </div>);
}

Display.defaultProps = {

    value: ""
}

export default Display;