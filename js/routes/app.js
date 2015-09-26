/*
 * Specify the routes for your app
 * @author Rahul Raghavan
 */
var AppRoute = Backbone.Router.extend({

    routes: { // define the routes for the app
        'pie-chart': '__renderPieChart',
        'donut-chart': '__renderDonutChart'
    },
    __renderPieChart: function () {
        // renders the Pie Chart view
        var pieChartView = new PieChartView({el: "#chart"});
    },
    __renderDonutChart: function () {
        // renders the Donut Chart view
        var donutChartView = new DonutChartView({el: "#chart"});
    }

});
