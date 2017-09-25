"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs = require("fs");
const rm = require("rimraf");
const path = require("path");
const _1 = require("../");
let output;
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
        output = new _1.default();
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
//# sourceMappingURL=index.js.map