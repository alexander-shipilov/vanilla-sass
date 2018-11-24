const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const sass = require("gulp-sass");
const argv = require("yargs").argv;

function getSource(sources) {
  return sources.map((src) => src + (fs.statSync(path.resolve(".", src)).isDirectory() ? "/**/*.spec.scss" : ""));
}

gulp.task("sass-test", function() {
  return gulp
      .src(getSource(argv.src ? argv.src.split(",") : ["src/lib"]))
      .pipe(sass().on("error", sass.logError));
});

gulp.task("sass-test:watch", function() {
  gulp.watch("./src/**/*.scss", ["sass-test"]);
});
