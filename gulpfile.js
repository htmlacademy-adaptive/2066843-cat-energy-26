// import gulp from 'gulp';
// import plumber from 'gulp-plumber';
// import less from 'gulp-less';
// import postcss from 'gulp-postcss';
// import autoprefixer from 'autoprefixer';
// import browser from 'browser-sync';
// import htmlmin from 'gulp-htmlmin';
// import squoosh from 'gulp-libsquoosh';
// import terser from 'gulp-terser';
// import svgo from 'gulp-svgmin';
// import svgstore from 'gulp-svgstore';
// import del from 'del';
// import csso from 'postcss-csso';
// import rename from 'gulp-rename';





// // Styles

// export const styles = () => {
//   return gulp.src('source/less/style.less', { sourcemaps: true })
//     .pipe(plumber())
//     .pipe(less())
//     .pipe(postcss([
//       autoprefixer(),
//       csso()
//     ]))
//     .pipe(rename('style.min.css'))
//     .pipe(gulp.dest('built/css', { sourcemaps: '.' }))
//     .pipe(browser.stream());
// }

// // HTML
// const html = () => {
//   return gulp.src('source/*.html')
//   .pipe(htmlmin({ collapseWhitespace: true }))
//   .pipe(gulp.dest('build'));
// }

// // Server
// const server = (done) => {
//   browser.init({
//     server: {
//       baseDir: 'build'
//     },
//     cors: true,
//     notify: false,
//     ui: false,
//   });
//   done();
// }

// // Scripts
// const scripts = () => {
//   return gulp.src('source/js/*.js')
//   .pipe(terser())
//   .pipe(gulp.dest('build/js'))
// }

// // Images
// const optimizeImages = () => {
//   return gulp.src('source/img/**/*.{jpg,png}')
//   .pipe(squoosh())
//   .pipe(gulp.dest('build/img'))
// }

// const copyImages = () => {
//   return gulp.src('source/img/**/*.{jpg,png}')
//   .pipe(gulp.dest('build/img'))
// }


// //WebP
// const createWebP = () => {
//   return gulp.src('source/img/**/*.{jpg,png}')
//   .pipe(squoosh({
//     webp:{}
//   }))
//   .pipe(gulp.dest('build/img'))
// }

// //SVG

// const svg = () =>
//   gulp.src(['source/img/*.svg', '!source/img/icon/*.svg'])
//   .pipe(svgo())
//   .pipe(gulp.dest('build/img'));


// const sprite = () => {
//   return gulp.src('source/img/icon/*.svg')
//   .pipe(svgo())
//   .pipe(svgstore({
//   inlineSvg: true
//   }))
//   .pipe(rename('sprite.svg'))
//   .pipe(gulp.dest('build/img'));
//   }

// const copy = (done) => {
//   gulp.src([
//     'source/fonts/*.{woff2,woff}'
//   ], {
//   base: 'source'
//   })
//   .pipe(gulp.dest('build'))
//   done()
//  }

//  //Clean

// const clean = () => {
//   return del('build')
//  };


//  //Reload
// const reload = () => {
//   browser.reload();
//   done();
// }



// // Watcher

// const watcher = () => {
//   gulp.watch('source/less/**/*.less', gulp.series(styles));
//   gulp.watch('source/js/script.js', gulp.series(scripts));
//   gulp.watch('source/*.html', gulp.series(html, reload));
// }


//     // default gulp.series(
//     //   html, styles, server, watcher
//     // );

// //Build

// export const build = gulp.series(
//   clean,
//   copy,
//   optimizeImages,
//   gulp.parallel(
//     styles,
//     html,
//     scripts,
//     svg,
//     sprite,
//     createWebP
//   ),
// );


// export default gulp.series(
//   clean,
//   copy,
//   copyImages,
//   gulp.parallel(
//     styles,
//     html,
//     scripts,
//     svg,
//     sprite,
//     createWebP
//   ),
//   gulp.series(
//     server,
//     watcher
//   ));



import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  styles, server, watcher
);
