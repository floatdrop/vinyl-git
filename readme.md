# vinyl-git [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

Get files as Vinyl File objects from git.

## Why

Use it with [`husky`](https://github.com/typicode/husky). There are plenty projects, that are in terrible state, because of lacking of linting in development process. To get linting (and codestyle checks) in such kind of project and not be overwhelmed with linting errors from legacy code `vinyl-git` was created.

Just replace `gulp.src` with `git.staged` and run linting on only files, that are prepeared for commiting (just do not forget to add precommit hook with, [`husky`](https://github.com/typicode/husky)).

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


## API



# License

MIT (c) 2014 Vsevolod Strukchinsky (floatdrop@gmail.com)

[npm-url]: https://npmjs.org/package/vinyl-git
[npm-image]: http://img.shields.io/npm/v/vinyl-git.svg

[travis-url]: https://travis-ci.org/floatdrop/vinyl-git
[travis-image]: http://img.shields.io/travis/floatdrop/vinyl-git.svg

[depstat-url]: https://david-dm.org/floatdrop/vinyl-git
[depstat-image]: https://david-dm.org/floatdrop/vinyl-git.svg?theme=shields.io
