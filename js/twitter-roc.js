(function() {
	
/*var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#hybrid-roc").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/
	
var svg = d3.select("#twitter-roc").append("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960,
    height = 500,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.fpr); })
    .y(function(d) { return y(d.tpr); });
	
/*var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")*/

d3.tsv("./data/twitter_roc_data.tsv", function(d) {
  d.fpr = +d.fpr;
  d.tpr = +d.tpr;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.fpr; }));
  y.domain(d3.extent(data, function(d) { return d.tpr; }));

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .select(".domain")
      .remove();
	  
  g.append("text")      // text label for the x axis
   	  .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height - 6)
	  .text("False Positive Rate");
	  
      //.attr("x", 500)
      //.attr("y", 500)
      //.attr("text-anchor", "end")
        //.style("text-anchor", "middle")
      //.text("False Positive Rate");

  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("True Positive Rate");

  g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
	  //.style("stroke-dasharray", ("3, 3"))
      .attr("d", line);
});

}())