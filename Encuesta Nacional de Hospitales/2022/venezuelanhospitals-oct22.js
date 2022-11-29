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
    .domain([1,10])
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
    .range([ 0, 42]);
    



  // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
  var tooltip = d3.select("#venezuelanhospitals-oct22")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

  // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("Number of deaths due to<br>power outages: " + d.DeathsDuringPowerOutages)
      .style("left", (d3.mouse(this)[0]+90) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", (d3.mouse(this)[1]) + "px")
  }

  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }



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
      .attr("stroke", "#12014B")

// Y axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Duration of power outage (hours)")

// Add January axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left+10)
    .attr("y", height + margin.top + 10)
    .text("Jan");

// Add Feb axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left+20)
    .attr("y", height + margin.top + 10)
    .text("Feb");

// Add March axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left+30)
    .attr("y", height + margin.top + 10)
    .text("March");

// Add April axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left+40)
    .attr("y", height + margin.top + 10)
    .text("April");

// Add May axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left+50)
    .attr("y", height + margin.top + 10)
    .text("May");

// Add June axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left+60)
    .attr("y", height + margin.top + 10)
    .text("May");

// Add July axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left+70)
    .attr("y", height + margin.top + 10)
    .text("May");

// Add Aug axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left+80)
    .attr("y", height + margin.top + 10)
    .text("May");

// Add Sept axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left+90)
    .attr("y", height + margin.top + 10)
    .text("May");

// Add Oct axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", margin.left+100)
    .attr("y", height + margin.top + 10)
    .text("May");

svg
  .style("font-size", 12)



  
})