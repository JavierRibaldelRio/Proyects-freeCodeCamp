//Este script genera la informacióntodas las letras, que hacen función de letra

//Prototipo del objeto tecla, se le introducen la letra asociada
class Letra {
    constructor(letra, codigoLetra, nombre) {

        this.letra = letra;         //Q

        this.codigoLetra = codigoLetra;     //!4

        this.nombre = nombre;  //Platillos
    }
};

//Este almacena todas las letras
const teclado = [
    new Letra('Q', 81, 'Cymbals'),
    new Letra('W', 87, 'Drumsticks'),
    new Letra('E', 69, 'Cowbell'),
    new Letra('A', 65, "Tom 1"),
    new Letra('S', 83, "Tom 2"),
    new Letra('D', 68, "Base"),
    new Letra('Z', 90, 'Music Box'),
    new Letra('X', 88, 'Bass Drumm'),
    new Letra('C', 67, 'Plate')];


export default teclado;