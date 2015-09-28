# Backbone-d3
___
A reusable and easy to use charting library build on top of Backbone JS with d3 and RequireJS. You can use this library for a number of things like building SPA using Backbone, Building Complex Web Apps using AMD architecture, Building Simple & Easy to use Charts or using the examples from this repository

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Introduction](#introduction)
- [Usage] (#usage)
- [Examples](#examples)
- [Dependencies](#dependencies)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Introduction

    Backbone-d3 is a reusable charting library built using a number of technologies like BackboneJS, D3, RequireJS. 
    The library is easily scalable as I have used AMD architecture to create modular charts. One can easily create 
    dashboard with a number of chart by just instantiating the view for the required chart and specifying the DOM Target
    where the chart needs to be render. Currently supported charts include Bar Chart, Scatter Plot, Donut Chart, Pie Chart 
    and many more.

## Usage
    In order to create a new chart or a dashboard you would only be required to create an instance of the chartView
    For Example PieChartView which renders a PieChart and specify the dom Target which appends the chart svg to 
    the domTarget. For creating a new dashboard with multiple report you would need to specify multipe Dom Targets
    and create instances of the particular view, which would render the report. Currently you can only send data using an
    array format which can be found in Chart View file with __getData function and you can also specify the colors for 
    the chart using __getColors function.

## Examples

Go to the example directory and you can find all the examples like:
    
    Bar Chart 
    Scatter Plot Chart
    Pie Chart
    Donut Chart
    
## Dependencies
   1. BackboneJs + Underscore
   2. D3
   3. Jquery
   4. RequireJS


