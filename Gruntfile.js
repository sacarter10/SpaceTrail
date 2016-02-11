'use strict';

/**
 * Grunt Module
 */
module.exports = function(grunt) {

	grunt.initConfig({
	  // Package
	  pkg: grunt.file.readJSON('package.json'),
	  browserify: {	  	
       dist: {
          options: {
             transform: [
                ["babelify", {
                   presets: "react"
                }]
             ]
          },
          files: {
             "./public/javascripts/spaceTrail.js": ["./jsx/app.jsx"],
          }
       }
    },
	  sass: {
		  dist: {
		    options: {
		      style: 'compressed',
		      compass: true
		    },
		    files: [{
		        expand: true,
        		cwd: 'sass/',
        		src: ['*.scss'],
        		dest: 'public/stylesheets',
        		ext: '.css'
		    }]
		  }
		},
		watch: {
			css: {
				files: 'sass/*.scss',
				tasks: ['sass']
			},
			scripts: {
	      files: ["./jsx/*", "./jsx/*/*"],
	      tasks: ['browserify']
	    }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	
	grunt.registerTask('default', ['sass', 'browserify']);
	grunt.registerTask('caw', ['sass', 'browserify', 'watch']); // compile and watch
};