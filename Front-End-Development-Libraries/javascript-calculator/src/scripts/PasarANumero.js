//Se le introduce un número i lo pasa a texto

function pasarNumeroATexto(n) {

    var texto = '';

    switch (n) {

        case 0:
            texto = "zero";
            break;
        case 1:
            texto = "one";
            break;

        case 2:
            texto = "two";
            break;

        case 3:
            texto = "three";
            break;

        case 4:
            texto = "four";
            break;

        case 5:
            texto = "five";
            break;

        case 6:
            texto = "six";
            break;

        case 7:
            texto = "seven";
            break;

        case 8:
            texto = "eight";
            break;

        case 9:
            texto = "nine";
            break;
    }

    return texto;
}

export default pasarNumeroATexto;