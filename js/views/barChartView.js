/*
 * Initialize the Bar chart view and render the Bar chart
 * @author Rahul Raghavan
 */
var BarChartView = Backbone.View.extend({
    /*
     * Initializes the Bar chart with options and call the render function
     */
    initialize: function (options) {
        // setting the default options for the Bar chart
        options.width = options.width || 960;
        options.height = options.height || 500;
        this.render(options);
    },

    /*
     * Renders the Bar chart
     */
    render: function (options) {
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = options.width - margin.left - margin.right,
            height = options.height - margin.top - margin.bottom
            data = this.__getData(),
            colors = this.__getColors();

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");

        var svg = d3.select(options.el).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            x.domain(data.map(function(d) { return d.label; }));
            y.domain([0, d3.max(data, function(d) { return d.value; })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Value");

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr('fill',colors)
                .attr("x", function(d) { return x(d.label); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); });
    },

    /*
     * Returns the data object in json format
     */
    __getData: function () {
        return [{"label":"A","value":0.08167},{"label":"B","value":0.01492},{"label":"C","value":0.02782},{"label":"D","value":0.04253},{"label":"E","value":0.12702},{"label":"F","value":0.02288},{"label":"G","value":0.02015},{"label":"H","value":0.06094},{"label":"I","value":0.06966},{"label":"J","value":0.00153},{"label":"K","value":0.00772},{"label":"L","value":0.04025},{"label":"M","value":0.02406},{"label":"N","value":0.06749},{"label":"O","value":0.07507},{"label":"P","value":0.01929},{"label":"Q","value":0.00095},{"label":"R","value":0.05987},{"label":"S","value":0.06327},{"label":"T","value":0.09056},{"label":"U","value":0.02758},{"label":"V","value":0.00978},{"label":"W","value":0.0236},{"label":"X","value":0.0015},{"label":"Y","value":0.01974},{"label":"Z","value":0.00074}] // specify the data for the Bar chart
    },

    /*
     * Returns the colors for the Bar chart
     */
    __getColors: function () {
        return ["steelblue"]; // specify the colors for the Bar chart
    }
});

