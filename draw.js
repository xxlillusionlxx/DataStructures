
function draw() {
    var data = linkedList.toArray();

    var x = d3.scale.linear();

    d3.select(".chart")
      .selectAll("div")
        .data(data)
      .enter().append("div").transition()
      .attr("class","list-box")
        /*.style("width", function(d) { return 75+ "px"; })
        .style("height", function(d) { return 50 + "px"; })*/
        .text(function(d) { return "Value: "+ d; }); 
} 

function rmvDraw() {
	var x = linkedList.toArray();

	d3.selectAll('.chart div')
      .data(x, function(d) { return(d); })
      .order()    
      .exit()
      .transition()
      .remove();
}
