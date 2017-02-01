'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var isTravis = process.env.TRAVIS || false;

/**
* Execute all tests.
*/
gulp.task('run-tests', function () {
    process.env.NODE_ENV = 'test';
return gulp.src(['**/*.spec.js', '!node_modules/**/*.spec.js'], { read: false })
.pipe(mocha({ reporter: 'spec' }));
});

gulp.task('default', ['run-tests']);