var gulp = require('gulp');
var rename = require('gulp-rename');
var awspublish = require('gulp-awspublish');
var awspublishRouter = require('gulp-awspublish-router');

gulp.task('upload', function upload() {
  var publisher = awspublish.create({
    params: {
      Bucket: 'cbley.com'
    }
  });

  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('dist/**')
    .pipe(rename(function (path) {
      path.dirname = 'projects/ivan/' + path.dirname;
    }))
    .pipe(awspublishRouter({
      routes: {
        // set correct Content-Type for GeoJSON files
        '\.geojson$': {
          "headers": {
            "Content-Type": "application/json"
          }
        },
        // pass-through for everything else
        '^.+$': '$&'
      }
    }))
    .pipe(awspublish.gzip({ext: ''}))
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
