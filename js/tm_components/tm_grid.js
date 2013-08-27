
$.widget("tm.progressbar", {
    'options' : {
        className   : 'tm-progressbar',
        value       : 0,
        labelSide   : 'right',
        height      : 20,
        width       : 200
    },
    '_create' : function() {
        var self = this;
        self.model = {};
        self.view = {
            "window" : $(window),
            "body"   : $("body"),
            "grid"   : self.element
        };

        // var progress = this.options.value + '%';
        // this.element
        //     .addClass(this.options.className)
        //     .text(progress);

        self._viewInit();
    },
    '_setOption' : function( key, value ) {
        if ( key === "value" ) {
            value = this._constrain( value );
        }
        this._super( key, value );
    },
    '_setOptions' : function( options ) {
        this._super( options );
        this.refresh();
    },
    'refresh' : function() {
        var progress = this.options.value + "%";
        this.element.text( progress );
        if ( this.options.value == 100 ) {
            this._trigger( "complete", null, { value: 100 } );
        }
    },
    'value' : function(value) {
        // console.log('get value');
        var progress;

        if ( value === undefined ) {
            return this.options.value;
        }
        console.log('here start to set value')

        this.options.value = this._constrain( value );
        progress = this.options.value + '%';
        // this.element.text( progress );
    },

    '_constrain' : function( value ) {
        if ( value > 100 ) {
            value = 100;
        }
        if ( value < 0 ) {
            value = 0;
        }
        return value;
    },
    '_viewInit' : function() {
        var self    = this,
            options = self.options,
            model   = self.model,
            view    = self.view,
            control = self.control;

        $.extend(
            view, {
                'label_up_layer'   : $('<label>').addClass('top'),
                'label_down_layer' : $('<label>').addClass('bottom'),
                'bar'              : $('<div>').addClass('bar')
            });
        view.bar.append(view.label_up_layer.text(options.value + '%'));
        self.element
            .addClass(options.className)
            .append(view.label_down_layer.text(options.value + '%'))
            .append(view.bar);
    }
});
