"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const Debug = require("debug");
let debug = Debug('redirect-output');
const write = process.stdout.write;
class RedirectOutput {
    constructor(options) {
        this.options = options;
    }
    write(file) {
        let { dir, name } = path.parse(file);
        debug('Used directory', dir);
        mkdirp.sync(dir);
        let stream = fs.createWriteStream(file, this.options);
        process.stdout.write = function () {
            write.apply(process.stdout, arguments);
            return stream.write.apply(stream, arguments);
        };
    }
    restore() {
        process.stdout.write = write;
    }
}
exports.default = RedirectOutput;
//# sourceMappingURL=index.js.map