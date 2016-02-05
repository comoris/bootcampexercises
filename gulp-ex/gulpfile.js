var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

var useref = require('gulp-useref');

var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpif = require('gulp-if');

var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

var wiredep = require('wiredep').stream;

var debug = require('gulp-debug');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/styles/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./app/styles/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./app/styles"))
        .pipe(browserSync.stream());
});

// BUNDLE-TASK (build)
gulp.task('bundle', function() {
    gulp.src('./app/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', rev()))
        .pipe(gulpif('*.css', rev()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
        .pipe(useref())
        .pipe(revReplace())
        .pipe(gulp.dest('./dist'));
});

gulp.task('wiredep', function () {
  gulp.src('./app/index.html')
    .pipe(debug({title: 'unicorn:'}))
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./app'));
});

/* ------------------ */
// MAIN TASKS
/* ------------------ */
gulp.task('default', ['serve']);
gulp.task('build', ['sass', 'bundle']);
