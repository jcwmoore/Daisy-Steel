'use strict';
process.env.NODE_ENV = 'test'
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var isTravis = process.env.TRAVIS || false;
var config = require('./config');
global.config = config;

/**
* Execute all tests.
*/
gulp.task('run-tests', function () {
    return gulp.src(['**/*.spec.js', '!node_modules/**/*.spec.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('default', ['run-tests']);