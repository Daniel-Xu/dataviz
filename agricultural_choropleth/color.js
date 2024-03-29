var w = window.innerWidth
var h = window.innerHeight

var svg = d3.select("body")
            .append('svg')
            .attr({
                width: w,
                height: h
            })

//path generater
var projection = d3.geo.albersUsa()
                    .translate([w/2, h/2])
                    .scale([1500])

//var projection = d3.geo.equirectangular()
                    //.translate([w/2, h/2])
                    //.scale([100])
var path = d3.geo.path()
                .projection(projection)

//color
//http://colorbrewer2.org/
var color = d3.scale.quantize().range(['rgb(239,243,255)','rgb(189,215,231)','rgb(107,174,214)','rgb(49,130,189)','rgb(8,81,156)'])

var popuScale = d3.scale.sqrt().range([3, 35])

//state value
d3.csv("agricultural_choropleth/us-ag-productivity-2004.csv", function(csvData){
    color.domain([
        d3.min(csvData, function(d){return d.value}),  
        d3.max(csvData, function(d){return d.value})
    ])
    
    d3.json('us-states.json', function(mapData){
        //we will change map the mapData to a mixed array with geodata and colorData 
        mapData.features = _.map(mapData.features, function(geoFeatures){
            var csvObj = _.find(csvData, function(csvD){
                return csvD.state === geoFeatures.properties.name
            })

            if(csvObj !== undefined)
                geoFeatures.properties.value = csvObj.value

            return geoFeatures
        })
        
        //mapData.features is every state and its value
        svg.selectAll("path")
          .data(mapData.features)
          .enter()
          .append("path")
          .attr("d", path)
          .style("fill", function(d){ 
              if(d.properties.value)
                  return color(d.properties.value)
              else 
                  return "#ccc"
          })

          //only the largest 50 cities in population
          d3.csv("agricultural_choropleth/us-cities.csv", function(citiesObj){
              svg.selectAll("circle")
              .data(citiesObj)
              .enter()
              .append("circle")
              .attr({
                  cx: function(d){return projection([d.lon, d.lat])[0] },
                  cy: function(d){return projection([d.lon, d.lat])[1] },
                  r:  function(d) {
                      popuScale.domain([
                          d3.min(citiesObj, function(data){return parseInt(data.population)}),
                          d3.max(citiesObj, function(data){return parseInt(data.population)})
                      ])
                  
                      //return Math.sqrt(parseInt(d.population) * 0.00004);
                      return popuScale(d.population)
                  }             
              })
              .style({
                  fill: "yellow", 
                  opacity: 0.75
              })
              .on("mouseover", mouseoverHandler)
              .on("mouseout", mouseoutHandler)
          })
    })

})
           
function mouseoverHandler(d, i) 
{
    svg.append("text")
        .attr({
            class: "city",
            x: function(){ return projection([d.lon, d.lat])[0]},
            y: function(){ return projection([d.lon, d.lat])[1]}
        })
        .text(function(){ 
            return "population is: " + d.population 
        })
        .style({
            "font-size": 24,
            //stroke     : "#00ff00",
            fill       : "#0000ff"
        })
}

function mouseoutHandler(d, i)
{
    d3.select(".city").remove()
}
