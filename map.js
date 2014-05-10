var w = 500
var h = 300

var svg = d3.select("body")
            .append('svg')
            .attr({
                width: w,
                height: h
            })

//path generater
//var projection = d3.geo.albersUsa()
                    //.translate([w/2, h/2])
                    //.scale([600])

var projection = d3.geo.equirectangular()
                    //.translate([w/2, h/2])
                    //.scale([100])
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
