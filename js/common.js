require.config({
    baseUrl: '',
    paths: {
        // 3rd party js libs define
        'jquery'             : 'bower_components/jquery/jquery',
        'jquery-ui'          : 'bower_components/jquery-ui/ui/jquery-ui',
        'underscore'         : 'bower_components/underscore/underscore',

        // customized js components
        'tm_grid'            : 'js/tm_components/tm_grid',
        'bulletchart'        : 'js/tm_components/bulletchart',
        'bulletchart_legned' : 'js/tm_components/bulletchart_legned',

        // stylesheets define
        'css_main'           : 'styles/main',
        'css_jquery-ui'      : 'bower_components/jquery-ui/themes/ui-lightness/jquery-ui',
        'css_tm_grid'        : 'styles/tm_components/tm_grid',
        'css_bulletchart'    : 'styles/tm_components/bulletchart'
    },
    map: {
        '*': {
            'css': 'bower_components/require-css/css' // or whatever the path to require-css is
        }
    },
    shim: {
        'jquery-ui'    : [
            'jquery',
            'css!css_jquery-ui'
        ],
        'tm_grid'      : [
            'jquery-ui',
            'css!css_tm_grid'
        ],
        'bulletchart' : [
            'jquery-ui',
            'css!css_bulletchart'
        ],
        'bulletchart_legned' : [
            'bulletchart'
        ]

    }
});

