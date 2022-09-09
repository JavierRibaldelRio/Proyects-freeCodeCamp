//Crea el svg

const h = 600;

const w = 1100;

const padding = 20;

var svg = d3.select('main')
    .append('svg')
    .attr('width', w)
    .attr('height', h)


d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
    .then((data) => {


        // Da valor al título
        const name = data.name;

        const datos = data.children;

        d3.select("h2")
            .text(name);

        // Le da la forma de cluster
        const root = d3.hierarchy(data).sum((d) => Number(d.value)).sort((a, b) => b.height - a.height || b.value - a.value);

        // Crea el treemap
        d3.treemap()
            .size([w, h])
            .padding(2)(root);



        svg.selectAll('rect')
            .data(root.leaves())
            .join("rect")
            .attr('x', (d) => d.x0)
            .attr('y', (d) => d.y0)
            .attr('width', (d) => d.x1 - d.x0)
            .attr('height', (d) => d.y1 - d.y0)
            .attr('stroke', 'black')
            .attr('fill', 'blue');

        svg.selectAll('text')
            .data(root.leaves())
            .join('text')
            .attr('x', (d) => d.x0 + 5)
            .attr('y', (d) => d.y0 + 20)
            .text((d) => d.data.name)
            .attr('font-size', 12)
            .attr('fill', 'white');



    })