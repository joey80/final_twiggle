var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch', function() {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "final_twiggle"
        }
    });

    watch('./index.html', function() {
        browserSync.reload();
    });

    watch('./public/css/**/*.css', function() {
        gulp.start('cssInject');
    });

    watch('./public/js/**/*.js', function() {
       gulp.start('scriptsRefresh'); 
    });
});

gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./public/css/app.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
    browserSync.reload();
});