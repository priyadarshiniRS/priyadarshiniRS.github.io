var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

// Load all gulp plugins into the plugins object.
var plugins = require('gulp-load-plugins')();

var src = {
html: 'app/**/*.html',
images:'app/**/*.png',
libs: ['./node_modules/angular-moment/angular-moment.js','./node_modules/moment/moment.js','./node_modules/angular-ui-router/release/angular-ui-router.min.js','./node_modules/bootstrap-star-rating/js/star-rating.js','./node_modules/bootstrap-star-rating/css/star-rating.css','./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js','./node_modules/bootstrap-star-rating/js/star-rating.js','./node_modules/materialize-css/dist/css/materialize.min.css','./node_modules/materialize-css/dist/js/materialize.min.js','./node_modules/slick-carousel/slick/slick-theme.css','./node_modules/slick-carousel/slick/slick.css','./node_modules/angular-slick-carousel/dist/angular-slick.min.js','./node_modules/slick-carousel/slick/slick.js','./node_modules/jquery/dist/jquery.min.js','./node_modules/angular/angular.min.js','./node_modules/angular-route/angular-route.min.js','./node_modules/ngstorage/ngStorage.min.js','./node_modules/bootstrap/dist/js/bootstrap.min.js','./node_modules/bootstrap/dist/css/bootstrap.min.css'],
css: 'app/**/*.css',
scripts: {
all: 'app/**/*.js',
app: 'app/app.js'
}
};

var build = 'build/';
var out = {
libs: build + 'libs/',
scripts: {
file: 'app.min.js',
folder: build
}
}
gulp.task('images', function() {
return gulp.src(src.images)
.pipe(gulp.dest(build))
.pipe(plugins.connect.reload());
});

gulp.task('html', function() {
return gulp.src(src.html)
.pipe(gulp.dest(build))
.pipe(plugins.connect.reload());
});

gulp.task('css', function() {
return gulp.src(src.css)
.pipe(gulp.dest(build))
.pipe(plugins.connect.reload());
});

/* The jshint task runs jshint with ES6 support. */
gulp.task('jshint', function() {
return gulp.src(src.scripts.all)
.pipe(plugins.jshint({
esnext: true // Enable ES6 support
}))
.pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('libs', function() {
/* In a real project you of course would use npm or bower to manage libraries. */
return gulp.src(src.libs)
.pipe(gulp.dest(out.libs))
.pipe(plugins.connect.reload());
});

/* Compile all script files into one output minified JS file. */
gulp.task('scripts', ['jshint'], function() {

var sources = browserify({
entries: src.scripts.app
})
.transform(babelify.configure({
// You can configure babel here!
// https://babeljs.io/docs/usage/options/
presets: ["es2015"]
}));

return sources.bundle()
.pipe(vinylSourceStream(out.scripts.file))
.pipe(vinylBuffer())

.pipe(plugins.ngAnnotate())
//.pipe(plugins.uglify())

.pipe(gulp.dest(out.scripts.folder))
.pipe(plugins.connect.reload());
});

gulp.task('serve',['build','watch'], function() {
plugins.connect.server({
root: build,
port: 8080,
livereload: true,
fallback: build + 'index.html'
});
});

gulp.task('watch', function() {
gulp.watch(src.libs, ['libs']);
gulp.watch(src.html, ['html']);
gulp.watch(src.css, ['css']);
gulp.watch(src.scripts.all, ['scripts']);
})

gulp.task('build', ['scripts', 'html', 'libs' , 'css','images']);
gulp.task('default', ['serve']);
