/*
 Adds jQuery and Handlebars. Other libraries like Backbone can be added here
 */
require.config({

    baseUrl: '/js',
    shim: {
        'bootstrap': ['jquery'],
        'datetimepicker': ['bootstrap'],
        'search.plugin': ['jquery']
    },
    hbs: {
        disableI18n: true,
        disableHelpers: true
    },
    paths: {
        // Templates - only using partials
        'templates': '../templates/partials',
        // Vendors
        'backbone': 'vendors/backbone',
        'bootstrap': 'vendors/bootstrap',
        'datetimepicker': 'vendors/bootstrap-datetimepicker',
        'Handlebars': 'vendors/Handlebars',
        'hbs': 'vendors/hbs',
        'jquery': 'vendors/jquery',
        'search.plugin': 'vendors/search.plugin',
        'underscore': 'vendors/underscore',
        'validate': 'vendors/validate',
        // Shared modules
        'handlebarHelpers': 'shared/handlebarHelpers',
        'timeHelper': 'shared/timeHelper',
        'validation': 'shared/validation'
    }
});

/*
 Starts the project
 */
require(['app/app', 'underscore', 'backbone', 'jquery', 'bootstrap', 'datetimepicker', 'handlebarHelpers', 'search.plugin'], function (app, _, Backbone, $) {

    'use strict'; // Strict is used to ensure support for the EC5 javascript standard

    // Set the global user object
    window.user = window._bootstrap.user;

    // Intercept the collection fetcher in Backbone to look for any preloaded models
    var collectionFetcher = Backbone.Collection.prototype.fetch;
    Backbone.Collection.prototype.fetch = function (callbacks) {
        if (window._bootstrap[this.prefetchKey]) {
            this.add(window._bootstrap[this.prefetchKey], {silent: true});
            delete window._bootstrap[this.prefetchKey];
            this.trigger('reset');
            var self = this;
            _.each(callbacks, function (callback) {
                if (callback instanceof Function) {
                    callback.call(self);
                }
            });
            return;
        }
        collectionFetcher.apply(this, arguments);
    };

    // Intercept the model fetcher in Backbone to look for any preloaded model
    var modelFetcher = Backbone.Model.prototype.fetch;
    Backbone.Model.prototype.fetch = function (callbacks) {
        if (window._bootstrap[this.prefetchKey] && window._bootstrap[this.prefetchKey][this.get('id')]) {
            this.add(window._bootstrap[this.prefetchKey][this.get('id')], {silent: true});
            delete window._bootstrap[this.prefetchKey][this.get('id')];
            this.trigger('reset');
            var self = this;
            _.each(callbacks, function (callback) {
                if (callback instanceof Function) {
                    callback.call(self);
                }
            });
            return;
        }
        modelFetcher.apply(this, arguments);
    };

    Backbone.history.start({
        pushState: true
    });
    app.initialize();

});