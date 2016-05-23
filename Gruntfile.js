'use strict';


module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
   require('time-grunt')(grunt);
   // Automatically load required Grunt tasks
   require('jit-grunt')(grunt, {
     useminPrepare: 'grunt-usemin'
   });

   // Define the configuration for all the tasks
   grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

     // Make sure code styles are up to par and there are no obvious mistakes
     jshint: {
       options: {
         jshintrc: '.jshintrc',
         reporter: require('jshint-stylish')
       },
       all: {
         src: [
           'Gruntfile.js',
           'app.js',
           'app/scripts/*.js',
           'server/**/*.js'
         ]
       }
    },
    useminPrepare: {
        html: 'app/index.html',
        options: {
            dest: 'dist'
        }
    },
    // Concat
    concat: {
        options: {
            separator: ';'
        },
        // dist configuration is provided by useminPrepare
        dist: {
        }
    },
      // Uglify
    uglify: {
        // dist configuration is provided by useminPrepare
        dist: {}
    },
    cssmin: {
        minify: {
            expand: true,
            cwd: 'dist/css',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/css',
            ext: '.min.css'
        },
        target: {
            files: {
                'dist/css/news.min.css': ['app/css/ct-paper.css', 'app/css/demo.css', 'app/css/examples.css', 'app/css/news.css']
            }
        },
        dist: {}
    },
      // Usemin
      // Replaces all assets with their revved version in html and css files.
      // options.assetDirs contains the directories for finding the assets
      // according to their relative paths
    usemin: {
        html: [
            'dist/*.html'
        ],
        css: [
            'dist/css/*.css',
            'dist/bootstrap3/css/*.css'
        ],
        options: {
            assetsDirs: ['dist', 'dist/css', 'dist/js']
        }
    },
    copy: {
      dist: {
        cwd: 'app',
        src: [
            '**',
            '!img/favicon/**',
            '!css/ct-paper.css',
            '!css/demo.css',
            '!css/examples.css',
            '!css/news.css',
            '!**/config.codekit',
            '!**/.DS_Store'
        ],
        dest: 'dist',
        expand: true
      },
      fonts: {
          files:[
              {
                  //for bootstrap fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }, {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }, {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/themify-icons',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }
          ]
        }
    },
	watch: {
        copy: {
            files: [ 'app/**', '!app/**/*.css', '!app/**/*.js'],
            tasks: [ 'build' ]
        },
        scripts: {
            files: ['app/scripts/app.js', 'app/scripts/controllers.js', 'app/scripts/services.js'],
            tasks:[ 'build']
        },
        styles: {
            files: ['app/css/news.css'],
            tasks:['build']
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                'app/{,*/}*.html',
                'app/{,*/}*.js',
                '.tmp/styles/{,*/}*.css',
                'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      dist: {
        options: {
          open: true,
          base:{
               path: 'dist',
            options: {
                index: 'index.html',
                maxAge: 300000
            }
          }
        }
      }
    },
    clean: {
        build:{
            src: [ 'dist/']
        }
    }
   });

    grunt.registerTask('build', [
        'clean',
        'jshint',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin'
    ]);

    grunt.registerTask('verify', [
        'jshint'
    ]);

	grunt.registerTask('serve',['build','connect:dist','watch']);

	grunt.registerTask('default',['build']);

};
