
let videoGamesSalesURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'


let VideoGamesSales

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawMap = () => {

let hierarchy = d3.hierarchy(VideoGamesSales, (node) => {
    return node['children']
} ).sum((node) => {
    return node['value']
}).sort((n1, n2) => {
    return n2['value'] - n1['value']
})

let createTreeMap = d3.treemap().size([1200, 800]).paddingInner(1);

createTreeMap(hierarchy);

let tiles = hierarchy.leaves()

let box = canvas.selectAll('g').data(tiles).enter().append('g')
.attr('transform', (game) => {
    return 'translate(' + game['x0'] + ', ' + game['y0'] + ')'
})

box.append('rect')
.attr('class', 'tile')
.attr('fill', (game) => {
    let genre = game['data']['category']

    const genreColors = {
        Wii: "#6699CC",
    DS: "#FFB366",
    X360: "#FF9999",
    GB: "#99CC99",
    PS3: "#CC99CC",
    NES: "#FFFF99",
    PS2: "#99CCCC",
    "3DS": "#FFB6D3",
    PS4: "#CC99E6",
    SNES: "#FFCC99",
    PS: "#CC6666",
    N64: "#9966CC",
    GBA: "#99FF99",
    XB: "#CC6666",
    PC: "#99CCCC",
    "2600": "#CC6666",
    PSP: "#99BFFF",
    XOne: "#99E699"
    };

    if (genre in genreColors) {
        return genreColors[genre];
    } else {
        return "#808080";
    }
})
.attr('data-name', (game) => {
    return game['data']['name']
})
.attr('data-category', (game) => {
    return game['data']['category']
})
.attr('data-value', (game) => {
    return game['data']['value']
})
.attr('width', (game) => {
    return game['x1'] - game['x0']
})
.attr('height', (game) => {
    return game['y1'] - game['y0']
})
.on('mouseover', (item) =>{
    tooltip.transition()
     .style('visibility', 'visible')

     let value = item['data']['value']
     tooltip.html(
          "Value: " + '$' + value + '<br />' + "Name: " + item['data']['name'] + '<br />' + "Category: " + item['data']['category']
     )
     .style("left", d3.event.pageX + 20 + "px")
 .style("top", d3.event.pageY - 10 + "px");

})
.on('mouseout', (item) => {
    tooltip.transition()
    .style('visibility', 'hidden')
})

box.append('text').text((game) => {
    return game['data']['name']
}).attr('x', 6).attr('y', 20) .attr('class', 'tile-text');

}

d3.json(videoGamesSalesURL).then(
    (data, error) =>{
        if (error){
            console.log(error)
        } else{
            VideoGamesSales = data 
            console.log(VideoGamesSales)
            drawMap()
        }
    }
    
)