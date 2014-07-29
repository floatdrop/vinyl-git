var File = require('vinyl');
var through = require('through2');
var sgf = require('staged-git-files');

module.exports = function () {
	var stream = through.obj();

	sgf(function(err, results) {
		if (err) { return stream.emit('error', err); }

		results.forEach(function (file) {
			stream.write(new File({
				path: file.filename
			}));
		});
	});

	return stream;
};