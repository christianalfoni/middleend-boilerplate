define(['jquery', 'backbone', 'app/AppView', 'app/MessageModalView'], function ($, Backbone, AppView, MessageModalView) {
    'use strict';
    return {
        initialize: function () {
            new AppView();
            new MessageModalView();
        }
    }
});