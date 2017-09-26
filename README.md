# redirect-output

[![npm version badge](https://img.shields.io/npm/v/envisor.svg)](https://www.npmjs.org/package/redirect-output)
[![Build Status](https://travis-ci.org/monolithed/redirect-output.png)](https://travis-ci.org/monolithed/redirect-output)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)

> Provides a way to redirect your process.stdout to a file.

## Installation:

```shell
npm install redirect-output
```

## Usage

*For example you could use the following code:*

```ts
import * as path from 'path';
import RedirectOutput from 'redirect-output';

let output = new RedirectOutput();

let file = path.join(__dirname, 'console.log');

output.write(file);

// Write some text to file and stdout
console.log('text');

// Restoring original process.stdout object
output.restore();

// Write some text to stdout only
console.log('text');
```

### API

#### .constructor(options?: IOptions): void

#### interface IOptions

See fs.WriteStream

```ts
interface IOptions {
	flags?: string;
	encoding?: string;
	fd?: number;
	mode?: number;
	autoClose?: boolean;
	start?: number;
	[key: string]: any;
}
```

#### .write(file: string): void

Redirect all of process.stdout to a log file.

#### .restore(): void

Restore original process.stdout method.

### Tests

```
npm test
```

### Debug

```
DEBUG=redirect-output npm test
```

### Publication

```
npm run prepublishOnly
```

## License
	MIT
