'use strict';

//Gulp
const { src, dest, watch, series, parallel } = require('gulp');
const rename = require('gulp-rename');

//sass
const sass = require('gulp-sass')(require('node-sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

//BrowserSync
const browserSync = require('browser-sync');

//EJS
const ejs = require('gulp-ejs');
const replace = require('gulp-replace');

//Babel
const babel = require('gulp-babel');

//ImageMin
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');

//folder file Clean
const clean = require('gulp-clean');

const cleanDest = (done) => {
  src('dist/', { allowEmpty: true }).pipe(clean({ read: false }));
  done();
};

const buildImg = (done) => {
  src('src/assets/img/**')
    .pipe(changed('dist/assets/img'))
    .pipe(
      imagemin([
        pngquant({
          quality: [0.6, 0.7],
          speed: 1,
        }),
        mozjpeg({ quality: 65 }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle({ optimizationLevel: 3 }),
      ])
    )
    .pipe(dest('dist/assets/img'));
  done();
};

const buildSass = (done) => {
  src('src/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', sass.logError)
    )
    .pipe(plumber())
    .pipe(
      autoprefixer({
        grid: true,
        cascade: false,
      })
    )
    .pipe(sourcemaps.write('maps'))
    .pipe(dest('dist/assets/css'));
  done();
};

const buildEjs = (done) => {
  src(['src/ejs/**/*.ejs', '!' + 'src/ejs/**/_*.ejs'])
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, '$1'))
    .pipe(dest('dist/'));
  done();
};

const copyFile = (done) => {
  src(['src/assets/js/vendor/*.js'], { base: 'src' }).pipe(dest('dist'));
  done();
};

const buildBabel = (done) => {
  src('src/assets/js/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(dest('dist/assets/js'));
  done();
};

const browserLoad = (done) => {
  browserSync.init({
    files: ['dist/**/*'],
    port: 8000,
    server: {
      baseDir: 'dist/',
    },
  });
  done();
};

const watchFiles = () => {
  watch('src/assets/scss/**/*.scss', series(buildSass));
  watch('src/ejs/**/*.ejs', series(buildEjs));
  watch('src/assets/js/vendor/**/*.js', series(copyFile));
  watch('src/assets/js/**/*.js', series(buildBabel));
  watch('src/assets/img/**', series(buildImg));
};

exports.default = series(cleanDest, parallel(buildSass, buildEjs, copyFile, buildBabel, buildImg), browserLoad, watchFiles);
