define(['backbone', 'app/MessagesCollection'], function (Backbone, messagesCollection) {
    'use strict';
    var Router = Backbone.Router.extend({

        routes: {
            '*filter': 'setFilter'
        },
        setFilter: function () {
            messagesCollection.trigger('filter');
        }

    });
    return new Router();
});