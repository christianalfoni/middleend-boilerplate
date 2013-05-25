define(['backbone', 'timeHelper', 'validation', 'underscore'], function (Backbone, time, validate, _) {
    'use strict';
    var view = Backbone.View.extend({
            el: '#modal',
            events: {
                'click .addTime': 'addTime',
                'click #close': 'close',
                'click #save': 'saveMessage'
            },
            initialize: function () {
                var self = this;
                this.$header = this.$('h3');
                this.$pointOfContactInput = this.$('#pointOfContact').on('change', function () {
                    self.message.set('pointOfContact', $(this).val());
                });
                this.$commentInput = this.$('#comment').on('change', function () {
                    self.message.set('comment', $(this).val());
                });
                this.$priority1 = this.$('#priority1').on('change', function () {
                    self.message.set('priority', 1);
                });
                this.$priority2 = this.$('#priority2').on('change', function () {
                    self.message.set('priority', 2);
                });
                this.$environmentInput = this.$('#environment').on('change', function () {
                    self.message.set('environment', $(this).val());
                });
                this.$caseNumberInput = this.$('#casenumber').on('change', function () {
                    self.message.set('casenumber', $(this).val());
                });
                this.$startTimeInput = this.$('#startTime').datetimepicker({
                    language: 'en',
                    format: 'dd/MM/yyyy hh:mm',
                    pickSeconds: false
                }).on('changeDate', function () {
                        self.message.set('startTime', $(this).data('datetimepicker').getLocalDate().getTime());
                    });
                this.$endTimeInput = this.$('#endTime').datetimepicker({
                    language: 'en',
                    format: 'dd/MM/yyyy hh:mm',
                    pickSeconds: false
                }).on('changeDate', function () {
                        self.message.set('endTime', $(this).data('datetimepicker').getLocalDate().getTime());
                    });

                // Prevent calendar to open on extensiontime
                this.$('.addTime').off('click');
                this.$pointOfContactInput.searcher();
                this.$el.on('shown', function () {
                    self.$pointOfContactInput.get(0).focus();
                });
                this.listenTo(Backbone, 'show:modal', this.showModal);

            },
            showModal: function (message) {

                this.originalMessage = message;
                this.message = message.clone();
                if (this.message.get('messageId')) { // If existing message
                    this.$header.html(this.message.get('poster') + ' - ' + time.format(this.message.get('created')));
                } else {
                    this.$header.html('Create new message');
                }

                this.$pointOfContactInput.val(this.message.get('pointOfContact'));
                this.$commentInput.val(this.message.get('comment'));
                this.togglePriority(this.message.get('priority'));
                this.$startTimeInput.data('datetimepicker').setLocalDate(new Date(this.message.get('startTime')));
                this.$startTimeInput.trigger('changeDate');
                this.$endTimeInput.data('datetimepicker').setLocalDate(new Date(this.message.get('endTime')));
                this.$endTimeInput.trigger('changeDate');
                this.$environmentInput.val(this.message.get('environment'));
                this.$caseNumberInput.val(this.message.get('caseNumber'));

                this.clearErrors();
                this.$el.modal('show');
            },
            clearErrors: function () {
                this.$pointOfContactInput.parents('.control-group').removeClass('error');
                this.$commentInput.parents('.control-group').removeClass('error');
                this.$startTimeInput.parents('.control-group').removeClass('error');
                this.$endTimeInput.parents('.control-group').removeClass('error');
            },
            addTime: function (event) {
                var $button = $(event.target),
                    addedMinutes;
                switch ($button.html()) {
                    case '1h':
                        addedMinutes = 60;
                        break;
                    case '2h':
                        addedMinutes = 60 * 2;
                        break;
                    case '4h':
                        addedMinutes = 60 * 4;
                        break;
                    case '6h':
                        addedMinutes = 60 * 6;
                        break;
                    case '12h':
                        addedMinutes = 60 * 12;
                        break;
                    default:
                        return;

                }
                this.$endTimeInput.data('datetimepicker').setDate(time.addMinutes(this.$startTimeInput.data('datetimepicker').getDate(), addedMinutes));
            },
            close: function (event) {
                event.preventDefault();
                this.$el.modal('hide');
            },
            saveMessage: function (event) {
                event.preventDefault();
                this.clearErrors();
                this.message.set('poster', window.user.displayName);

                if (this.message.isValid()) {
                    this.originalMessage.set(this.message.toJSON());
                    Backbone.trigger('save:message', this.originalMessage);
                    this.$el.modal('hide');
                } else {
                    this.invalidate(this.message.validationError);
                }
            },
            togglePriority: function (priority) {
                this.$priority1.removeAttr('checked');
                this.$priority2.removeAttr('checked');
                if (priority === 1) {
                    this.$priority1.attr('checked', '');
                } else {
                    this.$priority2.attr('checked', '');
                }
            },
            invalidate: function (errors) {
                _.each(errors, function (value, key) {
                    this['$' + key + 'Input'].parents('.control-group').addClass('error');
                }, this);
            }
        })
        ;
    return view;
})
;