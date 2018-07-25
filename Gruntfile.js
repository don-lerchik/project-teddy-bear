module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    clean: {
      build: ["build"]
    },


    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**"
          ],
          dest: "build"
        }]
      }
    },


    less: {
      style: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "build/css/style.css": "less/style.less"
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({
            browsers: [
              "last 1 versions",
              "last 2 Chrome versions",
              "last 2 Firefox versions",
              "last 2 Opera versions",
              "last 2 Edge versions"
            ]
          }),
          require("css-mqpacker")({
            sort: true
          })
        ]
      },
      style: {
        src: "build/css/*.css"
      }

    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "build/index.html": "index.html",
          "build/catalog.html": "catalog.html",
          "build/form.html": "form.html"
        }
      }
    },

    csso: {
      styles: {
        options: {
          report: 'gzip'
        },
        files: {
          "build/css/style.min.css": ["css/style.css"]
        }
      }
    },

    uglify: {
      start: {
        files: {
          'build/js/script.min.js': ['js/script.js']
        }
      }
    },

    imagemin: {
      build: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["img/**/*.{png,jpg,gif}"]
        }]
      }
    },

    cwebp: {
      images: {
        options: {
          q: 90
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg}"]
        }]
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false,
        svg: {
          style: 'display:none',
        },
        cleanup: [
          'fill',
        ],
      },
      default: {
        files: {
          'build/img/sprite.svg': ['build/img/sprite_svg/*.svg'],
        },
      },
    },

    svgmin: {
      default: {
        files: [{
          expand: true,
          src: ["build/img/sprite_svg/*.svg"]
        }]
      }
    },

    watch: {
      html: {
        files: ["*.html"],
        tasks: ["html"]
      },
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss"]
      },
      scripts: {
        files: ["js/*.js"],
        tasks: ["js"],
        options: {
          spawn: false
        },
      },
      svg: {
        files: ["img/sprite_svg/*.svg"],
        tasks: ["svg"],
        options: {
          spawn: false
        },
      },
      img: {
        files: ["img/**/*.{png,jpg,gif}"],
        tasks: ["img"],
        options: {
          spawn: false
        },
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css",
            "build/img/*.svg",
            "build/js/*.js"
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    }
  });


  grunt.registerTask("js", [
    "uglify",
  ]);
  grunt.registerTask("html", [
    "htmlmin",
  ]);

  grunt.registerTask("svg", [
    "svgmin",
    "svgstore"
  ]);

  grunt.registerTask("img", [
    "imagemin",
    "cwebp"
  ]);

  grunt.registerTask("serve", [
    "browserSync",
    "watch"
  ]);

  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "html",
    "csso",
    "js",
    "img",
    "svg"
  ]);

  grunt.registerTask('default', [
    'js',
    'img',
    'svg',
    'browserSync',
    'watch'
  ]);
}