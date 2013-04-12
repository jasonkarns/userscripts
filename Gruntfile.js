module.exports = function(grunt) {
  _ = require("underscore");

  manifest = grunt.file.readJSON('manifest.json');
  icons    = _.map(manifest.icons, function(icon){ return icon });
  js       = _.reduce(manifest.content_scripts, function(js, cs){ return js.concat(cs.js || []) }, [])
  css      = _.reduce(manifest.content_scripts, function(css, cs){ return css.concat(cs.css || []) }, [])


  grunt.initConfig({
    manifest: manifest,

    compress: {
      extension: {
        options: {
          archive: "<%= manifest.name.toLowerCase().replace(/\\s/g,'_') %>-<%= manifest.version %>.zip"
        } ,
        files: [ {src: 'manifest.json'}, {src: icons}, {src: js}, {src: css} ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('package', "Build the Chrome Web Store package archive.", ['compress']);
  grunt.registerTask('default', ['package']);
};
