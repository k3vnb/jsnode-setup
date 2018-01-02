var gulp = require('gulp');
var utilities = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var buildProduction = utilities.env.production;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');


gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});



gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("build", function() {
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});
gulp.task("clean", function(){
  return del(['build', 'tmp']);
});
