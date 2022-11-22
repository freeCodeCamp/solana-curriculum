/**
 * Copies the seed from the previous file match to the given lesson
 *
 * @example
 * node tooling/seed.js <LESSON_NUMBER> <FILE>
 */

import clipboardy from 'clipboardy';
import { join } from 'path';
import {
  getFilesWithSeed,
  getLessonFromFile,
  getLessonSeed
} from '../.freeCodeCamp/tooling/parser.js';

const PATH =
  './curriculum/locales/english/learn-how-to-interact-with-on-chain-programs.md';

const LESSON_NUMBER = Number(process.argv[2]);
const FILE = join(process.argv[3]);

// Get seed from latest matching file

let lessonToCheck = LESSON_NUMBER - 1;
let match = null;
while (!match) {
  const lesson = await getLessonFromFile(PATH, lessonToCheck);
  const seed = getLessonSeed(lesson);
  const filesWithSeed = getFilesWithSeed(seed);
  match = filesWithSeed.find(([filePath]) => join(filePath) === FILE);
  lessonToCheck--;
}

// Get seed from lesson
const [_, seed] = match;

// Add seed to clipboard
await clipboardy.write(seed);
