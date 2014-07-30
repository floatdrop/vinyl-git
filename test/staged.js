/* global describe, it, beforeEach, afterEach */

var path = require('path');
var fs = require('fs');
var repoPath = path.join(__dirname, '/repo');
var utils = require('./utils.js');
var vinylGit = require('..');
require('should');

describe('staged', function () {
    var repo;
    var cwd = process.cwd();
    beforeEach(function (done) {
        utils.freshGit(repoPath, function (err, _repo) {
            if (err) { return done(err); }
            process.chdir(repoPath);
            repo = _repo;
            done();
        });
    });

    afterEach(function () {
        process.cwd(cwd);
    });

    it('should emit end without staged files', function (done) {
        vinylGit.staged()
            .on('error', done)
            .on('end', function () {
                done();
            })
            .on('data', done);
    });

    it('should emit staged files', function (done) {
        fs.openSync(path.join(repoPath, 'first.file'), 'w');
        fs.openSync(path.join(repoPath, 'second.file'), 'w');
        repo.add('first.file', function (err) {
            if (err) { return done(err); }
            repo.add('second.file', function (err) {
                if (err) { return done(err); }
                var files = [];
                vinylGit.staged()
                    .on('error', done)
                    .on('end', function () {
                        files.should.have.length(2);
                        done();
                    })
                    .on('data', function (file) {
                        files.push(file.relative);
                    });
            });
        });
    });
});
