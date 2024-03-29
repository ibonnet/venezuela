
  // set the dimensions and margins of the graph
  var margin = {top: 30, right: 150, bottom: 50, left: 80},
      width = 750 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  var graph = d3.select("#qs-rankings")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Legend
// UCV
graph.append("circle").attr("cx",528).attr("cy",25).attr("r", 5).style("fill", "#3B3C96")
graph.append("text").attr("x", 534).attr("y", 25).text("Universidad Central de Venezuela").style("font-size", "9px").attr("alignment-baseline","middle")
// ULA
graph.append("circle").attr("cx",528).attr("cy",40).attr("r", 5).style("fill", "#A2206B")
graph.append("text").attr("x", 534).attr("y", 40).text("Universidad de Los Andes").style("font-size", "9px").attr("alignment-baseline","middle")

// Title
graph.append("text").attr("x", 220).attr("y", 408).text("Year").style("font-size", "13px").attr("alignment-baseline","middle").style("font-family", "Vesterbro,Georgia,Times New Roman,Times,serif")
graph.append("text").attr("x", 20).attr("y", -15).text("World Rankings of Venezuelan Universities since 2013").style("font-size", "16px").attr("alignment-baseline","middle").style("font-family", "Vesterbro,Georgia,Times New Roman,Times,serif").style("font-weight","bold")
graph.append("text").attr("x", -250).attr("y", -65).text("World University Rankings").style("font-size", "13px").attr("transform", "rotate(-90)").style("font-family", "Vesterbro,Georgia,Times New Roman,Times,serif")

// Y Axis
graph.append("text").attr("x", -50).attr("y", 21).text("551-600").style("font-size", "10px").attr("alignment-baseline","middle")
graph.append("text").attr("x", -50).attr("y", 63).text("601-650").style("font-size", "10px").attr("alignment-baseline","middle")
graph.append("text").attr("x", -50).attr("y", 104).text("651-700").style("font-size", "10px").attr("alignment-baseline","middle")
graph.append("text").attr("x", -50).attr("y", 145).text("701-750").style("font-size", "10px").attr("alignment-baseline","middle")
graph.append("text").attr("x", -52).attr("y", 186).text("751-800").style("font-size", "10px").attr("alignment-baseline","middle")
graph.append("text").attr("x", -55).attr("y", 290).text("801-1000").style("font-size", "10px").attr("alignment-baseline","middle")
// source
graph.append("text").attr("x", 330).attr("y", 415).text("Source: QS World Rankings / Graph: Isabel Bonnet").style("font-size", "8px").attr("alignment-baseline","middle");
// intervals rectangles
graph.append("rect").attr("x",0).attr("y",0).attr("width",520).attr("height",41).style("fill", "#66A54C").style("opacity", ".13")
graph.append("rect").attr("x",0).attr("y",41).attr("width",520).attr("height",41).style("fill", "#257070").style("opacity", ".13")
graph.append("rect").attr("x",0).attr("y",82).attr("width",520).attr("height",41).style("fill", "#773C66").style("opacity", ".13")
graph.append("rect").attr("x",0).attr("y",123).attr("width",520).attr("height",41).style("fill", "#3B3C96").style("opacity", ".13")
graph.append("rect").attr("x",0).attr("y",164).attr("width",520).attr("height",41).style("fill", "#391833C").style("opacity", ".13")
graph.append("rect").attr("x",0).attr("y",205).attr("width",520).attr("height",165).style("fill", "#91483C").style("opacity", ".13")
// dashed lines
graph.append("line").style("stroke", "black").style("stroke-width",2).style("opacity", ".4").style("stroke-dasharray",4).attr("x1",52.5).attr("y1",370).attr("x2",52.5)
graph.append("line").style("stroke", "black").style("stroke-width",2).style("opacity", ".4").style("stroke-dasharray",4).attr("x1",208.5).attr("y1",370).attr("x2",208.5)
graph.append("text").attr("x", 56).attr("y", 350).text("National anti-government protests").style("font-size", "9px").attr("alignment-baseline","middle")
graph.append("text").attr("x", 56).attr("y", 360).text("paralize Venezuelan universities").style("font-size", "9px").attr("alignment-baseline","middle")
//Read the data
  d3.csv("qs-rankings.csv", function(data) {
  
    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
      .key(function(d) { return d.university;})
      .entries(data);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([2013,2023])
      .range([ 0, width ]);

    const xAxis = d3.axisBottom(x)
      .tickFormat(d3.format("d"))
  
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([551, 1000])
      .range([ 0, height]);
   
   
    graph.append("g").call(d3.axisLeft(y).ticks(0));
     graph.append("g").call(xAxis).attr("transform", "translate(0," + height + ")")

    // var ynew = d3.axisLeft().scale(y)
    //   .tickValues([475.5, 525.5, 576.5, 625.5, 675.5, 725.5, 775.5, 900.5, 1100.5, 1300.5])
    //   .tickFormat((d,i) => ["471-480", "501-550", "601-650", "651-700", "701-750", "751-800", "801-1000", "1001-1200", "1201-1400"][i]);
        
    //   graph.append("g")
    //   .call(d3.axisLeft(ynew).ticks(9));

// color palette
    var res = sumstat.map(function(d){ return d.key }) // list of group names
    var color = d3.scaleOrdinal()
        .domain(["UCV","ULA" ])
        .range(["#3B3C96", "#A2206B"])

  // create a tooltip
  var Tooltip = d3.select("#qs-rankings")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "2px")
    .style("padding", "2px")

      // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", .5)
  }
  var mousemove = function(d) {
    Tooltip
      .html("In " + d.date + ", " + d.university + " ranked " + d.rankingnumber + " in the QS World University Rankings.")
      .style("left", (d3.mouse(this)[0]+70) + "10px")
      .style("top", (d3.mouse(this)[1]) + "100px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 1)
  }
    // Draw the line
    graph.selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
          .attr("fill", "none")
          .attr("stroke", function(d){ return color(d.key) })
          .attr("stroke-width", 1)
          .attr("d", function(d){
            return d3.line()
              .x(function(d) { return x(d.date); })
              .y(function(d) { return y(+d.average); })
              (d.values)
          })

          // Add dots
          graph.append('g')
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
            .attr("cx", function (d) { return x(d.date); } )
            .attr("cy", function (d) { return y(d.average); } )
            .attr("r", 5)
            .style("fill", function (d) { return color(d.university) } )

// graph
  // .call(luz)
  // .call(uc)
  // .call(ucab)
  // .call(ucv)
  // .call(ula)
  // .call(unimet)
  // .call(usb)

// appen svg to values
  // LUZsvg = d3.xml("svg-universities/LUZ.png")
  // UCsvg = d3.xml("svg-universities/UC.jpg")
  // UCABsvg = d3.xml("svg-universities/UCAB.png")
  // UCVsvg = d3.xml("svg-universities/UCV.png")
  // ULAsvg = d3.xml("svg-universities/ULA.jpg")
  // Unimetsvg = d3.xml("svg-universities/Unimet.png")
  // USBsvg = d3.xml("svg-universities/USB.png")

  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)

})

          // 471-480 = 475.5
          // 501-550 = 525.5
          // 551-600 = 576.5
          // 601-650 = 625.5
          // 651-700 = 675.5
          // 701-750 = 725.5
          // 751-800 = 775.5
          // 801-1000 = 900.5
          // 1001-1200 = 1100.5
          // 1201-1400 = 1300.5
       
