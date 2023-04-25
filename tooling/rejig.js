import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';

const PATH = process.argv[2]?.trim();

const CURRICULUM_PATH = 'curriculum/locales/english';

/**
 * Ensures all lessons are incremented by 1
 */
async function rejigFile(fileName) {
  const filePath = join(CURRICULUM_PATH, fileName);
  const file = await readFile(filePath, 'utf-8');
  let lessonNumber = 0;
  const newFile = file.replace(/## \d+/g, () => {
    lessonNumber++;
    return `## ${lessonNumber}`;
  });
  await writeFile(filePath, newFile, 'utf-8');
}

try {
  const rejiggedFiles = [];
  if (PATH) {
    await rejigFile(PATH);
    rejiggedFiles.push(PATH);
  } else {
    const files = await readdir(CURRICULUM_PATH);
    for (const file of files) {
      console.log(`Rejigging '${file}'`);
      await rejigFile(file);
      rejiggedFiles.push(file);
    }
  }
  console.info('Successfully rejigged: ', rejiggedFiles);
} catch (e) {
  console.error(e);
  console.log('Usage: npm run rejig <CURRICULUM_FILE_NAME>');
  console.log('Curriculum file name MUST include the `.md` extension.');
}
