define(['backbone', 'app/MessageModel', 'underscore'], function (Backbone, MessageModel, _) {
    'use strict';
    var Messages = Backbone.Collection.extend({
        model: MessageModel,
        url: '/messages',
        prefetchKey: 'messages',
        comparator: function (message) {
            return [message.get('priority'), -message.get('startTime')];
        },
        getLastChangedDate: function () {
            var lastChangedMessage;
            lastChangedMessage = this.sortBy(function (message) {
                return message.get('lastChanged');
            })[0];
            if (lastChangedMessage) {
                return lastChangedMessage.get('lastChanged');
            } else {
                return 0;
            }
        },
        updateActiveAndNew: function () {

        }
    });
    return new Messages();
});