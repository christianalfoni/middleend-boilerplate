define(function() {
    var config = window._config;
    delete window._config;
    return {
        get: function(configProperty) {
            if (typeof config[configProperty] !== 'undefined') {
                return config[configProperty];
            } else {
                console.log('The setting: ' + configProperty + ', does not exist!');
            }
        }
    }
});