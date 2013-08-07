require.config({
    baseUrl: '',
    paths: {
        'jquery'         : 'components/jquery/jquery',
        'jquery-ui'      : 'components/jquery-ui/ui/jquery-ui',
        'underscore'     : 'components/underscore/underscore',

        'css_main'       : 'styles/main',
        'css_jquery-ui'  : 'components/jquery-ui/themes/ui-lightness/jquery-ui'
    },
    map: {
        '*': {
            'css': 'components/require-css/css' // or whatever the path to require-css is
        }
    },
    shim: {
        'jquery-ui'  : [
            'jquery'
        ]
    }
});

