import __helpers from '../.freeCodeCamp/tooling/test-utils.js';

export async function rustTest(path, filePath, test, cb) {
  const PATH_TO_FILE = join(ROOT, filePath);
  const T_ATTR = '#[test]';
  const testString = `${T_ATTR}\n${test}`;

  const fileContents = await __helpers.getFile(filePath);

  const fileWithTest = fileContents + '\n\n\n' + testString;

  let std;

  try {
    fs.writeFileSync(PATH_TO_FILE, fileWithTest, 'utf-8');

    std = await __helpers.getCommandOutput('cargo test --lib', path);
  } catch (e) {
    debug(e);
  } finally {
    await cb(std.stdout, std.stderr);
    fs.writeFileSync(PATH_TO_FILE, fileContents, 'utf-8');
  }
}
