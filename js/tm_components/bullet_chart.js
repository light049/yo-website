var createTickBars = function (ticks, widget) {
        var tickBar = $('<div class="tick-bar">');

        widget._container.find('.tick-bar'). remove();

        $.each(ticks, function (index, item) {
            var t = $('<div class="tick">')
                    .css({
                        'left' : item + '%'
                    }),
                t1 = $('<div class="tick-label">')
                    .css({
                        'left' : item + '%'
                    })
                    .text(item);

            tickBar
                .append(t)
                .append(t1);
        });

        widget._container.append(tickBar);
    },
    createMarkers = function (markers, widget) {

        widget._container.find('.marker'). remove();

        $.each(markers, function(index, item) {
            var marker = $('<div class="marker">')
                    .css({
                        'left' : item.value + '%'
                    })
                    .addClass(item.css)
                    .attr('marker-index', index);

            widget._container.append(marker);
        });

    },
    createBars = function (bars, widget) {

        widget._container.find('.bar'). remove();

        $.each(bars, function(index, item) {
            var bar = $('<div class="bar">')
                    .css({
                        'left'  : 0,
                        'width' : '0%'
                    })
                    .addClass(item.css)
                    .attr('bar-index', index)
                    .animate({
                        width : item.value + '%'
                    });

            widget._container.append(bar);
        });

    };

$.widget("light.bulletchart", {
    'options' : {
        size    : 100,
        bars    : [],
        markers : [],
        ticks   : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    },

    '_create' : function () {
        console.log('create bulletchart start!');

        this.element.addClass('bullet-chart');
        this._container = $('<div class="chart-container">')
            .appendTo(this.element);

        this._setOptions({
            'size'    : this.options.size,
            'ticks'   : this.options.ticks,
            'bars'    : this.options.bars,
            'markers' : this.options.markers
        });

        console.log('create bulletchart done!');
    },
    '_init': function () {
        console.log('init bulletchart');
        // console.log(this);
    },
    '_destroy' : function () {
    },
    '_setOption' : function ( key, value ) {
        // console.log('setOption start!');

        console.log('set option: ', key);

        var self  = this,
            prev  = this.options[key],
            fnMap = {
                'bars'    : function () {
                    createBars( value, self );
                },
                'markers' : function () {
                    createMarkers( value, self );
                },
                'ticks'   : function () {
                    createTickBars( value, self);
                },
                'size'    : function () {
                    self.element.find('.chart-container')
                        .css({
                            'width' : value + '%'
                        })
                }
            };

        // base
        this._super(key, value);
        // console.log(this._super);

        if ( key in fnMap ) {
            fnMap[key]();

            // fire event
            // this._triggerOptionChanged( key, prev, value );
        }

        // console.log('setOption done!');
    }
});

$.widget('light.bulletchart_legned', $.light.bulletchart, {
    options : {
        legend : true
    },

    widgetEventPrefix : $.light.bulletchart.prototype.widgetEventPrefix,

    _create : function () {

    },
    _destroy : function () {

    },
    _setOption : function ( keym vallue ) {

    }

});
