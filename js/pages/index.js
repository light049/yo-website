'use strict';

define([
    'jquery',
    'css!css_main',
    // 'css!css_jquery-ui',
    'jquery-ui',
    'underscore',
    'tm_grid'
],

function ($, css) {
    $(function() {
        console.log('Running jQuery %s', $().jquery);


        var aryA = [1, 'ok', 29, 'o', 90, 2],
            aryB,
            aryC = [[5, 40, 2], ['pl', 5, 22], [9, 18, 1, 222]],
            aryC_r,
            aryC_rR,
            objA = {
                    proA : 'p1',
                    proB : 2,
                    proC : 'three',
                    funcA : function() {
                        console.log('msg');
                    }
                },
            objB = _.extend({
                    proD : 'p1',
                    proE : 2,
                    proC : 'C',
                    funcA : function() {
                        console.log('msg');
                    }
                }, objA),
            initial = 'init',
            progressbar = $('.percent')
                .progressbar({value: 20});

        progressbar.progressbar('value', 10);
        console.log(progressbar.progressbar('value'));

        aryB = _.map(aryA, function(el, index, list) {
            return this.proA + el;
        }, objA);

        aryC_r = _.reduce(aryA, function(init, el) {
            return init + el;
        }, 3, objA);

        aryC_rR = _.reduceRight(aryC, function(init, el) {
            return init + el;
        }, 3, objA);

        // console.log(objB);

        // console.log(_.functions(objA));

        // for (var p in objB) {
        //     console.log(p);
        // };
        // _.map(aryA, function(el, index, list) {
        //     console.log(index);
        // }, objA)

        $( "input[type=submit], a, button")
            .button()
            .bind('click', function(e) {
                console.log(e.target);
            });

        var buttonView = {
            label   : 'underscore',
            onClick : function(e){
                console.log(e.data);
                alert('clicked: ' + e.data.label);
            },
            onHover : function(e){
                console.log(e);
                console.log(this);
                console.log('hovering: ' + e.data.label);}
            };
        // _.bindAll(buttonView, 'onClick', 'onHover');
        // When the button is clicked, this.label will have the correct value.
        $('#underscore_button').bind('click', buttonView, buttonView.onClick);
        $('#underscore_button').bind('mouseenter', buttonView, buttonView.onHover);

    });
});

