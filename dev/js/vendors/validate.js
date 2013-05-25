/*
 Returns a validator function which can be used like this:

 - validator({ myProp: null}, {myProp: ['required']}); -> Will return object: { isValid: false, errors: { myProp: ['You have to type something'] } }

 - validator.extend('form', { firstName: ['required'], lastName: ['required'] }); -> Extends the validator for reuse

 - validator('form', { firstName: 'Jack', lastName: 'Hippo' }); -> Will return object: { isValid: true, errors: { } }

 - validator.config({
 errorMessages: {
 required: 'Dumbass, you have to type something'
 }
 }); -> Will return this error message when not valid required field

 - validator({ startDate: 1367941845000, endDate: 1367945445000 }, { startDate: ['before:endDate'], endDate: ['before:startDate'] });

 */
(function (window) {
    'use strict';
    var
    // Default errorMessages. Can be changed with validator.config({ errorMessages: { required: 'myText' } })
        missingData = 'You are missing some data',
        errorMessages = {
            required: 'You have to type something!',
            before: 'Date has to be before %',
            after: 'Date has to be after %',
            length: 'Length should be %',
            longerThan: 'Length should be more than %',
            shorterThan: 'Length should be less than %',
            email: 'Not valid email',
            number: '% is not a valid number'
        },
        /*********************
         VALIDATORS
         ==========
         The actual validators. They receive either two arguments (ex. required) where the first value is the value to validate and the second is all the data to be validated.
         Where three arguments are passed (before and after) the first one is the value, the second all the data to be validated and the last is the text after the validator chosen.
         F.ex. 'before:startTime', the last argument is 'startTime'.
         *********************/
            validators = {
            // The value must have content
            required: function (value, data) {
                if (typeof value === 'undefined') {
                    return missingData;
                }
                return value === undefined || value === null || (typeof value === 'string' && value.length === 0) ? errorMessages.required : true;
            },
            number: function (value, data) {
                if (typeof value === 'undefined') {
                    return missingData;
                }
                return typeof value === 'number' ? true : errorMessages.number.replace('%', value.toString());
            },
            // Checks if date is before date on an other property in the dataset
            before: function (date, data, prop) {
                var beforeDate = date,
                    afterDate = data[prop];

                if (typeof afterDate === 'undefined' || typeof beforeDate === 'undefined') {
                    return missingData;
                }

                if (!(date instanceof Date)) {
                    beforeDate = new Date(date);
                }
                if (!(afterDate instanceof Date)) {
                    afterDate = new Date(afterDate);
                }
                return beforeDate < afterDate ? true : errorMessages.before.replace('%', afterDate.toString());
            },
            // Checks if date is after date on an other property in the dataset
            after: function (date, data, prop) {
                var beforeDate = data[prop],
                    afterDate = date;

                if (typeof afterDate === 'undefined' || typeof beforeDate === 'undefined') {
                    return missingData;
                }

                if (!(date instanceof Date)) {
                    afterDate = new Date(date);
                }
                if (!(beforeDate instanceof Date)) {
                    beforeDate = new Date(beforeDate);
                }
                return beforeDate < afterDate ? true : errorMessages.after.replace('%', beforeDate.toString());
            },
            // Value equals length
            length: function (value, data, length) {
                if (typeof value === 'undefined' || typeof length === 'undefined') {
                    return missingData;
                }
                var length = Number(length);
                return value.toString().length === length ? true : errorMessages['length'].replace('%', length.toString());
            },
            // Value longer than length
            longerThan: function (value, data, length) {
                if (typeof value === 'undefined' || typeof length === 'undefined') {
                    return missingData;
                }
                var length = Number(length);
                return value.length > length ? true : errorMessages.longerThan.replace('%', length.toString());
            },
            // Value shorter than length
            shorterThan: function (value, data, length) {
                if (typeof value === 'undefined' || typeof length === 'undefined') {
                    return missingData;
                }
                var length = Number(length);
                return value.length < length ? true : errorMessages.shorterThan.replace('%', length.toString());
            },
            // Valid email
            email: function (value, data) {
                if (typeof value === 'undefined') {
                    return missingData;
                }
                return value.toString().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? true : errorMessages.email;
            }
        },
        extended = {},
        isEmpty = function (object) {
            for (var prop in object) {
                if (object.hasOwnProperty(prop) && object[prop].length > 0) {
                    return false;
                }
            }
            return true;
        },
        validate = function (data, toValidate) {
            var validationResponse = {
                    errors: {}
                },
                result,
                validator,
                validatorParts;

            if (typeof data === 'string') { // Calling an extended validator where toValidate is the data
                return extended[data](toValidate);
            }

            for (var prop in toValidate) {
                if (toValidate.hasOwnProperty(prop)) {

                    validationResponse.errors[prop] = [];
                    // Validating value
                    if (!(toValidate[prop] instanceof Array)) {
                        return console.log('You have to send an array of strings as validators!');
                    }

                    // Going through validators
                    toValidate[prop].forEach(function (value, index) {
                        validator = toValidate[prop][index];
                        validatorParts = validator.split(':'); // Splits to find correct validator
                        if (validatorParts.length > 1) {
                            result = validators[validatorParts[0]].apply(this, [data[prop], data].concat(validatorParts.splice(1, validatorParts.length - 1))); // Passes the rest of split as argument
                        } else {
                            result = validators[validator](data[prop], data);
                        }
                        if (result !== true) {
                            validationResponse.errors[prop].push(result);
                        }
                    });

                    // Remove error array if no errors occured
                    if (validationResponse.errors[prop].length === 0) {
                        delete validationResponse.errors[prop];
                    }

                }

            }

            if (isEmpty(validationResponse.errors)) {
                validationResponse.isValid = true;
            } else {
                validationResponse.isValid = false;
            }

            return validationResponse;
        };

    validate.extend = function (name, toValidate) {
        if (!extended[name]) {
            extended[name] = function (data) {
                return validate(data, toValidate);
            }
        }
    };

    validate.config = function (options) {
        if (options.errorMessages) {
            for (var errorMessage in options.errorMessages) {
                if (options.errorMessages.hasOwnProperty(errorMessage)) {
                    errorMessages[errorMessage] = options.errorMessages[errorMessage];
                }
            }
        }
    };

    validate.backboneModel = function () {

        return function () {
            var model = this.toJSON(),
                validation = validate('message', model);
            if (!validation.isValid) {
                return validation.errors;
            }
        }
    };
    if ( typeof define === "function" && define.amd) {
        define( "validate", [], function () { return validate; } );
    } else {
        window.validate = validate;
    }
}(typeof window === 'undefined' ? {} : window));