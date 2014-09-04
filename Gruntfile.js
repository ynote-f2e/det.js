

module.exports = function (grunt) {

    'use strict';

    var manifest = require('./manifest'),
        detFiles = manifest.det,
        detMindMapFiles = manifest["det-mind-map"];

    require('load-grunt-tasks')(grunt);

    console.log(detFiles);

    grunt.initConfig({
        concat : {
            det : {
                src : detFiles,
                dest : 'build/det.js'
            },
            detMindMap : {
                src : detMindMapFiles,
                dest : 'build/det-mind-map.js'
            }
        }
    });

    grunt.registerTask('default', ['concat']);

};