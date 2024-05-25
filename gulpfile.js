import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import svgo from 'gulp-svgmin';
import squoosh from 'gulp-libsquoosh';
import svgstore from 'gulp-svgstore';
// import del from 'del';    ------не работает----

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// const clean = () => {
//   return del('build')  ------не работает----
// };

//html

const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}


//skripts

const skripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
}

//img

const optimizeImg = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
}

const copyImg = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
}

const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/img'));
}

//svg

const svg = () => {
  return gulp.src(['source/img/*.svg', '!source/img/sprite/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));
}

const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
  .pipe(svgo())
  .pipe(svgstore({
    inline: true
  }))
  .pipe(rename(sprite.svg))
  .pipe(gulp.dest('build/img'));
}

//copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*{woff2,woff}',
    'source/*iso',
    'source/*.webmanifest'
  ],{
    base:'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(skripts));
  gulp.watch('source/*.html').on('change', browser.reload);
}


//build

export const build = gulp.series(
  // clean, ------не работает----
  copy,
  optimizeImg,
  gulp.parallel(
    styles,
    html,
    skripts,
    svg,
    // sprite,  ------не работает----
    createWebp
  ),
);

// default

export default gulp.series(
  // clean, ------не работает----
  copy,
  copyImg,
  gulp.parallel(
    styles,
    html,
    skripts,
    svg,
    // sprite, ------не работает----
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
