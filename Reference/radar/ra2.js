function radar(divid,csv_type,test_data){
//var divid='#chart'
var w = 190,
	h = 190;
var colorscale = d3.scale.category10();
var dd=[];
var LegendOptions =[];
var type=[];
d3.csv(csv_type,function(ty){//'type.csv'
	console.log("ty", ty)

	ty.forEach(function(ty_d){
			type.push(ty_d.typename);
		});	

	console.log(test_data)

		LegendOptions.push(test_data[0]);
		var tmp2=[
			{axis:type[0],value:test_data[1]},
			{axis:type[1],value:test_data[2]},
			{axis:type[2],value:test_data[3]},
			{axis:type[3],value:test_data[4]},
			{axis:type[4],value:test_data[5]},
			{axis:type[5],value:test_data[6]},
			];
		console.log("tmp2", tmp2)
		dd.push(tmp2);
	
	//Options for the Radar chart, other than default
	var mycfg = {
	  w: w,
	  h: h,
	  maxValue: 10,
	  levels: 5,
	  ExtraWidthX: 200
	}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw(divid, dd, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select(divid)
	.selectAll('svg')
	.append('svg:g')
	.attr("width", w+100)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#ddd")
	.text("公司名称");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#aaa")
	  .text(function(d) { return d; })
	  ;	
});
}