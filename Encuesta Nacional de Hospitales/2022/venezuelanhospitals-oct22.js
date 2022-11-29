/* global d3 */

// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#venezuelanhospitals-oct22")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("venezuelanhospitals-oct22.csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([ 1,10])
    .range([ 1, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 1.5])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([0, 50])
    .range([ 0, 45]);

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.Month); } )  
      .attr("cy", function (d) { return y(d.PowerOutagesDurationHours); } )
      .attr("r", function (d) { return z(d.DeathsDuringPowerOutages); } )
      .style("fill", "#2F7379")
      .style("opacity", "0.7")
      .attr("stroke", "black")

})