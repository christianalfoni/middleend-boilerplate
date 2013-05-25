define(['backbone', 'timeHelper', 'validation'], function (Backbone, time, validate) {
    'use strict';
    var Message = Backbone.Model.extend({
        idAttribute: 'messageId',
        urlRoot: '/messages',
        defaults: {
            comment: '',
            pointOfContact: '',
            startTime: time.now(),
            endTime: time.addMinutes(new Date(), 30),
            poster: '',
            casenumber: '',
            priority: 2, // Default is 2. Can only be 1 or 2
            environment: '',
            history: false, // If true, shown in the history table
            created: time.now(),
            lastChanged: ''
        },
        validate: validate.backboneModel('message'),
        recentTimeLeft: function () {
            return time.until(this.get('created'), 1);
        },
        idleTimeLeft: function () {
            return time.until(this.get('startTime'));
        },
        activeTimeLeft: function () {
            return time.until(this.get('endTime'));
        }
    });
    return Message;
});