var fs = require('vinyl-fs');
var through = require('through2');
var sgf = require('staged-git-files');

module.exports = function (options) {
    var stream = through.obj();

    sgf.cwd = process.cwd();

    sgf(function(err, results) {
        if (err) { return stream.emit('error', err); }

        var files = results.map(function (file) {
            return file.filename;
        });

        if (files.length === 0) {
            return stream.end();
        }

        fs.src(files, options).pipe(stream);
    });

    return stream;
};
