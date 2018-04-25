var gulp = require('gulp'),
	postCss = require('gulp-postcss'),
	autoPrefixer = require('autoprefixer'),
	cssVars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins'),
    perfect = require('perfectionist');

gulp.task('styles', function(){
    return gulp.src('./app/assets/styles/styles.css')
    .pipe(postCss([
        cssImport,
        mixins,
        cssVars,
        nested,
        autoPrefixer,
        perfect
    ]))
    .on('error', function(errorInfo) {
    	console.log(errorInfo.toString());
    	this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});