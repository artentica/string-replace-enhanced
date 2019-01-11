<h1 align="center" style="border-bottom: none;">📝✏️string-replace-enhanced</h1>
<h3 align="center">A package to go further with string replace</h3>
<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img alt="MIT licenses" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
  <a href="https://snyk.io/test/github/artentica/string-replace-enhanced?targetFile=package.json">
    <img alt="snyk" src="https://snyk.io/test/github/artentica/string-replace-enhanced/badge.svg?targetFile=package.json">
  </a>
  <a href="http://badge.fury.io/js/string-replace-enhanced">
    <img alt="NPM version" src="https://badge.fury.io/js/string-replace-enhanced.svg">
  </a>
  <a href="http://badge.fury.io/js/string-replace-enhanced">
    <img alt="NPM dependencies" src="https://img.shields.io/david/artentica/string-replace-enhanced.svg">
  </a>
  <a href="https://travis-ci.com/artentica/string-replace-enhanced">
    <img alt="Travis" src="https://travis-ci.com/artentica/string-replace-enhanced.svg?branch=master">
  </a>
  <a href="https://codecov.io/gh/artentica/string-replace-enhanced">
    <img alt="codecov" src="https://img.shields.io/codecov/c/github/artentica/string-replace-enhanced.svg">
  </a>
  <a href="#badge">
    <img alt="bundlephobia" src="https://img.shields.io/bundlephobia/min/string-replace-enhanced.svg">
  </a>
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>

**string-replace-enhanced** allow you to go futher with the command replace for string in javascript. You have two options, use the object and implement his settings or use the functions in a standalone way.

## Installation

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a638c7f9f9e94852bc83c7094cd95e63)](https://app.codacy.com/app/artentica/string-replace-enhanced?utm_source=github.com&utm_medium=referral&utm_content=artentica/string-replace-enhanced&utm_campaign=Badge_Grade_Dashboard)

With NodeJS:

    npm install -S string-replace-enhanced

... and then:

```javascript
import stringReplaceEnhanced from 'string-replace-enhanced'
//  or
import {replaceBefore, replaceAfter, replaceAround, replace, replaceRegex} from 'string-replace-enhanced'
//  or
const stringReplaceEnhanced = require('string-replace-enhanced')
```
In a browser:

```html
<script src="https://unpkg.com/string-replace-enhanced@latest/lib/sre.min.js"></script>
<script>
  /* stringReplaceEnhanced is available here */
  /* in object style */

  new StringReplaceEnhanced.default(options) //constructor

  /* standalone functions */

  StringReplaceEnhanced.replace(...args) //function
</script>
```

## Usage

There is two possibilities, use the object ou the separated functions.

### Object

With the object it will be possible to reuse a preset configuration or use the default one.

```javascript
import stringReplaceEnhanced from 'string-replace-enhanced'

// If an option is missing, it will be given a default value
const options =  {
  after: ['«'],
  around: [],
  before: ['!', '?', ':', ';', '»'],
  regex: [],
  replacer: '&nbsp;',
  toReplace: ' ',
};

// Create a new stringReplaceEnhanced object
const sre = new stringReplaceEnhanced(options);

// Use its methods simply giving the string to work on
console.log(sre.replaceBefore('Hello world !'));
// Hello world&nbsp;!
```

### Functions

For the standalone functions you will need to specify every arguments

```javascript
import { replaceBefore } from 'string-replace-enhanced'

console.log(replaceBefore('Hello world !', ' ', '&nbsp;'))
// Hello world&nbsp;!
```

## Options

Check the links below to have the up to date version:

 - All options are documented in [here](https://artentica.github.io/string-replace-enhanced/interfaces/_interfaces_.isettings.html)

 - The default object implementation's settings is [here](https://artentica.github.io/string-replace-enhanced/modules/_defaultsetttings_.html)

| name      | type                            | default                     | description                                                                          |
| --------- | ------------------------------- | --------------------------- | ------------------------------------------------------------------------------------ |
| after     | ReadonlyArray<string> or string | `['«']`                     | Array of char in need of potential need of replacement after itself                  |
| around    | ReadonlyArray<string> or string | `[]`                        | Array of char in need of potential need of replacement around itself                 |
| before    | ReadonlyArray<string> or string | `['!', '?', ':', ';', '»']` | Array of char in need of potential need of replacement before itself                 |
| regex     | ReadonlyArray<RegExp> or RegExp | `[]`                        | Array of regex, replace match by the replacer                                        |
| replacer  | string                          | `'&nbsp;'`                  | Replacer of matching `toReplace`                                                     |
| toReplace | string                          | `' '`                       | String to replace, *in the function _replace_ `toReplace` can be an array of string* |


## Properties and methods

To see more about the methods and properties you can access to the documentation [here](https://artentica.github.io/string-replace-enhanced/modules/_core_.html)


## Documentation

To see more about the functions or the configuration you can access it in the latest documentation [here](https://artentica.github.io/string-replace-enhanced/) or one in the forked project:

    npm i && npm run build:doc

The documentation will be available in the `docs` file.