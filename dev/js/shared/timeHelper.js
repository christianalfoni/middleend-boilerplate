define(function () {
    'use strict';
    var verifyDateObject = function (date) {
            return date instanceof Date ? date : new Date(date);
        },
        prependZero = function (number) {
            return ('0' + number).slice(-2);
        }

    return {
        now: function () {
            return new Date();
        },
        format: function (epoch) {
            var date = new Date(Number(epoch));
            return prependZero(date.getDate()) + '/' + prependZero(date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + prependZero(date.getHours()) + ':' + prependZero(date.getMinutes());

        },
        addMinutes: function (date, minutes) {
            date = verifyDateObject(date);
            return new Date(date.setMinutes(date.getMinutes() + minutes));
        },
        until: function (date, minutes) {
            var now = new Date();
            if (!minutes) {
                return verifyDateObject(date).getTime() - now.getTime();
            } else {
                return verifyDateObject(date).getTime() - new Date(now.setMinutes(now.getMinutes() - minutes)).getTime();
            }
        },
        isNow: function (startDate, endDate) {
            var now = this.now();
            startDate = verifyDateObject(startDate);
            endDate = verifyDateObject(endDate);
            if (startDate <= now && endDate >= now) {
                return true;
            } else {
                return false;
            }

        }
    }
});