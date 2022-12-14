import * as assert from "assert";
import * as fs from "fs";
import * as rm from "rimraf";
import * as path from "path";
import RedirectOutput from "../";

let output: RedirectOutput;

let cache = path.resolve(__dirname, "./cache/console.log");
let asset = path.resolve(__dirname, "./asset/console.log");

let validate = () => {
  return new Promise<void>((resolve) => {
    global.setTimeout(() => {
      let actual = fs.readFileSync(cache, "utf8").replace(/\r|\n/g, ""); // CRLF issues cause problems when running tests on Windows
      let expected = fs.readFileSync(asset, "utf8").replace(/\r|\n/g, ""); // CRLF issues cause problems when running tests on Windows

      assert.equal(actual.length, expected.length, "Different length");
      assert.equal(actual, expected, "Unexpected content");
      resolve();
    }, 100);
  });
};

describe("Basic", () => {
  beforeEach(async () => {
    output = new RedirectOutput();
    rm.sync(cache);
  });

  afterEach(() => {
    output.reset();
  });

  it(".write: expected last value", () => {
    output.write(cache);

    console.log("stdout");
    console.error("stderr");

    output.reset();

    return validate();
  });

  it(".reset: expected original value", () => {
    output.write(cache);

    console.log("stdout");
    console.error("stderr");

    output.reset();

    console.log("reset");

    return validate();
  });
});
