require.config({
    baseUrl: '',
    paths: {
        // 3rd party js libs define
        'jquery'         : 'components/jquery/jquery',
        'jquery-ui'      : 'components/jquery-ui/ui/jquery-ui',
        'underscore'     : 'components/underscore/underscore',

        // customized js components
        'tm_grid'        : 'js/tm_components/tm_grid',

        // stylesheets define
        'css_main'       : 'styles/main',
        'css_jquery-ui'  : 'components/jquery-ui/themes/ui-lightness/jquery-ui',
        'css_tm_grid'    : 'styles/tm_components/tm_grid'
    },
    map: {
        '*': {
            'css': 'components/require-css/css' // or whatever the path to require-css is
        }
    },
    shim: {
        'jquery-ui'  : [
            'jquery',
            'css!css_jquery-ui'
        ],
        'tm_grid'    : [
            'jquery-ui',
            'css!css_tm_grid'
        ]

    }
});

