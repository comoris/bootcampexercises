var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var wiredep = require('wiredep').stream;
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('build', ['less', 'bundle']);

gulp.task('bundle', function() {
    gulp.src('./index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', rev()))
        .pipe(gulpif('*.css', rev()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(useref())
        .pipe(revReplace())
        .pipe(gulp.dest('./dist'));
});

gulp.task('wiredep', function() {
    gulp.src('./index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
    gulp.watch(['./styles/*.less'], function() {
        runSequence('less', 'reload');
    });
    gulp.watch(['./*.html'], ['reload']);
});

gulp.task('reload', function() {
    gulp.src('*.*')
        .pipe(connect.reload())
});

gulp.task('less', function() {
    gulp.src('./styles/main.less')
        .pipe(less())
        .pipe(gulp.dest('./styles'));
});

gulp.task('default', ['less', 'watch', 'connect']);
