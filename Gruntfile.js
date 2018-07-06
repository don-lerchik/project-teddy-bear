module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.initConfig({
    less: {
      style: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "css/style.css": "less/style.less"
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
          })
        ]
      },
      style: {
        src: "css/*.css"
      }

    },
    uglify: {
      start: {
        files: {
          'js/script.min.js': ['js/script.js']
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
          src: ['img/sprite_svg/*.svg']
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
          'img/sprite.svg': ['img/sprite_svg/*.svg'],
        },
      },
    },

    watch: {
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss"]
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['js'],
        options: {
          spawn: false
        },
      },
      images: {
        files: [
          'img/sprite_svg/*.svg'
        ],
        tasks: ['img'],
        options: {
          spawn: false
        },
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: ["*.html", "css/*.css"]
        },
        options: {
          server: "."
        }
      }
    }

  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask('js', [
    'uglify',
  ]);

  grunt.registerTask('img', [
    'imagemin',
    'svgstore',
  ]);



}