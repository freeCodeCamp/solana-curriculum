import { readFile } from 'fs/promises';

const file = await readFile('./package.json', 'utf8');
export const pkg = JSON.parse(file);

export function getUri(path) {
  return `http://localhost:3001/${path}`;
}
