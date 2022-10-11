import * as fs from "fs";
import * as path from "path";
import * as mkdirp from "mkdirp";
import { debug as Debug } from "debug";

const debug = Debug("redirect-output");

const stdout = process.stdout.write;
const stderr = process.stderr.write;
let stream: fs.WriteStream;

class RedirectOutput {
  constructor(public options?: IOptions) {}

  write(file: string): void {
    let { dir, name } = path.parse(file);
    debug("Used directory", dir);
    mkdirp.sync(dir);

    // file deepcode ignore MissingCloseOnSomePath: autoClose by default
    stream = fs.createWriteStream(file, {
      autoClose: true,
      ...this.options,
    });

    process.stdout.write = function () {
      // @ts-ignore 2345
      stdout.apply(process.stdout, arguments);

      // @ts-ignore 2345
      return stream.write.apply(stream, arguments);
    };

    process.stderr.write = function () {
      // @ts-ignore 2345
      stderr.apply(process.stderr, arguments);

      // @ts-ignore 2345
      return stream.write.apply(stream, arguments);
    };
  }

  /** Restore original objects */
  reset(): void {
    stream?.end();

    process.stdout.write = stdout;
    process.stderr.write = stderr;
  }
}

interface IOptions {
  flags?: string;
  encoding?: BufferEncoding;
  fd?: number;
  mode?: number;
  start?: number;
  [key: string]: any;
}

export default RedirectOutput;
