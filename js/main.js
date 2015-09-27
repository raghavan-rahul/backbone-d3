require.config({
    waitSeconds: 60,
    baseUrl : "../js",
    packages: [
        {
            name : "jquery",
            location : "./dependencies",
            main : "jquery"
        },
        {
            name : "underscore",
            location : "./dependencies",
            main : "underscore"
        },
        {
            name : "Backbone",
            location : "./dependencies",
            main : "backbone"
        },
        {
            name : "d3",
            location : "./dependencies",
            main : "d3.min"
        }
    ]
});

require(['dependencies/jquery', 'dependencies/underscore', 'dependencies/backbone', 'routes/app'], function ($, _, Backbone, AppRoute) {
    Backbone.history.start();
    var appRoute = new AppRoute();
});