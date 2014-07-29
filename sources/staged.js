var File = require('vinyl');
var through = require('through2');
var sgf = require('staged-git-files');
var fs = require('fs');
var stripBom = require('strip-bom');

module.exports = function () {
	var stream = through.obj();

	sgf(function(err, results) {
		if (err) { return stream.emit('error', err); }

		results.forEach(function (file) {
			fs.readFile(file.filename, function (err, data) {
				if (err) {
					stream.emit('error', err);
				}
				stream.write(new File({
					path: file.filename,
					contents: stripBom(data)
				}));
			});
		});
	});

	return stream;
};