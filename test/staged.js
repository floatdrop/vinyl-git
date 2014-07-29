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

    it('should emit staged files', function (done) {
        fs.openSync(path.join(repoPath, 'test.file'), 'w');
        repo.add('test.file', function (err) {
            if (err) { done(err); }
            vinylGit.staged()
                .on('error', done)
                .on('data', function (file) {
                    file.relative.should.eql('test.file');
                    done();
                });
        });
    });
});
