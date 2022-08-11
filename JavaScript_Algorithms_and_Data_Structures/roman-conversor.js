function convertToRoman(num) {

    var equivalencias =
        [// 10⁰, 10¹ 10² 10³

            [],                     //0
            ['I', 'X', 'C', 'M'],   //1
            [],                     //2
            [],                     //3
            ['IV', 'XL', 'CD'],     //4
            ['V', 'L', 'D'],        //5
            [],                     //6
            [],                     //7
            [],                     //8
            ['IX', 'XC', 'CM'],     //9
        ]


    //Cortamos el caracter en dígitos : lo hacemos texto lo cortamos por todas parte y despues lo volvemos a pasar a número

    var arr = String(num).split('').map(Number);
    console.log(arr)
    //Repite para crear  por cada dígito su objeto de la i es el número de ceros de el dígito
    for (var i = 0; i < arr.length; i++) {
        //La equivalencia es igual

        //Almacena la letra que va ha devolver
        var letras = '';

        //Es igual a 
        letras = equivalencias[arr[i]][arr.length - 1 - i];

        if (arr[i] !== 0 && letras === undefined) {

            let romano = '';
            if (arr[i] > 5) {

                romano = equivalencias[5][arr.length - 1 - i]

            }


            let aRestar = (arr[i] > 5) ? 5 : 0;

            console.log(`Arr: ${arr}, Romano ${romano} y A Restar: ${aRestar}`);


            for (var j = 0; j < arr[i] - aRestar; j++) {

                romano = romano + equivalencias[1][arr.length - i - 1];

            }

            letras = romano;

        }

        arr[i] = letras;

    }

    return arr.join('');
}

console.log(
    convertToRoman(68));

