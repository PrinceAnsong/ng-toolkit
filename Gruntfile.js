module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '\n\n'
			},
			js: {
				src: ['src/toolkit.js', 'src/lib/**/*.js'],
				dest: 'build/<%= pkg.name %>.js'
			}
		},
		ngmin: {
			controllers: {
				src: ['build/<%= pkg.name %>.js'],
				dest: 'build/<%= pkg.name %>.ngmin.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'build/<%= pkg.name %>.ngmin.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		watch: {
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['jsprep'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('jsprep', ['concat:js', 'ngmin', 'uglify']);
	grunt.registerTask('default', ['jsprep']);

};