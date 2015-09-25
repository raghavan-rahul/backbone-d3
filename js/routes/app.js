/*
* Specify the routes for your app
* @author Rahul Raghavan
*/
var AppRoute = Backbone.Router.extend({

    routes: { // define the routes for the app
        '*actions': '__renderPieChart'
    },
    __renderPieChart: function () {
        // renders the Pie Chart view
        var pieChartView = new PieChartView({el: "#chart"});

    }

});
