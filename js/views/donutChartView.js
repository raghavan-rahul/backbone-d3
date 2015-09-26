/*
 * Initialize the donut chart view and render the donut chart
 * @author Rahul Raghavan
 */
var DonutChartView = Backbone.View.extend({
    /*
     * Initializes the donut chart with options and call the render function
     */
    initialize: function (options) {
        // setting the default options for the donut chart
        options.width = options.width || 960;
        options.height = options.height || 500;
        options.innerRadius = 0; // set to zero for donut chart
        this.render(options);
    },

    /*
     * Renders the donut chart
     */
    render: function (options) {
        var width = options.width,
            height = options.height,
            radius = Math.min(width, height) / 2,
            data = this.__getData(),
            colors = this.__getColors();

        var color = d3.scale.ordinal()
            .range(colors);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 70);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function (d) {
                return d.value;
            });

        var svg = d3.select(options.el).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        data.forEach(function (d) {
            d.value = +d.value;
        });

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function (d) {
                return color(d.data.label);
            });

        g.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.label;
            });
    },

    /*
     * Returns the data object in json format
     */
    __getData: function () {
        return [
            {
                "label": "<5",
                "value": "2704659"
            },
            {
                "label": "5-13",
                "value": "4499890"
            },
            {
                "label": "14-17",
                "value": "2159981"
            },
            {
                "label": "18-24",
                "value": "3853788"
            },
            {
                "label": "25-44",
                "value": "14106543"
            },
            {
                "label": "45-64",
                "value": "8819342"
            },
            {
                "label": "≥65",
                "value": "612463"
            }
        ]; // specify the data for the donut chart
    },

    /*
     * Returns the colors for the donut chart
     */
    __getColors: function () {
        return ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]; // specify the colors for the donut chart
    }
});

