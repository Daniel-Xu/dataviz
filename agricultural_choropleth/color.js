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

//state value
d3.csv("agricultural_choropleth/us-ag-productivity-2004.csv", function(csvData){
    color.domain([
        d3.min(csvData, function(d){return d.value}),  
        d3.max(csvData, function(d){return d.value})
    ])
    
    d3.json('../us-states.json', function(mapData){
        //we will change map the mapData to a mixed array with geodata and colorData 
        var newFeatures = _.map(mapData.features, function(geoFeatures){
            var csvObj = _.find(csvData, function(csvD){
                return csvD.state === geoFeatures.properties.name
            })

            if(csvObj !== undefined)
                geoFeatures.properties.value = csvObj.value

            return geoFeatures
        })
        mapData.features = newFeatures
        
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
    })
})
           


