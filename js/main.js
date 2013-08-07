require.config({
    paths: {
        jquery: '../components/jquery/jquery'
    },
    shim: {
    }
});

require(['jquery'], function ($) {
    'use strict';
    // use app here
    console.log('Running jQuery %s', $().jquery);
});
