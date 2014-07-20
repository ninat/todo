require.config({
    paths: {
	      text : 'libs/text/text',
	      underscore : 'libs/underscore-amd/underscore',
          backbone : 'libs/backbone-amd/backbone',
          jquery : 'libs/jquery/dist/jquery',
	      localstorage : 'libs/Backbone.localStorage/backbone.localStorage',
          validation : 'libs/backbone-validation/src/backbone-validation',
          bootstrap : 'libs/bootstrap/js/modal'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            exports: 'Backbone'
        },
        localstorage: {
            deps: ['backbone']
        },
        validation: {
            deps: ['backbone']
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});

require(
    ['jquery', 'underscore', 'backbone', 'router', 'bootstrap'],
    function($, _, Backbone, Router){
        'use strict';

        var appRouter;
        appRouter = new Router();
	    Backbone.history.start();
    }
);