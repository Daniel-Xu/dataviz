var w = window.innerWidth
var h = window.innerHeight

var svg = d3.select("body")
            .append('svg')
            .attr({
                width: w,
                height: h
            })

var projection = d3.geo.albersUsa()
                    .translate([w/2, h/2])
                    .scale([1500])


var path = d3.geo.path()
                .projection(projection)
           
d3.json('us-states.json', function(mapData){
    svg.selectAll("path")
      .data(mapData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", "steelblue")

})
