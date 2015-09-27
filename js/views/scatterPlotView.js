(function (){
    define(['dependencies/jquery', 'dependencies/underscore', 'dependencies/backbone', 'dependencies/d3.min'], function ($, _, Backbone, d3) {
        "use strict";
/*
 * Initialize the scatter plot view and render the scatter plot
 * @author Rahul Raghavan
 */
var ScatterPlotView = Backbone.View.extend({
    /*
     * Initializes the scatter plot with options and call the render function
     */
    initialize: function (options) {
        // setting the default options for the scatter plot
        options.width = options.width || 960;
        options.height = options.height || 500;
        options.innerRadius = 0; // set to zero for scatter plot
        this.render(options);
    },

    /*
     * Renders the scatter plot
     */
    render: function (options) {
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            data = this.__getData();

        var x = d3.scale.linear()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          data.forEach(function(d) {
            d.sepalLength = +d.sepalLength;
            d.sepalWidth = +d.sepalWidth;
          });

          x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
          y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
            .append("text")
              .attr("class", "label")
              .attr("x", width)
              .attr("y", -6)
              .style("text-anchor", "end")
              .text("Sepal Width (cm)");

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("class", "label")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Sepal Length (cm)")

          svg.selectAll(".dot")
              .data(data)
            .enter().append("circle")
              .attr("class", "dot")
              .attr("r", 3.5)
              .attr("cx", function(d) { return x(d.sepalWidth); })
              .attr("cy", function(d) { return y(d.sepalLength); })
              .style("fill", function(d) { return color(d.species); });

          var legend = svg.selectAll(".legend")
              .data(color.domain())
            .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

          legend.append("rect")
              .attr("x", width - 18)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", color);

          legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) { return d; });

    },

    /*
     * Returns the data object in json format
     */
    __getData: function () {
            return [{"sepalLength":5.1,"sepalWidth":3.5,"petalLength":1.4,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.9,"sepalWidth":3,"petalLength":1.4,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.7,"sepalWidth":3.2,"petalLength":1.3,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.6,"sepalWidth":3.1,"petalLength":1.5,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5,"sepalWidth":3.6,"petalLength":1.4,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5.4,"sepalWidth":3.9,"petalLength":1.7,"petalWidth":0.4,"species":"setosa"},{"sepalLength":4.6,"sepalWidth":3.4,"petalLength":1.4,"petalWidth":0.3,"species":"setosa"},{"sepalLength":5,"sepalWidth":3.4,"petalLength":1.5,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.4,"sepalWidth":2.9,"petalLength":1.4,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.9,"sepalWidth":3.1,"petalLength":1.5,"petalWidth":0.1,"species":"setosa"},{"sepalLength":5.4,"sepalWidth":3.7,"petalLength":1.5,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.8,"sepalWidth":3.4,"petalLength":1.6,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.8,"sepalWidth":3,"petalLength":1.4,"petalWidth":0.1,"species":"setosa"},{"sepalLength":4.3,"sepalWidth":3,"petalLength":1.1,"petalWidth":0.1,"species":"setosa"},{"sepalLength":5.8,"sepalWidth":4,"petalLength":1.2,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5.7,"sepalWidth":4.4,"petalLength":1.5,"petalWidth":0.4,"species":"setosa"},{"sepalLength":5.4,"sepalWidth":3.9,"petalLength":1.3,"petalWidth":0.4,"species":"setosa"},{"sepalLength":5.1,"sepalWidth":3.5,"petalLength":1.4,"petalWidth":0.3,"species":"setosa"},{"sepalLength":5.7,"sepalWidth":3.8,"petalLength":1.7,"petalWidth":0.3,"species":"setosa"},{"sepalLength":5.1,"sepalWidth":3.8,"petalLength":1.5,"petalWidth":0.3,"species":"setosa"},{"sepalLength":5.4,"sepalWidth":3.4,"petalLength":1.7,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5.1,"sepalWidth":3.7,"petalLength":1.5,"petalWidth":0.4,"species":"setosa"},{"sepalLength":4.6,"sepalWidth":3.6,"petalLength":1,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5.1,"sepalWidth":3.3,"petalLength":1.7,"petalWidth":0.5,"species":"setosa"},{"sepalLength":4.8,"sepalWidth":3.4,"petalLength":1.9,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5,"sepalWidth":3,"petalLength":1.6,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5,"sepalWidth":3.4,"petalLength":1.6,"petalWidth":0.4,"species":"setosa"},{"sepalLength":5.2,"sepalWidth":3.5,"petalLength":1.5,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5.2,"sepalWidth":3.4,"petalLength":1.4,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.7,"sepalWidth":3.2,"petalLength":1.6,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.8,"sepalWidth":3.1,"petalLength":1.6,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5.4,"sepalWidth":3.4,"petalLength":1.5,"petalWidth":0.4,"species":"setosa"},{"sepalLength":5.2,"sepalWidth":4.1,"petalLength":1.5,"petalWidth":0.1,"species":"setosa"},{"sepalLength":5.5,"sepalWidth":4.2,"petalLength":1.4,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.9,"sepalWidth":3.1,"petalLength":1.5,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5,"sepalWidth":3.2,"petalLength":1.2,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5.5,"sepalWidth":3.5,"petalLength":1.3,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.9,"sepalWidth":3.6,"petalLength":1.4,"petalWidth":0.1,"species":"setosa"},{"sepalLength":4.4,"sepalWidth":3,"petalLength":1.3,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5.1,"sepalWidth":3.4,"petalLength":1.5,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5,"sepalWidth":3.5,"petalLength":1.3,"petalWidth":0.3,"species":"setosa"},{"sepalLength":4.5,"sepalWidth":2.3,"petalLength":1.3,"petalWidth":0.3,"species":"setosa"},{"sepalLength":4.4,"sepalWidth":3.2,"petalLength":1.3,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5,"sepalWidth":3.5,"petalLength":1.6,"petalWidth":0.6,"species":"setosa"},{"sepalLength":5.1,"sepalWidth":3.8,"petalLength":1.9,"petalWidth":0.4,"species":"setosa"},{"sepalLength":4.8,"sepalWidth":3,"petalLength":1.4,"petalWidth":0.3,"species":"setosa"},{"sepalLength":5.1,"sepalWidth":3.8,"petalLength":1.6,"petalWidth":0.2,"species":"setosa"},{"sepalLength":4.6,"sepalWidth":3.2,"petalLength":1.4,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5.3,"sepalWidth":3.7,"petalLength":1.5,"petalWidth":0.2,"species":"setosa"},{"sepalLength":5,"sepalWidth":3.3,"petalLength":1.4,"petalWidth":0.2,"species":"setosa"},{"sepalLength":7,"sepalWidth":3.2,"petalLength":4.7,"petalWidth":1.4,"species":"versicolor"},{"sepalLength":6.4,"sepalWidth":3.2,"petalLength":4.5,"petalWidth":1.5,"species":"versicolor"},{"sepalLength":6.9,"sepalWidth":3.1,"petalLength":4.9,"petalWidth":1.5,"species":"versicolor"},{"sepalLength":5.5,"sepalWidth":2.3,"petalLength":4,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":6.5,"sepalWidth":2.8,"petalLength":4.6,"petalWidth":1.5,"species":"versicolor"},{"sepalLength":5.7,"sepalWidth":2.8,"petalLength":4.5,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":6.3,"sepalWidth":3.3,"petalLength":4.7,"petalWidth":1.6,"species":"versicolor"},{"sepalLength":4.9,"sepalWidth":2.4,"petalLength":3.3,"petalWidth":1,"species":"versicolor"},{"sepalLength":6.6,"sepalWidth":2.9,"petalLength":4.6,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":5.2,"sepalWidth":2.7,"petalLength":3.9,"petalWidth":1.4,"species":"versicolor"},{"sepalLength":5,"sepalWidth":2,"petalLength":3.5,"petalWidth":1,"species":"versicolor"},{"sepalLength":5.9,"sepalWidth":3,"petalLength":4.2,"petalWidth":1.5,"species":"versicolor"},{"sepalLength":6,"sepalWidth":2.2,"petalLength":4,"petalWidth":1,"species":"versicolor"},{"sepalLength":6.1,"sepalWidth":2.9,"petalLength":4.7,"petalWidth":1.4,"species":"versicolor"},{"sepalLength":5.6,"sepalWidth":2.9,"petalLength":3.6,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":6.7,"sepalWidth":3.1,"petalLength":4.4,"petalWidth":1.4,"species":"versicolor"},{"sepalLength":5.6,"sepalWidth":3,"petalLength":4.5,"petalWidth":1.5,"species":"versicolor"},{"sepalLength":5.8,"sepalWidth":2.7,"petalLength":4.1,"petalWidth":1,"species":"versicolor"},{"sepalLength":6.2,"sepalWidth":2.2,"petalLength":4.5,"petalWidth":1.5,"species":"versicolor"},{"sepalLength":5.6,"sepalWidth":2.5,"petalLength":3.9,"petalWidth":1.1,"species":"versicolor"},{"sepalLength":5.9,"sepalWidth":3.2,"petalLength":4.8,"petalWidth":1.8,"species":"versicolor"},{"sepalLength":6.1,"sepalWidth":2.8,"petalLength":4,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":6.3,"sepalWidth":2.5,"petalLength":4.9,"petalWidth":1.5,"species":"versicolor"},{"sepalLength":6.1,"sepalWidth":2.8,"petalLength":4.7,"petalWidth":1.2,"species":"versicolor"},{"sepalLength":6.4,"sepalWidth":2.9,"petalLength":4.3,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":6.6,"sepalWidth":3,"petalLength":4.4,"petalWidth":1.4,"species":"versicolor"},{"sepalLength":6.8,"sepalWidth":2.8,"petalLength":4.8,"petalWidth":1.4,"species":"versicolor"},{"sepalLength":6.7,"sepalWidth":3,"petalLength":5,"petalWidth":1.7,"species":"versicolor"},{"sepalLength":6,"sepalWidth":2.9,"petalLength":4.5,"petalWidth":1.5,"species":"versicolor"},{"sepalLength":5.7,"sepalWidth":2.6,"petalLength":3.5,"petalWidth":1,"species":"versicolor"},{"sepalLength":5.5,"sepalWidth":2.4,"petalLength":3.8,"petalWidth":1.1,"species":"versicolor"},{"sepalLength":5.5,"sepalWidth":2.4,"petalLength":3.7,"petalWidth":1,"species":"versicolor"},{"sepalLength":5.8,"sepalWidth":2.7,"petalLength":3.9,"petalWidth":1.2,"species":"versicolor"},{"sepalLength":6,"sepalWidth":2.7,"petalLength":5.1,"petalWidth":1.6,"species":"versicolor"},{"sepalLength":5.4,"sepalWidth":3,"petalLength":4.5,"petalWidth":1.5,"species":"versicolor"},{"sepalLength":6,"sepalWidth":3.4,"petalLength":4.5,"petalWidth":1.6,"species":"versicolor"},{"sepalLength":6.7,"sepalWidth":3.1,"petalLength":4.7,"petalWidth":1.5,"species":"versicolor"},{"sepalLength":6.3,"sepalWidth":2.3,"petalLength":4.4,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":5.6,"sepalWidth":3,"petalLength":4.1,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":5.5,"sepalWidth":2.5,"petalLength":4,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":5.5,"sepalWidth":2.6,"petalLength":4.4,"petalWidth":1.2,"species":"versicolor"},{"sepalLength":6.1,"sepalWidth":3,"petalLength":4.6,"petalWidth":1.4,"species":"versicolor"},{"sepalLength":5.8,"sepalWidth":2.6,"petalLength":4,"petalWidth":1.2,"species":"versicolor"},{"sepalLength":5,"sepalWidth":2.3,"petalLength":3.3,"petalWidth":1,"species":"versicolor"},{"sepalLength":5.6,"sepalWidth":2.7,"petalLength":4.2,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":5.7,"sepalWidth":3,"petalLength":4.2,"petalWidth":1.2,"species":"versicolor"},{"sepalLength":5.7,"sepalWidth":2.9,"petalLength":4.2,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":6.2,"sepalWidth":2.9,"petalLength":4.3,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":5.1,"sepalWidth":2.5,"petalLength":3,"petalWidth":1.1,"species":"versicolor"},{"sepalLength":5.7,"sepalWidth":2.8,"petalLength":4.1,"petalWidth":1.3,"species":"versicolor"},{"sepalLength":6.3,"sepalWidth":3.3,"petalLength":6,"petalWidth":2.5,"species":"virginica"},{"sepalLength":5.8,"sepalWidth":2.7,"petalLength":5.1,"petalWidth":1.9,"species":"virginica"},{"sepalLength":7.1,"sepalWidth":3,"petalLength":5.9,"petalWidth":2.1,"species":"virginica"},{"sepalLength":6.3,"sepalWidth":2.9,"petalLength":5.6,"petalWidth":1.8,"species":"virginica"},{"sepalLength":6.5,"sepalWidth":3,"petalLength":5.8,"petalWidth":2.2,"species":"virginica"},{"sepalLength":7.6,"sepalWidth":3,"petalLength":6.6,"petalWidth":2.1,"species":"virginica"},{"sepalLength":4.9,"sepalWidth":2.5,"petalLength":4.5,"petalWidth":1.7,"species":"virginica"},{"sepalLength":7.3,"sepalWidth":2.9,"petalLength":6.3,"petalWidth":1.8,"species":"virginica"},{"sepalLength":6.7,"sepalWidth":2.5,"petalLength":5.8,"petalWidth":1.8,"species":"virginica"},{"sepalLength":7.2,"sepalWidth":3.6,"petalLength":6.1,"petalWidth":2.5,"species":"virginica"},{"sepalLength":6.5,"sepalWidth":3.2,"petalLength":5.1,"petalWidth":2,"species":"virginica"},{"sepalLength":6.4,"sepalWidth":2.7,"petalLength":5.3,"petalWidth":1.9,"species":"virginica"},{"sepalLength":6.8,"sepalWidth":3,"petalLength":5.5,"petalWidth":2.1,"species":"virginica"},{"sepalLength":5.7,"sepalWidth":2.5,"petalLength":5,"petalWidth":2,"species":"virginica"},{"sepalLength":5.8,"sepalWidth":2.8,"petalLength":5.1,"petalWidth":2.4,"species":"virginica"},{"sepalLength":6.4,"sepalWidth":3.2,"petalLength":5.3,"petalWidth":2.3,"species":"virginica"},{"sepalLength":6.5,"sepalWidth":3,"petalLength":5.5,"petalWidth":1.8,"species":"virginica"},{"sepalLength":7.7,"sepalWidth":3.8,"petalLength":6.7,"petalWidth":2.2,"species":"virginica"},{"sepalLength":7.7,"sepalWidth":2.6,"petalLength":6.9,"petalWidth":2.3,"species":"virginica"},{"sepalLength":6,"sepalWidth":2.2,"petalLength":5,"petalWidth":1.5,"species":"virginica"},{"sepalLength":6.9,"sepalWidth":3.2,"petalLength":5.7,"petalWidth":2.3,"species":"virginica"},{"sepalLength":5.6,"sepalWidth":2.8,"petalLength":4.9,"petalWidth":2,"species":"virginica"},{"sepalLength":7.7,"sepalWidth":2.8,"petalLength":6.7,"petalWidth":2,"species":"virginica"},{"sepalLength":6.3,"sepalWidth":2.7,"petalLength":4.9,"petalWidth":1.8,"species":"virginica"},{"sepalLength":6.7,"sepalWidth":3.3,"petalLength":5.7,"petalWidth":2.1,"species":"virginica"},{"sepalLength":7.2,"sepalWidth":3.2,"petalLength":6,"petalWidth":1.8,"species":"virginica"},{"sepalLength":6.2,"sepalWidth":2.8,"petalLength":4.8,"petalWidth":1.8,"species":"virginica"},{"sepalLength":6.1,"sepalWidth":3,"petalLength":4.9,"petalWidth":1.8,"species":"virginica"},{"sepalLength":6.4,"sepalWidth":2.8,"petalLength":5.6,"petalWidth":2.1,"species":"virginica"},{"sepalLength":7.2,"sepalWidth":3,"petalLength":5.8,"petalWidth":1.6,"species":"virginica"},{"sepalLength":7.4,"sepalWidth":2.8,"petalLength":6.1,"petalWidth":1.9,"species":"virginica"},{"sepalLength":7.9,"sepalWidth":3.8,"petalLength":6.4,"petalWidth":2,"species":"virginica"},{"sepalLength":6.4,"sepalWidth":2.8,"petalLength":5.6,"petalWidth":2.2,"species":"virginica"},{"sepalLength":6.3,"sepalWidth":2.8,"petalLength":5.1,"petalWidth":1.5,"species":"virginica"},{"sepalLength":6.1,"sepalWidth":2.6,"petalLength":5.6,"petalWidth":1.4,"species":"virginica"},{"sepalLength":7.7,"sepalWidth":3,"petalLength":6.1,"petalWidth":2.3,"species":"virginica"},{"sepalLength":6.3,"sepalWidth":3.4,"petalLength":5.6,"petalWidth":2.4,"species":"virginica"},{"sepalLength":6.4,"sepalWidth":3.1,"petalLength":5.5,"petalWidth":1.8,"species":"virginica"},{"sepalLength":6,"sepalWidth":3,"petalLength":4.8,"petalWidth":1.8,"species":"virginica"},{"sepalLength":6.9,"sepalWidth":3.1,"petalLength":5.4,"petalWidth":2.1,"species":"virginica"},{"sepalLength":6.7,"sepalWidth":3.1,"petalLength":5.6,"petalWidth":2.4,"species":"virginica"},{"sepalLength":6.9,"sepalWidth":3.1,"petalLength":5.1,"petalWidth":2.3,"species":"virginica"},{"sepalLength":5.8,"sepalWidth":2.7,"petalLength":5.1,"petalWidth":1.9,"species":"virginica"},{"sepalLength":6.8,"sepalWidth":3.2,"petalLength":5.9,"petalWidth":2.3,"species":"virginica"},{"sepalLength":6.7,"sepalWidth":3.3,"petalLength":5.7,"petalWidth":2.5,"species":"virginica"},{"sepalLength":6.7,"sepalWidth":3,"petalLength":5.2,"petalWidth":2.3,"species":"virginica"},{"sepalLength":6.3,"sepalWidth":2.5,"petalLength":5,"petalWidth":1.9,"species":"virginica"},{"sepalLength":6.5,"sepalWidth":3,"petalLength":5.2,"petalWidth":2,"species":"virginica"},{"sepalLength":6.2,"sepalWidth":3.4,"petalLength":5.4,"petalWidth":2.3,"species":"virginica"},{"sepalLength":5.9,"sepalWidth":3,"petalLength":5.1,"petalWidth":1.8,"species":"virginica"}]; // specify the data for the scatter plot
        },

    /*
     * Returns the colors for the scatter plot
     */
    __getColors: function () {
        return ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]; // specify the colors for the scatter plot
    }
});
return ScatterPlotView;
    });
})();