(function() {
    define(['dependencies/jquery', 'dependencies/underscore', 'dependencies/backbone', 'dependencies/d3.min', 'dependencies/topojson'], function ($, _, Backbone, d3, topojson) {
        "use strict";
        /*
         * Initialize the US map view and render the US map
         * @author Rahul Raghavan
         */
        var UsMapView = Backbone.View.extend({
            /*
             * Initializes the US map with options and call the render function
             */
            initialize: function (options) {
                this.render(options);
            },

            /*
             * Renders the US map
             */
            render: function (options) {
              // specify the url for you web server to get us map data
                jQuery.get('http://localhost/us.json', function(us) {
                  d3.select(options.el).append("svg").append("path")
                      .datum(topojson.feature(us, us.objects.states))
                      .attr("d", d3.geo.path());
                });



            },
            __getData : function() {
                return [];
            },
            __getColors : function() {
                return [];
            }
        });
        return UsMapView;
    });
})();
