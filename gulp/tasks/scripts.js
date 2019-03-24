var gulp = require('gulp'),
	webpack = require('gulp-webpack'),
	babel = require('gulp-babel');

gulp.task('babel', function() {
	return gulp.src('./public/js/app.js')
		.pipe(babel({
            presets: ['env']
        }))
		.pipe(gulp.dest('./public/js/dist'));
});

gulp.task('webpack', ['babel'], function() {
	return gulp.src('./public/js/dist/app.js')
		.pipe(webpack())
		.pipe(gulp.dest('./public/js/dist'));
});

gulp.task('scripts', ['babel']);
