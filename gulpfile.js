
// Including gulp
var gulp = require('gulp');

// Including plugins
var watch = require('gulp-watch');
var typescript = require('gulp-typescript');
var merge = require('merge2');
var del = require('del');
var liveReload = require('gulp-livereload');
var tsd = require('gulp-tsd');

// Creating typescript project.
// This can have multiple props. Check out gulp-typescript.
var tsProject = typescript.createProject({
  target: 'ES6'
});

// Typescript
gulp.task('tsd', function(cb) {
  tsd({
    config: 'source/tsd.json',
    command: 'reinstall'
  }, cb);
});

gulp.task('typescript', ['clean-typescript', 'tsd'], function() {
  var tsResults = gulp.src('source/**/*.ts')
    .pipe(typescript(tsProject));

  return merge([
    tsResults.dts.pipe(gulp.dest('build/definitions')),
    tsResults.js.pipe(gulp.dest('build/js'))
  ]).pipe(liveReload());
});

//Watch tasks
gulp.task('watch-typescript', ['typescript'], function() {
  watch('source/**/*.ts', function() {
    gulp.start('typescript');
  });
});

var moveIndex = function() {
  return gulp.src('source/index.html')
    .pipe(gulp.dest('build/'))
    .pipe(liveReload());
};

var moveCss = function() {
  return gulp.src(['source/css/**'])
    .pipe(gulp.dest('build/assets/'))
    .pipe(liveReload());
};

gulp.task('watch-css', function() {
  watch('source/css/**', function() {
    moveCss();
  })
});

gulp.task('watch-html', function() {
  watch('source/index.html', function() {
    moveIndex();
  })
});

gulp.task('watch', ['watch-typescript', 'watch-html', 'watch-css'], function(){
  liveReload.listen();
});


// Cleaning tasks
gulp.task('clean-typescript', function() {
  del.sync(['build/js/**/*.js']);
});

gulp.task('clean', ['clean-typescript']);

// Building tasks
gulp.task('build', function() {
  moveCss();
  moveIndex();
  gulp.src([
      'node_modules/angular/angular.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-aria/angular-aria.js',
      'node_modules/angular-material/angular-material.js',
      'node_modules/angular-material/angular-material.css'
    ])
    .pipe(gulp.dest('build/resources'));
});

gulp.task('default', ['clean', 'build', 'watch']);