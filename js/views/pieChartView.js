/*
* Initialize the pie chart view and render the pie chart
* @author Rahul Raghavan
*/
var PieChartView = Backbone.View.extend({
	/*
	* Initializes the pie chart with options and call the render function
	*/
	initialize : function(options) {
		// setting the default options for the pie char
		options.width = 960;
		options.height = 500;
		options.innerRadius = 0; // set to zero for pie chart
		this.render(options);
	},

	/*
	* Renders the pie chart
	*/
	render : function(options) {
		var width = options.width,
				height = options.height,
				radius = Math.min(width, height) / 2;
		var color = this.getColors();
		var data = this.getData();

		var color = d3.scale.ordinal()
								.range(color);

		var arc = d3.svg.arc()
							.outerRadius(radius - 10)
							.innerRadius(options.innerRadius);

		var pie = d3.layout.pie()
							.sort(null)
							.value(function(d) { return d.value; });

		var svg = d3.select("body").append("svg")
						.attr("width", width)
						.attr("height", height)
						.append("g")
						.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		data.forEach(function(d) {
			d.value = +d.value;
		});

		var g = svg.selectAll(".arc")
							.data(pie(data))
							.enter().append("g")
							.attr("class", "arc");

		g.append("path")
			.attr("d", arc)
			.style("fill", function(d) { return color(d.data.label); });

		g.append("text")
			.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.style("text-anchor", "middle")
			.text(function(d) { return d.data.label; });
	}

	/*
	* Returns the data object in json format
	*/
	getData : function () {
		return []; // specify the data for the pie chart
	}

	/*
	* Returns the colors for the pie chart
	*/
	getColors : function () {
		return []; // specify the colors for the pie chart
	}
});
