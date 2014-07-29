/* global describe, it, beforeEach */

var git = require('gift');
var path = require('path');
var repoPath = path.join(__dirname, '/repo');

describe('staged', function () {
    var repo;
    beforeEach(function (done) {
        git.init(repoPath, true, function (err, _repo) {
            repo = _repo;
            done(err);
        });
    });

    it('should emit staged files', function (done) {
        repo.add('staged.js', function () {
            done();
        });
    });
});
