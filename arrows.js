  var width = 960,
    height = 500;

	var color = d3.scale.category20();

	var radius = d3.scale.sqrt()
    .range([0, 6]);

  var links = (linkedList.size() > 0) ? linkedList.generateGraph():"Nothing";
  var valuesArray = (linkedList.size() > 0) ? linkedList.toArray():"Nothing";
  //console.log("VALUE ARRAY 1:" + valuesArray[0]);
  var nodes1 = {};

  // Compute the distinct nodes from the links.
  links.forEach(function(link) {
    link.source = nodes1[link.source] || (nodes1[link.source] = {name: link.source});
    link.target = nodes1[link.target] || (nodes1[link.target] = {name: link.target});
  });

	var force = d3.layout.force()
    .nodes(d3.values(nodes1))
    .links(links)
    .size([width, height])
    .linkDistance(160)
    .charge(-10)
    .on("tick", tick)
    .start();

var svg = d3.select("body").append("svg:svg")
    .attr("width", width)
    .attr("height", height);

// Per-type markers, as they don't inherit styles.
svg.append("svg:defs").selectAll("marker")
    .data([])
  .enter().append("svg:marker")
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
  .enter().append("svg:path")
    .attr("class", function(d) { return "link " + d.type; })
    .attr("marker-end", function(d) { return "url(#" + links[0].target+ ")"; });

var circle = svg.append("svg:g").selectAll("circle")
    .data(force.nodes())
  .enter().append("svg:circle")
    .attr("r", 6)
    .call(force.drag);

var text = svg.append("svg:g").selectAll("g")
    .data(force.nodes())
  .enter().append("svg:g");

// A copy of the text with a thick white stroke for legibility.
text.append("svg:text")
    .attr("x", 8)
    .attr("y", ".51em")
    .attr("class", "shadow");

text.append("svg:text")
    .attr("x", 8)
    .attr("y", ".51em")
    .text(function(d) { var valuesArray = linkedList.toArray(); return valuesArray[d.index]; });


// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", function(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  });

  circle.attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });

  text.attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });
}
