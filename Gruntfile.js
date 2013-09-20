module.exports = function (grunt) {
  grunt.initConfig({

    clean: ['build'],

    useminPrepare: {
        html: 'index.html',
        options: {
          dest: 'build'
      }
    },

    usemin: {
      html: ['build/*.html'],
      css: ['css/*.css'],
      options: {
        dirs: ['build']
      }
    },

    copy: {
      main: {
        files: [
          { src: 'images/*', dest: 'build/' },
          { src: '*.html', dest: 'build/' }
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'concat',
    'copy',
    'uglify',
    'cssmin',
    'usemin'
  ]);

};