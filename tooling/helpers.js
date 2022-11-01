import __helpers from '../.freeCodeCamp/tooling/test-utils.js';
import { logover } from '../.freeCodeCamp/tooling/logger.js';
import { ROOT } from '../.freeCodeCamp/tooling/env.js';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Babeliser as B } from 'babeliser';

export async function rustTest(path, filePath, test, cb) {
  const PATH_TO_FILE = join(ROOT, filePath);
  const T_ATTR = '#[test]';
  const testString = `${T_ATTR}\n${test}`;

  const fileContents = await __helpers.getFile(filePath);

  const fileWithTest = fileContents + '\n\n\n' + testString;

  let std;

  try {
    writeFileSync(PATH_TO_FILE, fileWithTest, 'utf-8');

    std = await __helpers.getCommandOutput('cargo test --lib', path);
  } catch (e) {
    logover.debug(e);
  } finally {
    const ensureFileContents = fileContents.replace(testString, '');
    writeFileSync(PATH_TO_FILE, ensureFileContents, 'utf-8');
    await cb(std.stdout, std.stderr);
  }
}

export const Babeliser = B;

export async function importSansCache(p) {
  const cacheBustingModulePath = `${p}?update=${Date.now()}`;
  return await import(cacheBustingModulePath);
}
