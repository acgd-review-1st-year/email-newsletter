var
  gulp = require('gulp'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnext = require('gulp-cssnext'),
  premailer = require('gulp-premailer'),
  rename = require('gulp-rename')
;

gulp.task('clean-dist', function (cb) {
  del([
    '_dist/**/*'
  ], cb);
});

gulp.task('jekyll-build', function (cb) {
  require('child_process')
    .spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', cb)
  ;
});

gulp.task('css', function () {
  return gulp.src('common.css')
    .pipe(cssnext({ compress: true }))
    .pipe(autoprefixer({ cascade: false, browsers: 'last 2 versions' }))
    .pipe(gulp.dest('_tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('inline-css', ['clean-dist', 'jekyll-build', 'css'], function() {
  return gulp.src(['_site/*.html'])
    .pipe(premailer())
    .pipe(gulp.dest('_dist/'))
  ;
});

gulp.task('default', ['clean-dist', 'jekyll-build', 'css', 'inline-css']);

gulp.task('watch', function() {
  gulp.watch('common.css', ['css']);
});
