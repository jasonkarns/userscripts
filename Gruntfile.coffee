module.exports = (grunt) ->
  _ = grunt.util._

  manifest         = grunt.file.readJSON 'manifest.json'
  name             = manifest.name.toLowerCase().replace(/\\s/g,'_')
  icons            = _(manifest.icons).values()
  js               = _.chain(manifest.content_scripts).pluck('js').flatten().compact().value()
  css              = _.chain(manifest.content_scripts).pluck('css').flatten().compact().value()
  manifest.matches = _.chain(manifest.content_scripts).pluck('matches').flatten().compact().value()

  grunt.initConfig
    manifest: manifest

    compress:
      main:
        options:
          archive: _.sprintf("dist/%s-%s.zip", name, manifest.version)
        files: [ {src: 'manifest.json'}, {src: icons}, {src: js}, {src: css} ]

    concat:
      main:
        options:
          process: true
          banner: """
          // ==UserScript==
          // @name        <%= manifest.name %>
          // @namespace   http://jason.karns.name
          // @version     <%= manifest.version %>
          // @grant       none
          // @description <%= manifest.description %>
          <% manifest.matches.forEach(function(match) {
          %>// @match       <%= match %>
          <% }); %>// ==/UserScript==


          """
        src: _.last(js)
        dest: _.sprintf("dist/%s.user.js", name)

    csslint:
      main:
        files: [ src: css ]

    jshint:
      main:
        files: [ src: js ]


  grunt.loadNpmTasks('grunt-contrib-compress')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-csslint')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-release')

  grunt.registerTask('default', ['jshint', 'csslint', 'concat', 'compress'])
