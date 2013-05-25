define(['app/app'], function(app) {
   'use strict';
    describe('This is my application test', function() {

        it('should return an object', function() {

            app.should.be.instanceof(Object);

        });

    });
});