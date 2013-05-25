define(['validate'], function (validate) {
    'use strict';
    validate.extend('message', {
        comment: ['required'],
        pointOfContact: ['required'],
        startTime: ['required', 'before:endTime'],
        endTime: ['required', 'after:startTime'],
        priority: ['required']
    });
    return validate;
});