module.exports = function (grunt) {
  grunt.initConfig({

    uglify: {
      files: {
        src: 'js/*.js',
        dest: 'build/js',
        expand: true,
          flatten: true,
          ext: '.min.js'
      }
    },

    cssmin: {
      build: {
        src: 'css/*.css',
        dest: 'build/css/style.min.css'
      }
    },

    clean: ['build'],

    useminPrepare: {
        html: 'index.html',
        options: {
          dest: 'build'
      }
    },

    usemin: {
      html: ['*.html'],
      css: ['css/*.css'],
      options: {
        dirs: ['build']
      }
    },

    copy: {
      main: {
        files: [
          { src: 'images/*', dest: 'build/images/' },
          { src: '*.html', dest: 'build/' }
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'uglify',
    'cssmin',
    'copy',
    'usemin'
  ]);

};