<!DOCTYPE html>
<html>
<meta charset="utf-8">

<!-- Load d3.js -->
<head>
  <script src="https://d3js.org/d3.v4.js"></script>
</head>

<body>
  <svg width="600" height="500"></svg>

  <script>
    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // load the data
    d3.csv("HR analytics.csv", function (data) {

      // set up the scales
      var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.MonthlyIncome; })])
        .range([0, width]);

      var yScale = d3.scaleBand()
        .domain(data.map(function(d) { return d.Gender; }))
        .range([height, 0])
        .padding(0.1);

      var rScale = d3.scaleSqrt()
        .domain([0, d3.max(data, function(d) { return +d.MonthlyIncome; })])
        .range([0, 20]);

      // add the bubbles
      svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(+d.MonthlyIncome); })
        .attr("cy", function(d) { return yScale(d.Gender) + yScale.bandwidth()/2; })
        .attr("r", function(d) { return rScale(+d.MonthlyIncome); })
        .attr("fill", function(d) { return d.blue; });

      // add the labels
      svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(d) { return xScale(+d.MonthlyIncome) + rScale(+d.MonthlyIncome) + 5; })
        .attr("y", function(d) { return yScale(d.Gender) + yScale.bandwidth()/2 + 5; })
        .text(function(d) { return d.MonthlyIncome; })
        .style("font-family", "arial")
        .style("font-size", "12px");

      // add the axes
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

      svg.append("g")
        .call(d3.axisLeft(yScale));
    });
  </script>
</body>
</html>
