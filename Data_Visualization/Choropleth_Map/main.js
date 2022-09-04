//Crea el svg

const h = 600;

const w = 1000;

var svg = d3.select('main')
    .append('svg')
    .attr('height', h)
    .attr('width', w);

//Crea el mapa
const ruta = d3.geoPath();

const proyeccion = d3.geoMercator()
    .scale(40)
    .center([0, 20])
    .translate([w / 2, h / 2]);

//Almacenamiento de datos
var data = new Map();

//Escala de color

const domain = [0, 10, 20, 30, 40, 50, 60, 70];
const range = d3.schemeReds[8];

const escalaColor = d3.scaleThreshold()
    .domain(domain)
    .range(range)



//Se ocupa de crear la leyenda

//https://d3-legend.susielu.com/
//https://github.com/susielu/d3-legend
//https://github.com/susielu/d3-legend

const formatoLeyenda = d3.format(".0f")

var svf = d3.select('div')
    .append('svg')
    .attr('height', 100)
    .attr('width', 600)
    .attr('id', 'svg');

svf.append("g")
    .attr("class", "legend")
    .attr('id', 'legend')
    .attr("transform", "translate(20,20)");

var linear = d3.scaleLinear()
    .domain(domain)
    .range(range);

var legendLinear = d3.legendColor()
    .shapeWidth(30)
    .cells(8)
    .title('% of Bachelors per County')
    .labelFormat(formatoLeyenda)
    .orient('horizontal')
    .labels(({ i, gL, gLab, domain }) => domain[i] + '%')     //Añade el símbolo de porcentaje a la etiqueta
    .shapePadding(6)                                          // Añade el padding
    .scale(linear);

svf.select(".legend")
    .call(legendLinear);

//Se ocupa de crear el tooltip



//Funciones del tooltip


// Hace la petición al servidor
Promise.all([
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"),
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json")
])
    .then((data) => {

        var [pais, datos] = data;

        svg.selectAll("path")  // Añade los path
            .data(topojson.feature(pais, pais.objects.counties).features) //Convierte topojson en GEojsona
            .enter()
            .append("path")
            .style('z-index', 1)
            .attr("d", ruta)  //Ubicación
            .attr("class", "county")
            .attr('fill', (d) => {

                var condado = datos.filter(x => x.fips === d.id);

                return escalaColor(condado[0].bachelorsOrHigher);
            })
            .attr('data-fips', (d) => {

                var condado = datos.filter(x => x.fips === d.id);

                return condado[0].fips;
            })
            .attr('data-education', (d) => {

                var condado = datos.filter(x => x.fips === d.id);

                return condado[0].bachelorsOrHigher;
            })
            .on('mouseover', handleMouseOver)                           //Cuando el ratón este encima
            .on('mouseout', handleMouseOut);



        var tooltip = d3.select('body')
            .append('p')
            .attr('id', 'tooltip')
            .style('opacity', 0)
            .style('z-index', 99)
            .style('position', 'absolute')
            .attr('fill', 'black')

        function handleMouseOver(event, d) {


            //Obtine el elemento actual
            const condado = d3.select(event.currentTarget);

            const texto = "Hola mi nombre es Javier Ribal del Río Sanchis Peris Barrera Casado Cabrera Laimuns";

            tooltip.style('opacity', 1)                     //Hace sólido el tooltip
                .style('top', event.pageY - 28 + 'px')          //Y 
                .style('left', event.pageX + 10 + 'px')        //X )
                .attr('data-education', condado.attr('data-education')) //Año
                .text(texto);                             //Texto
        }

        function handleMouseOut() {

            tooltip.style('opacity', 0);            //Oculta el tooltip
        }

    });

// var tooltip = d3.select('svg')
//     .append('text')
//     .attr('id', 'tooltip')
//     .style('opacity', 0)
//     .attr('height', 40)
//     .attr('width', 60)
//     .style('z-index', 99)
//     .attr('fill', 'black');

