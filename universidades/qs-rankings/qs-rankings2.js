
// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#qs-rankings2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("qs-rankings.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["UCAB", "UCV", "USB", "UC", "Unimet","ULA","LUZ" ]

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; UCAB}) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([2012.5,2023.5])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(10));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([400, 1400])
      .range([ 0, height]);
    svg.append("g")
      .call(d3.axisLeft(y));

       // Initialize line with group a
       var line = svg
       .append('g')
       .append("path")
         .datum(data)
         .attr("d", d3.line()
           .x(function(d) { return x(+d.date) })
           .y(function(d) { return y(+d.average) })
         )
         .attr("stroke", "black")
         .style("stroke-width", 3)
         .style("fill", "none")
 
     // Initialize dots with group a
     var dot = svg
       .selectAll('circle')
       .data(data)
       .enter()
       .append('circle')
         .attr("cx", function(d) { return x(+d.date) })
         .attr("cy", function(d) { return y(+d.average) })
         .attr("r", 5)
         .style("fill", "#FF5733")
 
 
     // A function that update the chart
     function update(selectedGroup) {
 
       // Create new data with the selection?
       var dataFilter = data.map(function(d){return {date: d.date, average:d[selectedGroup]} })
 
       // Give these new data to update line
       line
           .datum(dataFilter)
           .transition()
           .duration(1000)
           .attr("d", d3.line()
             .x(function(d) { return x(+d.date) })
             .y(function(d) { return y(+d.average) })
           )
       dot
         .data(dataFilter)
         .transition()
         .duration(1000)
           .attr("cx", function(d) { return x(+d.date) })
           .attr("cy", function(d) { return y(+d.average) })
     }
 
     // When the button is changed, run the updateChart function
     d3.select("#selectButton").on("change", function(d) {
         // recover the option that has been chosen
         var selectedOption = d3.select(this).property("value")
         // run the updateChart function with this selected option
         update(selectedOption)
     })
 
 })