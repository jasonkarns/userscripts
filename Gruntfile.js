module.exports = function(grunt) {
  _ = grunt.util._;

  manifest = grunt.file.readJSON('manifest.json');
  icons    = _.map(manifest.icons, function(icon){ return icon });
  js       = _.reduce(manifest.content_scripts, function(js, cs){ return js.concat(cs.js || []) }, [])
  css      = _.reduce(manifest.content_scripts, function(css, cs){ return css.concat(cs.css || []) }, [])


  grunt.initConfig({
    manifest: manifest,

    compress: {
      main: {
        options: {
          archive: _.sprintf("%s-%s.zip", manifest.name.toLowerCase().replace(/\\s/g,'_'), manifest.version)
        } ,
        files: [ {src: 'manifest.json'}, {src: icons}, {src: js}, {src: css} ]
      }
    },

    jshint: {
      main: {
        files: [ {src: js} ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('package', "Build the Chrome Web Store package archive.", ['compress']);
  grunt.registerTask('default', ['package']);
};
