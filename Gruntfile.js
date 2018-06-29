module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.initConfig ({
    less: {
      style: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "css/style.css":"less/style.less"
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: [
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
    watch: {
      style: {
        files: ["less/**/*.less"],
        task: ["less","postcss"]
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: ["*.html","css/*.css"]
        },
        options: {
          server: "."
        }
      }
    }
  })
  grunt.registerTask("serve", ["browserSync", "watch"]);
}