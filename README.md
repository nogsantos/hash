# @nogsantos/hash

[![Travis](https://img.shields.io/travis/nogsantos/@nogsantos/hash.svg?style=flat-square)](https://travis-ci.org/nogsantos/@nogsantos/hash)
[![NPM version](https://img.shields.io/npm/v/@nogsantos/hash.svg?style=flat-square)](https://www.npmjs.com/package/@nogsantos/hash)
[![NPM downloads](https://img.shields.io/npm/dm/@nogsantos/hash.svg?style=flat-square)](https://www.npmjs.com/package/@nogsantos/hash)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Sha1 and Md5 hash encoder for javascript.

## Install

```shell
npm i -P @nogsantos/hash
```

## Example of usage

### Web

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

    <script src="./dist/hash.umd.min.js"></script>
    <script>
        var md5 = new Hash.Md5();
        var md5Results = [
            {
                lorem: md5.encode('Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, officia. Maxime, eveniet similique modi quia illo inventore nemo numquam ipsum quod amet veniam, ullam facere. Ullam esse odit laboriosam consectetur!'),
                test: md5.encode('test')
            }
        ];
        console.table(md5Results);

        var sha1 = new Hash.Sha1();
        var sha1Results = [
            {
                lorem: sha1.encode('Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, officia. Maxime, eveniet similique modi quia illo inventore nemo numquam ipsum quod amet veniam, ullam facere. Ullam esse odit laboriosam consectetur!'),
                test: sha1.encode('test')
            }
        ];
        console.table(sha1Results);

    </script>
</body>

</html>

```

#### Output:

![Console](https://res.cloudinary.com/nogsantos/image/upload/v1517849815/Screenshot_from_2018-02-05_14-53-31_qk4smh.png)

### Node

```javascript
const Md5 = require('./dist/hash').Md5;
const Sha1 = require('./dist/hash').Sha1;
// or just
// const { Md5, Sha1}  = require('./dist/hash');

const md5 = new Md5();
console.log('md5: ', md5.encode('Lorem ipsum dolor sit, amet consectetur adipisicing elit.'));
console.log('md5: ', md5.encode('test'));

const sha1 = new Sha1();
console.log('sha1: ', sha1.encode('Lorem ipsum dolor sit, amet consectetur adipisicing elit.'));
console.log('sha1: ', sha1.encode('test'));

```

## License

MIT © [Fabricio Nogueira](http://fabricionogueira.me)
