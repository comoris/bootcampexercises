var gulp = require('gulp');
var webpack = require('webpack');
var webpack_config = require('./webpack.config');

gulp.task('build', function() {
    // return gulp.src('./app/index.html')
    //            .pipe(webpack())
    //            .pipe(gulp.dest('dist/'));

    webpack_config.env = 'prod';
    webpack(webpack_config, function(err, stats) {
        var result = stats.toString({
            colors: true
        })
        console.log(result);
    });

});

gulp.task('default', ['build']);
