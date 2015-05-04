var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    nghtml      = require('gulp-angular-templatecache'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    watch       = require('gulp-watch'),
    addsrc      = require('gulp-add-src')
    nodemon     = require('gulp-nodemon'),
    plumber     = require("gulp-plumber")
    tinylr      = require('tiny-lr')(),
    path        = require('path')
;

gulp.origSrc = gulp.src;
gulp.src = function () {
	var origin = arguments.length > 0 ? arguments[0] : "Unknown";
	return gulp
		.origSrc
		.apply(gulp, arguments)
		.pipe(plumber({
			errorHandler: function (err) {
				gutil.beep();
				gutil.log("");
				gutil.log("");
				gutil.log("      - Error (" + origin + "): ", err.message);
				gutil.log("");
				gutil.log("");
				this.emit("end");
			}
		}));
}
function end(msg) {
	return function () {
		gutil.log("      - recompiled (" + msg + ").");
	}
}

var TINYLR_PORT     = 35729,
    SRC_ROOT        = './app/',
    SCSS_GLOB       = SRC_ROOT + '**/*.scss',
    HTML_GLOB       = SRC_ROOT + '**/*.html',
    CSS_GLOB        = SRC_ROOT + '**/*.css',
    JS_GLOB         = SRC_ROOT + '**/*.js',

    DST_ROOT        = './static/',
    DST_JS          = 'app.js',
    DST_CSS         = 'app.css',
    DST_ASSETS      = [DST_ROOT + DST_JS, DST_ROOT + DST_CSS]

    NG_HTML_OPTIONS = {
        "module": "app",
        "base": function (file){
          var name = file.path,
              start = name.lastIndexOf(path.sep) + 1,
              end = name.lastIndexOf('.');
          if(end < 0) end = file.path.length - 1;
          return name.substring(start, end);
        }
    }
;

function compileSass(){
  return gulp.src(SCSS_GLOB)
    .pipe(sass())
    .pipe(concat(DST_CSS))
    .pipe(gulp.dest(DST_ROOT))
    .on('end', end('css'));
}
function compileJs(){
  return gulp
    .src(HTML_GLOB)
    .pipe(nghtml(NG_HTML_OPTIONS))
    .pipe(addsrc(JS_GLOB))
    .pipe(concat(DST_JS))
    .pipe(gulp.dest(DST_ROOT))
    .on('end', end('js'));
}
function reload(event){
  var filename = path.relative(__dirname + SRC_ROOT, event.path);
  tinylr.changed({ body: { files: [filename] } });
}

gulp.task('run', function(){
  tinylr.listen(TINYLR_PORT);
  nodemon({script: 'server.js'});
})

gulp.task('build', function(){
  compileSass();
  compileJs();
});

gulp.task('default', ['build', 'run'], function(){
    watch(SCSS_GLOB, compileSass);
    watch([HTML_GLOB, JS_GLOB], compileJs);
    gulp.watch([HTML_GLOB, CSS_GLOB, JS_GLOB], reload);
})
