# textwiz-utils

A small, dependency-free toolkit for everyday text operations.
Works as a JavaScript library and a command-line tool.

## Installation

```bash
npm install textwiz-utils
```

## Usage

```js
const tw = require('textwiz-utils');

tw.slugify('Hello, World!');          // 'hello-world'
tw.camelCase('make me camel case');   // 'makeMeCamelCase'
tw.truncate('Hello wonderful world', 10); // 'Hello w...'
tw.isPalindrome('Never odd or even'); // true
```

## CLI

```bash
textwiz slugify "Hello World, Again!"
textwiz palindrome "Never odd or even"
```

## Tests

```bash
npm test
```

## License

MIT