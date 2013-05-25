define(['backbone', 'app/MessagesCollection', 'app/MessageView', 'app/router', 'underscore', 'app/MessageModel'], function (Backbone, messagesCollection, MessageView, router, _, MessageModel) {
    'use strict';
    var view = Backbone.View.extend({
        el: '#app',
        events: {
            'click #home': 'gotoHome',
            'click #history': 'gotoHistory',
            'click #createMessage': 'createMessage',
            'keyup #search': 'search'
        },
        initialize: function () {
            this.$tbody = this.$('tbody');
            this.$searchInput = this.$('#search');
            this.listenTo(messagesCollection, 'add', this.addAllMessages);
            this.listenTo(messagesCollection, 'change:priority change:lastChanged', this.sortMessages);
            this.listenTo(messagesCollection, 'reset', this.addAllMessages);
            this.listenTo(messagesCollection, 'filter', this.filterAll);
            this.listenTo(Backbone, 'edit:message', this.editMessage);
            this.listenTo(Backbone, 'save:message', this.saveMessage);
            this.currentViews = [];
            this.oldViews = [];
            this.startFetching();
        },
        gotoHome: function (event) {
            event.preventDefault();
            router.navigate('/', true);
        },
        gotoHistory: function (event) {
            event.preventDefault();
            router.navigate('/history', true);
        },
        createMessage: function (event) {
            event.preventDefault(); // Prevent hyperlink to trigger
            Backbone.trigger('show:modal', new MessageModel());
        },
        editMessage: function (message) {
            Backbone.trigger('show:modal', message);
        },
        saveMessage: function (message) {
            if (message.isNew()) {
                console.log('isnew');
                message.once('sync', function () {
                    messagesCollection.add(message);
                });
            }
            message.save();
        },
        sortMessages: function () {
            messagesCollection.sort();
            this.addAllMessages();
        },
        addMessage: function (message) {
            var view = new MessageView({model: message});
            this.currentViews.push(view);
            this.$tbody.append(view.render().el);
        },
        addAllMessages: function () {
            this.$tbody.empty();
            this.setOldViews();
            messagesCollection.each(this.addMessage, this);
            this.filterAll();
            this.closeOldViews();
        },
        setOldViews: function () {
            var oldViews = this.oldViews = [];
            _.each(this.currentViews, function (view) {
                oldViews.push(view);
            });
        },
        closeOldViews: function () {
            _.each(this.oldViews, function (view) {
                view.close();
            });
        },
        filterOne: function (message) {
            message.trigger('visible');
        },
        filterAll: function () {
            messagesCollection.each(this.filterOne);
        },
        search: function () {
            var value = this.$searchInput.val().toLowerCase();
            if (value.length > 0) {
                messagesCollection.each(function (message) {
                    if (message.get('comment').toLowerCase().indexOf(value) >= 0 ||
                        message.get('poster').toLowerCase().indexOf(value) >= 0 ||
                        message.get('priority').toString().indexOf(value) >= 0) {
                        message.trigger('visible', true);
                    } else {
                        message.trigger('visible', false);
                    }
                });
            } else {
                this.filterAll();
            }
        },
        startFetching: function () {
            messagesCollection.fetch();
            this.fetchInterval = setInterval(function () {
                messagesCollection.fetch({
                    remove: false,
                    data: {
                        lastChanged: messagesCollection.getLastChangedDate()
                    }
                });
            }, 5000);
        },
        stopFetching: function () {
            clearInterval(this.fetchInterval);
        }

    });
    return view;
});