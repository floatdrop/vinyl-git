# vinyl-git

Get staged files as Vinyl File objects.

## Usage

```js
var map = require('map-stream');
var git = require('vinyl-git');

var log = function(file, cb) {
  console.log(file.path);
  cb(null, file);
};

git.staged()
  .pipe(map(log))
  .pipe(fs.dest('./output'));
```