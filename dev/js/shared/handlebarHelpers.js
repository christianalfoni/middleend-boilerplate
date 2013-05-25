// Depending on Node dep or client dep, use different versions of handlebars
var dep = (function () {
    try {
        if (process) {
            return 'express-hbs';
        }
    } catch (e) {
        return 'Handlebars';
    }

}());
define([dep, 'timeHelper'], function (Handlebars, time) {
    'use strict';
    Handlebars.registerHelper('formatEpoch', function (epoch) {
        return new Handlebars.SafeString(time.format(epoch));
    });

    return;
});