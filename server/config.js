define(['../config.json'], function(config) {
    'use strict';
    var env = process.env.NODE_ENV || 'development',
        config = config[env] || {};

    return {
        get: function(configProperty) {
            if (typeof config[configProperty] !== 'undefined' || (config.client && config.client[configProperty])) {
                return config[configProperty] || config.client[configProperty];
            } else {
                console.log('The setting: ' + configProperty + ', does not exist!');
            }
        },
        is: function (envToCompare) {
            return envToCompare === env;
        }
    }
});