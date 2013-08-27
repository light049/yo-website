require.config({
    baseUrl: '',
    paths: {
        // 3rd party js libs define
        'jquery'           : 'components/jquery/jquery',
        'jquery-ui'        : 'components/jquery-ui/ui/jquery-ui',
        'underscore'       : 'components/underscore/underscore',

        // customized js components
        'tm_grid'          : 'js/tm_components/tm_grid',
        'bullet_chart'     : 'js/tm_components/bullet_chart',

        // stylesheets define
        'css_main'         : 'styles/main',
        'css_jquery-ui'    : 'components/jquery-ui/themes/ui-lightness/jquery-ui',
        'css_tm_grid'      : 'styles/tm_components/tm_grid',
        'css_bullet_chart' : 'styles/tm_components/bullet_chart'
    },
    map: {
        '*': {
            'css': 'components/require-css/css' // or whatever the path to require-css is
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
        'bullet_chart' : [
            'jquery-ui',
            'css!css_bullet_chart'
        ]

    }
});

