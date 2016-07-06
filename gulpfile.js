var path = require('path');
var fs = require('fs');
var fileContent = fs.readFileSync('./package.json');
var jsonObj = JSON.parse(fileContent);

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var del = require('del');
var connect = require('gulp-connect');
var jade = require('gulp-jade');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var paths = {
  build: './build/' + jsonObj.name + '/' + jsonObj.version
}

gulp.task('clean',function(cb){
  del(['build'], cb);
});

var YOUR_LOCALS = {};

gulp.task('jadeCompile',['stylCompile','copyImage','copylib','copyJS','copyFont'],function(){
 	gulp.src('./src/**/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest(paths.build))
});

gulp.task('iconfontStyle',function() {
  gulp.src(['./src/iconfont/*.styl'])
    .pipe(stylus())
    .pipe(gulp.dest(paths.build+"/iconfont/"))
});

gulp.task('copyFont',['iconfontStyle'],function() {
  gulp.src(['./src/iconfont/*.*'])
    .pipe(gulp.dest(paths.build+'/iconfont'))
});

gulp.task('copyImage', function() {
  gulp.src(['./src/**/*.jpg','./src/**/*.png'])
    .pipe(gulp.dest(paths.build))
});

gulp.task('copyJS', function() {
  gulp.src(['./src/js/**/*.js'])
    .pipe(gulp.dest(paths.build+'/js'))
});

gulp.task('copylib', function() {
  gulp.src(['./lib/**/*.*'])
    .pipe(gulp.dest(paths.build+"/lib"))
});

gulp.task('stylCompile', function() {
  gulp.src('./src/css/bundle/*.styl')
    // .pipe(stylus({
    //     compress:true
    // }))
    .pipe(stylus())
    // .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer({ browsers: ['last 5 versions'] })]))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.build+"/css/bundle/"))
});

gulp.task('reload', function () {
  gulp.src('./build/**/*.*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.*'],['jadeCompile']);
  gulp.watch(['./build/**/*.*'], ['reload']);
});

gulp.task("connect",function(){
  connect.server({
    root : "./build",
    host: "localhost",
    port : 8082,
    livereload: false
  });
});

gulp.task('default', ['connect','jadeCompile']);