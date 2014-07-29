/* global describe, it, beforeEach */

var git = require('gift');

describe('staged', function () {
    var repo;
    beforeEach(function (done) {
        git.init('./', function (err, _repo) {
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