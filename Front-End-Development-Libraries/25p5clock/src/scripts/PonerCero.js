
//Pone el cero en caso de que sea necesario
function poner0(n) {
    return (n > 9) ? n : `0${n}`;
}

export default poner0;