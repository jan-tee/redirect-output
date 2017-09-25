import * as assert from 'assert';
import * as fs from 'fs';
import * as rm from 'rimraf';
import * as path from 'path';
import RedirectOutput from '../';

let output: RedirectOutput;

let cache = path.resolve(__dirname, './cache/console.log');
let asset = path.resolve(__dirname, './asset/console.log');

let validate = () => {
	return new Promise(resolve => {
		global.setTimeout(() => {
			let actual = fs.readFileSync(cache, 'utf8');
			let expected = fs.readFileSync(asset, 'utf8');

			assert.equal(actual, expected, 'Unexpected content');
			resolve();
		}, 100);
	});
};

describe('Basic', () => {
	beforeEach(async () => {
		output = new RedirectOutput();
		rm.sync(cache);
	});

	afterEach(() => {
		output.restore();
	});

	it('.write: expected last value', () => {
		output.write(cache);

		console.log('write');

		output.restore();

		return validate();
	});

	it('.restore: expected original value', () => {
		output.write(cache);

		console.log('write');

		output.restore();

		console.log('restore');

		return validate();
	});
});
