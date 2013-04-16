module.exports = function(grunt) {
  _ = grunt.util._;

  manifest         = grunt.file.readJSON('manifest.json');
  name             = manifest.name.toLowerCase().replace(/\\s/g,'_');
  icons            = _.map(manifest.icons, function(icon){ return icon });
  js               = _.reduce(manifest.content_scripts, function(js, cs){ return js.concat(cs.js || []) }, []);
  css              = _.reduce(manifest.content_scripts, function(css, cs){ return css.concat(cs.css || []) }, []);
  manifest.matches = _.reduce(manifest.content_scripts, function(matches, cs){ return matches.concat(cs.matches || []) }, []);

  grunt.initConfig({
    manifest: manifest,

    compress: {
      main: {
        options: {
          archive: _.sprintf("dist/%s-%s.zip", name, manifest.version)
        } ,
        files: [ {src: 'manifest.json'}, {src: icons}, {src: js}, {src: css} ]
      }
    },

    concat: {
      main: {
        options: {
          process: true,
          banner: "// ==UserScript==\n" +
                  "// @name        <%= manifest.name %>\n" +
                  "// @namespace   http://jason.karns.name\n" +
                  "// @version     <%= manifest.version %>\n" +
                  "<% _.forEach(manifest.matches, function(match) { %>" +
                  "// @match       <%= match %>\n" +
                  "<% }); %>" +
                  "// ==/UserScript==\n\n"
        },
        src: _.last(js),
        dest: _.sprintf("dist/%s.user.js", name)
      }
    },

    csslint: {
      main: {
        files: [ {src: css} ]
      }
    },

    jshint: {
      main: {
        files: [ {src: js} ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'csslint', 'concat', 'compress']);
};
