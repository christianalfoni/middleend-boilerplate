define(['backbone', 'hbs!templates/message'], function (Backbone, messageTemplate) {
    var view = Backbone.View.extend({
        tagName: 'tr',
        template: messageTemplate,
        events: {
            'click a': 'toggleHistory',
            'click td': 'editMessage'
        },
        initialize: function () {
            this.listenTo(this.model, 'visible', this.toggleVisible);
            this.listenTo(this.model, 'change:history', this.toggleVisible);
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.setTimers();

            return this;
        },
        setTimers: function () {
            var recentTimeLeft = this.model.recentTimeLeft(),
                activeTimeLeft = this.model.activeTimeLeft(),
                idleTimeLeft = this.model.idleTimeLeft(),
                viewElement = this.$el,
                maxTime = 604800000; // See ahead one week (max limit to milliseconds on timeout)

            if (recentTimeLeft < maxTime && recentTimeLeft > 0) {
                viewElement.addClass('success');
                this.recentTimer = setTimeout(function () {
                    viewElement.removeClass('success');
                }, recentTimeLeft);

            }
            if (activeTimeLeft < maxTime && activeTimeLeft > 0 && idleTimeLeft < 0) {
                viewElement.addClass('active');
                this.activeTimer = setTimeout(function () {
                    viewElement.removeClass('active');
                }, activeTimeLeft);
            }

            if (idleTimeLeft < maxTime && idleTimeLeft > 0) {
                this.idleTimer = setTimeout(function () {
                    viewElement.addClass('active');
                }, idleTimeLeft);
            }


        },
        toggleHistory: function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.model.set('history', !this.model.get('history'));
            this.model.save();
            this.render();
            this.toggleVisible();
        },
        toggleVisible: function (isVisible) {
            this.$el.toggleClass('hidden', typeof isVisible === 'undefined' ? this.isHidden() : !isVisible);
        },
        isHidden: function () {
            var isHistory = this.model.get('history');
            return ((!isHistory && Backbone.history.fragment.indexOf('history') >= 0) || (isHistory && Backbone.history.fragment.indexOf('history') === -1))
        },
        editMessage: function () {
            Backbone.trigger('edit:message', this.model);
        },
        close: function () {
            this.stopListening();
            this.$el.remove();
            clearTimeout(this.recentTimer);
            clearTimeout(this.activeTimer);
            clearTimeout(this.idleTimer);
        }
    });
    return view;
})
;