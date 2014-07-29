var fs = require('vinyl-fs');
var through = require('through2');
var sgf = require('staged-git-files');

module.exports = function (options) {
	var stream = through.obj();

    sgf.cwd = process.cwd();

	sgf(function(err, results) {
		if (err) { return stream.emit('error', err); }

		results.forEach(function (file) {
            fs.src(file.filename, options).pipe(stream);
		});
	});

	return stream;
};
