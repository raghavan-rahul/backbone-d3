/*
 * Specify the routes for your app
 * @author Rahul Raghavan
 */
var AppRoute = Backbone.Router.extend({

    routes: { // define the routes for the app
        'pie-chart': '__renderPieChart',
        'donut-chart': '__renderDonutChart',
        'bar-chart': '__renderBarChart',
        'dashboard' : '__renderDashboard'
    },
    __renderPieChart: function () {
        // renders the Pie Chart view
        var pieChartView = new PieChartView({el: "#chart"});
    },
    __renderDonutChart: function () {
        // renders the Donut Chart view
        var donutChartView = new DonutChartView({el: "#chart"});
    },
    __renderBarChart: function () {
        // renders the Bar Chart view
        var barChartView = new BarChartView({el: "#chart"});
    },
    __renderDashboard: function () {
        // renders the Bard Chart view
        var barChartView = new BarChartView({el: "#bar-chart", "width" : 500, "height" : 360});
        //render the Pie Chart view
        var pieChartView = new PieChartView({el: "#pie-chart", "width" : 500, "height" : 360});
    },


});
