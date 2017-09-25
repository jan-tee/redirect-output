import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as Debug from 'debug';

const debug = Debug('redirect-output');
const write = process.stdout.write;

class RedirectOutput {
	constructor (public options?: IOptions) { }

	write (file: string): void {
		let { dir, name } = path.parse(file);

		debug('Used directory', dir);

		mkdirp.sync(dir);

		let stream: fs.WriteStream = fs.createWriteStream(file, this.options);

		process.stdout.write = function () {
			write.apply(process.stdout, arguments);

			return stream.write.apply(stream, arguments);
		};
	}

	restore (): void {
		process.stdout.write = write;
	}
}

export interface IOptions {
	flags?: string;
	encoding?: string;
	fd?: number;
	mode?: number;
	autoClose?: boolean;
	start?: number;
	[key: string]: any;
}

export default RedirectOutput;
