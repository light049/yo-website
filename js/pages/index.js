'use strict';

define([
    'jquery',
    'css!css_main',
    'css!css_jquery-ui',
    'jquery-ui',
    'underscore'
],

function ($, css) {
    $(function() {
        console.log('Running jQuery %s', $().jquery);


        var aryA = [1, 'ok', 29, 'o', 90, 2],
            aryB,
            objA = {
                    proA : 'p1',
                    proB : 2,
                    proC : 'three'
                };

        aryB = _.map(aryA, function(el, index, list) {
            return this.proA + el;
        }, objA);

        console.log(_.size(objA));
        // _.map(aryA, function(el, index, list) {
        //     console.log(index);
        // }, objA)
        $( "input[type=submit], a, button" )
            .button();

    });
});

