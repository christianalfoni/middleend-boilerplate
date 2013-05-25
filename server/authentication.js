define(['config', 'validate', 'superagent'], function (config, validate, request) {
    'use strict';
    var usersByLogin = {
        'jim': {
            login: 'jim',
            email: 'jim@jimpick.com',
            password: 'jim'
        }
    };
    return {
        configure: function (everyauth) {

            everyauth.password
                // Set what property to use for login
                .loginWith('login')
                // Set the route to login
                .getLoginPath('/login')
                // Set the route to post login details
                .postLoginPath('/login')
                // Set what template to use for the login page
                .loginView('login.hbs')
                // Set variables in the login template
                .loginLocals(function (req, res, done) { // Done argument is used for async
                    setTimeout(function () {
                        done(null, {
                            title: 'Async login'
                        });
                    }, 200);
                })
                // Do the actual authentication
                .authenticate(function (login, password) {

                    if (config.get('debug')) {
                        return usersByLogin[login];
                    } else {
                        // Using the shared validation script
                        if (validate({login: login, password: password}, {login: ['required'], password: ['required']}).isValid) {
                            console.log('Validated the user!!!');
                            var promise,
                                user;

                            promise = this.Promise();
                            // An async method call where you return: promise.fulfill() with an argument of the error array or the user
                            // Recommended to store passwords with a hash in database and use "unhash" deps in this module
                            request.get(config.get('wsUrl') + '/users').query({query: login}).end(function (response) {
                                user = response.body[0];

                                if (!user) return promise.fulfill();
                                usersByLogin[user.login] = user;
                                promise.fulfill(user);
                            });

                            return promise;
                        }
                    }

                })
                .loginSuccessRedirect('/')

                //
                // Registration configuration if needed
                //
                .getRegisterPath('/register')
                .postRegisterPath('/register')
                .registerView('register.hbs')
                .registerLocals(function (req, res, done) {
                    setTimeout(function () {
                        done(null, {
                            title: 'Async Register'
                        });
                    }, 200);
                })
                .extractExtraRegistrationParams(function (req) {
                    return {
                        email: req.body.email
                    };
                })
                .validateRegistration(function (newUserAttrs, errors) {
                    var login = newUserAttrs.login;
                    if (usersByLogin[login]) errors.push('Login already taken');
                    return errors;
                })
                .registerUser(function (newUserAttrs) {
                    var login = newUserAttrs[this.loginKey()];
                    return usersByLogin[login] = newUserAttrs;
                })
                .registerSuccessRedirect('/');

            // Put the user object in the request object for easy access, also accessible in any template with: everyauth.user
            everyauth.everymodule.userPkey('login'); // Sets the property name of the id, needed by findUserById
            everyauth.everymodule.findUserById(function (userId, callback) {
                var user = usersByLogin[userId];
                if (!user) {
                    callback('can not find user');
                } else {
                    callback(null, user);
                }
            });

        }
    }
});