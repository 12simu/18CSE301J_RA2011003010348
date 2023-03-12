<!doctype html>
<html>
<head>
    <style>
        .bar {
            fill: steelblue;
        }
    </style>
    <script src="https://d3js.org/d3.v4.min.js"></script>
</head>
<body>
<svg width="600" height="500"></svg>
<script>
var svg = d3.select("svg"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin


var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("HR analytics.csv", function(error, data) {
        if (error) {
            throw error;
        }

        xScale.domain(data.map(function(d) { return d.Department; }));
        yScale.domain([0, d3.max(data, function(d) { return d.HourlyRate; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Department");

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return "$" + d;
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Hourly Rate");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.Department); })
         .attr("y", function(d) { return yScale(d.HourlyRate); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.HourlyRate); });
    });
</script>
</body>
</html>
