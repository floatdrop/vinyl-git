var git = require('gift');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var pj = require('path').join;

module.exports = {
    freshGit: function (path, done) {
        rimraf(path, function (err) {
            if (err) { return done(err); }
            mkdirp(path, function (err) {
                if (err) { return done(err); }
                git.init(path, done);
            });
        });
    }
};
