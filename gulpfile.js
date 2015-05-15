var
  gulp = require('gulp'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnext = require('gulp-cssnext'),
  inlineCss = require( 'gulp-inline-css' ),
  rename = require('gulp-rename')
;

gulp.task('clean-dist', function (cb) {
  del([
    'dist/**/*'
  ], cb);
});

gulp.task('css', ['clean-dist'], function () {
  return gulp.src('common.css')
    .pipe(cssnext({ compress: true }))
    .pipe(autoprefixer({ cascade: false, browsers: 'last 2 versions' }))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('inline-css', ['clean-dist', 'css'], function() {
  return gulp.src(['*.html'])
    .pipe(inlineCss())
    .pipe(gulp.dest('dist/'))
  ;
});

gulp.task('default', ['clean-dist', 'css', 'inline-css']);

gulp.task('watch', function() {
  gulp.watch('common.css', ['css']);
});
