define(['config', 'validation', 'express-hbs', 'superagent', 'server/fakeResponses/messages', 'underscore', 'server/fakeResponses/users'], function (config, validate, hbs, request, fakeMessages, _, fakeUsers) {

    'use strict';
    var cache = function (res, period) {

            var milliseconds;
            switch (period) {
                case '1h':
                    milliseconds = 3600000;
                    break;
                case '1d':
                    milliseconds = 3600000 * 24;
                    break;
                case '1y':
                    milliseconds = 3600000 * 24 * 365;
                    break;
                default:
                    return console.log('Could not set cache period of ' + period);
            }
            return res.setHeader('Cache-Control', 'public, max-age=' + milliseconds);
        },
        isAjax = function (req) {
            return req.headers['x-requested-with'] === 'XMLHttpRequest'; // jQuery ajax request
        },
        bootstrap = function (data) {
            return new hbs.SafeString(JSON.stringify(data));
        };


    return {
        index: function (req, res) {
            var messages;

            if (config.is('development')) {
                messages = fakeMessages;
                res.render('index', {
                    messages: _.sortBy(_.filter(messages, function (message) {
                        return !message.history
                    }), function (message) {
                        return [message.priority, message.startTime]
                    }),
                    bootstrap: bootstrap({
                        messages: messages,
                        user: req.user
                    })
                });
            } else {
                request.get(config.get('wsUrl') + '/messages', function (response) {
                    messages = response.body;
                    res.render('index', {
                        messages: _.sortBy(_.filter(messages, function (message) {
                            return !message.history
                        }), function (message) {
                            return [message.priority, message.startTime]
                        }),
                        bootstrap: bootstrap({
                            messages: messages,
                            user: req.user
                        })
                    });
                });
            }

        },
        getMessages: function (req, res) {
            var messages;
            if (config.is('development')) {
                res.send([]); // Do not update messages
            } else {
                request.get(config.get('wsUrl') + '/messages', function (response) {
                    messages = response.body;
                    res.send(messages);
                });
            }

        },
        getHistory: function (req, res) {

            var messages;
            if (config.is('development')) {
                messages = fakeMessages;
                res.render('index', {
                    messages: _.filter(messages, function (message) {
                        return message.history
                    }),
                    history: true,
                    bootstrap: bootstrap({
                        messages: messages
                    })
                });
            } else {
                request.get(config.get('wsUrl') + '/messages', function (response) {
                    messages = response.body;
                    res.render('index', {
                        messages: _.filter(messages, function (message) {
                            return message.history
                        }),
                        history: true,
                        bootstrap: bootstrap({
                            messages: messages
                        })
                    });
                });
            }

        },
        createMessage: function (req, res) {

            var validation = validate('message', req.body);
            if (!validation.isValid) {
                return res.send(400, validation.errors);
            }

            if (config.is('development')) {
                req.body.messageId = new Date().getTime();
                res.send(req.body);
            } else {
                request.post(config.get('wsUrl') + '/messages').send(req.body).end(function (response) {
                    res.send(response.body);
                });
            }

        },
        updateMessage: function (req, res) {

            var validation = validate('message', req.body);
            if (!validation.isValid) {
                return res.send(400, validation.errors);
            }
            if (config.is('development')) {
                console.log('Updated message width id ' + req.params.id);
                res.send();
            } else {
                console.log('Updating to ' + config.get('wsUrl') + '/messages/' + req.params.id);
                request.put(config.get('wsUrl') + '/messages/' + req.params.id).send(req.body).end(function (response) {
                    res.send(response.body);
                });
            }

        },
        getUsers: function (req, res) {
            var users;
            if (config.is('development')) {
                res.send(fakeUsers(req.query.query)[0]);
            } else {
                cache(res, '1h');
                request.get(config.get('wsUrl') + '/users').query({query: req.query.query}).end(function (response) {
                    users = response.body;
                    res.send(users.length > 0 ? users[0] : null);
                });

            }
        }
    }

});