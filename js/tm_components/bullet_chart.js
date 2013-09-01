(function ($) {
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

        },
        createLegend = function (markers, bars, widget) {
            // clear existing
            widget._legend.empty();

            var items = $.map(markers, function (item, index) {
                    return $.extend({
                        type  : 'markers',
                        index : index
                    }, item);
                }).concat($.map(bars, function (item, index) {
                    return $.extend({
                        type  : 'bar',
                        index : index
                    }, item);
                }));

            $.each(items, function (index, item) {
                // console.log(item)
                var marker = $('<span class="legend-symbol">')
                        .addClass(item.type)
                        .addClass(item.css),
                    label = $('<span class="legend-label">')
                        .text(item.title);

                $('<div class="legend-item">')
                    .append(marker)
                    .append(label)
                    .data('chart-item', {
                        type  : item.type,
                        index : item.index
                    })
                    .appendTo(widget._legend);
            });
        };


    $.widget("light.bulletchart", {
        'options' : {
            size    : 100,
            bars    : [],
            markers : [],
            ticks   : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },

        widgetEventPrefix : 'bulletchart:',

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
                this._triggerOptionChanged( key, prev, value );
            }

            // console.log('setOption done!');
        },
        _triggerOptionChanged : function (optionKey, previousValue, currentValue) {
            console.log('triggerOptionCganged!');

            this._trigger('setOption', {type: 'setOption'}, {
                option   : optionKey,
                previous : previousValue,
                current  : currentValue
            });
        }
    });

    $.widget('light.bulletchart_legned', $.light.bulletchart, {
        options : {
            // show/hide legned
            legend : true
        },

        // this ensure we keep the same namespace as the base
        widgetEventPrefix : $.light.bulletchart.prototype.widgetEventPrefix,

        _create : function () {
            console.log('create bulletchart_legned start!');
            var self = this;

            this._legend = $('<div class="legend">')
                .appendTo(this.element);

            // Apply legend on changes to markers and bars
            this.element.on('bulletchart:setoption', function (event, data) {
                console.log(data);
                switch (data.option) {
                    case 'markers':
                        createLegend(data.current, self.options.bars, self);
                        break;
                    case 'bars':
                        createLegend(self.options.markers, data.current, self);
                        break;
                    default:
                };
            });

            // listen to clicks on the legned-items
            this._on({
                'click .legned-item' : function (event) {
                    var elt = $(event.event.currentTarget),
                        item = elt.data('chart-item'),
                        selector = '[' + item.type + '-index=' + item.index + ']';

                    this.element.find(selector).fadeToggle();
                    elt.toggleClass("fade");
                }
            });

            this._super();

            this._setOption('legend', this.options.legend);
            console.log('create bulletchart_legned done!');

        },
        '_init': function () {
            this._super();
            console.log('init bulletchart_legned');
            // console.log(this);
        },
        _destroy : function () {
            this.element.find('.legend').empty();

            this._super();
        },
        _setOption : function ( key, vallue ) {
            this._super( key, vallue );
        }

    });

})(jQuery);

