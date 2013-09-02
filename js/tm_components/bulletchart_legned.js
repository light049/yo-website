(function ($) {
    var createLegend = function (markers, bars, widget) {
            // clear existing
            widget._legend.empty();

            var items = $.map(markers, function (item, index) {
                    return $.extend({
                        type  : 'marker',
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

