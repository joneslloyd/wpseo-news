/* global require, process */
const path = require( "path" );
const loadGruntConfig = require( "load-grunt-config" );
const timeGrunt = require( "time-grunt" );
const { flattenVersionForFile } = require( "./grunt/modules/version.js" );

module.exports = function( grunt ) {
	timeGrunt( grunt );

	const pkg = grunt.file.readJSON( "package.json" );
	const pluginVersion = pkg.yoast.pluginVersion;

	// Define project configuration.
	const project = {
		developmentBuild: false,
		pluginVersion,
		pluginVersionSlug: flattenVersionForFile( pluginVersion ),
		pluginSlug: "wpseo-news",
		pluginMainFile: "wpseo-news.php",
		pluginVersionConstant: "WPSEO_NEWS_VERSION",
		paths: {
			/**
			 * Gets the config path.
			 *
			 * @returns {string} Config path.
			 */
			get config() {
				return this.grunt + "config/";
			},
			grunt: "grunt/",
			js: "assets/",
			languages: "languages/",
			logs: "logs/",
			vendor: "vendor/",
		},
		files: {
			js: [
				"assets/**/*.js",
				"!assets/**/*.min.js",
			],
			php: [
				"*.php",
				"classes/**/*.php",
			],
			phptests: "tests/**/*.php",
			/**
			 * Gets the config path glob.
			 *
			 * @returns {string} Config path glob.
			 */
			get config() {
				return project.paths.config + "*.js";
			},
			/**
			 * Gets the changelog path file.
			 *
			 * @returns {string} Changelog path file.
			 */
			get changelog() {
				return project.paths.theme + "changelog.txt";
			},
			grunt: "Gruntfile.js",
		},
		pkg: grunt.file.readJSON( "package.json" ),
	};

	/* eslint-disable camelcase */
	// Load Grunt configurations and tasks.
	loadGruntConfig( grunt, {
		configPath: path.join( process.cwd(), "node_modules/@yoast/grunt-plugin-tasks/config/" ),
		overridePath: path.join( process.cwd(), project.paths.config ),
		data: project,
		jitGrunt: {
			staticMappings: {
				addtextdomain: "grunt-wp-i18n",
				makepot: "grunt-wp-i18n",
				glotpress_download: "grunt-glotpress",
				"update-version": "./node_modules/@yoast/grunt-plugin-tasks/tasks/update-version.js",
				"set-version": "./node_modules/@yoast/grunt-plugin-tasks/tasks/set-version.js",
			},
		},
	} );
	/* eslint-enable camelcase */
};
