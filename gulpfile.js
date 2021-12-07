let project_folder = "dist";
let source_folder = "src";







let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		img: project_folder + "/images/",
		fonts: project_folder + "/fonts/",
	},
	src: {
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		css: source_folder + "/scss/**/*.scss",
		js: source_folder + "/js/script.js",
		img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp} ",
		fonts: source_folder + "/fonts/*.*",


	},
	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/scss/**/*.scss",
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp} ",

	},
	clean: "./" + project_folder + '/'
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	scss = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	group_media = require('gulp-group-css-media-queries'),
	clean_css = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify-es').default,
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp'),
	webphtml = require('gulp-webp-html'),
	webpcss = require('gulp-webp-css'),
	svgSprite = require('gulp-svg-sprite'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter');


function browserSync() {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	})

}
function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

// function libsJs() {
// 	return src([
// 		'node_modules/jquery/dist/jquery.min.js',
// 		'node_modules/slick-carousel/slick/slick.min.js'
// 	])

// 		.pipe(dest(path.build.js))

// }
function libsCss() {
	return src([
		'node_modules/reset-css/reset.css'

	])
		.pipe(clean_css())
		.pipe(rename({
			extname: ".min.css"
		})
		)
		.pipe(dest(path.build.css))

}


function css() {
	return src(path.src.css)
		.pipe(fileinclude())
		.pipe(scss({
			outputStyle: "expanded"
		})
		)
		.pipe(group_media())
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 5 versions"],
			cascade: true
		})
		)
		.pipe(webpcss())
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(rename({
			extname: ".min.css"
		})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}
function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(rename({
			extname: ".min.js"
		})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		.pipe(webp({
			quality: 70

		}))

		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(imagemin({
			progresive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 3
		})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}
gulp.task('svgSprite', function () {
	return gulp.src([source_folder + '/iconsptite/*.svg'])
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "..icons/icons.svg",
					//example:true
				}
			},
		}
		))
		.pipe(dest(path.build.img))
})



function fonts() {
	src(path.src.fonts)
		// 	.pipe(ttf2woff())
		// 	.pipe(dest(path.build.fonts))
		// return src(path.src.fonts)
		// 	.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))

}

gulp.task('otfttf2', function () {
	return gulp.src([source_folder + '/fonts/*.otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(source_folder + '/fonts/'))

})






function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);

}
function clean() {
	return del(path.clean);

}




let build = gulp.series(clean, gulp.parallel(js, html, libsCss, css, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.libsCss = libsCss;
// exports.libsJs = libsJs;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;