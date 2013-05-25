/*global module:false*/
module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        copy: {
            main: {
                files: [
                    { // Copies images from your dev folder to the distribution folder
                        src: ['**/*'],
                        dest: 'dist/img/',
                        filter: 'isFile',
                        cwd: 'dev/img/',
                        expand: true,
                        flatten: true
                    }
                ]
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/css/main.css': ['dev/css/*.css']
                }
            },
            minify: {
                expand: true,
                cwd: 'dist/css/',
                src: ['main.css'],
                dest: 'dist/css/'
            }
        },
        requirejs: {
            compile: { // Compiles the requirejs code into one javascript file
                options: {
                    baseUrl: 'dev/js',
                    mainConfigFile: 'dev/js/main.js',
                    out: 'dist/js/main.js',
                    name: 'main'
                }
            }
        },
        mocha: {
            test: { // Runs your application tests
                src: ['tests/index.html'],
                options: {
                    mocha: {
                        ignoreLeaks: false
                    },
                    run: false
                }
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Register tasks
    grunt.registerTask('default', ['copy:devconfig']);
    grunt.registerTask('update', ['copy:devconfig']);
    grunt.registerTask('deploy', ['copy:main', 'requirejs', 'cssmin']);
    grunt.registerTask('test', ['mocha']);

};
