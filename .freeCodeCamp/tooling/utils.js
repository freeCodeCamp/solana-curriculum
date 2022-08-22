import { cp, readdir, rm, rmdir, writeFile } from 'fs/promises';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { exec } from 'child_process';
import { readdirSync } from 'fs';
const execute = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Adds all existing paths at runtime
const PERMANENT_PATHS_IN_ROOT = readdirSync('..');

/**
 * Alter the `.vscode/settings.json` file properties
 * @param {object} obj Object Literal to set/overwrite properties
 */
export async function setVSCSettings(obj) {
  const pathToSettings = join(__dirname, '../..', '.vscode', 'settings.json');
  const settings = getVSCSettings();
  const updated = {
    ...settings,
    ...obj
  };
  await writeFile(pathToSettings, JSON.stringify(updated, null, 2));
}

/**
 * Get the `.vscode/settings.json` file properties
 * @returns The contents of the `.vscode/settings.json` file
 */
export async function getVSCSettings() {
  const pathToSettings = join(__dirname, '../..', '.vscode', 'settings.json');
  return JSON.parse(await readFile(pathToSettings, 'utf8'));
}

/**
 * Toggle `[file]: true` to `.vscode/settings.json` file
 * @param {string} file Filename of file to hide in VSCode settings
 */
export async function hideFile(file) {
  // Get `files.exclude`
  const filesExclude = (await getVSCSettings())['files.exclude'];
  filesExclude[file] = true;
  await setVSCSettings({ 'files.exclude': filesExclude });
}

/**
 * Toggle `[file]: false` to `.vscode/settings.json` file
 * @param {string} file Filename of file to show in VSCode settings
 */
export async function showFile(file) {
  // Get `files.exclude`
  const filesExclude = (
    await import('../../.vscode/settings.json', { assert: { type: 'json' } })
  ).default['files.exclude'];
  filesExclude[file] = false;
  await setVSCSettings({ 'files.exclude': filesExclude });
}

/**
 * Hide all files in the `files.exclude` property of the `.vscode/settings.json` file
 */
export async function hideAll() {
  const filesExclude = (await getVSCSettings())['files.exclude'];
  for (const file of Object.keys(filesExclude)) {
    filesExclude[file] = true;
  }
  await setVSCSettings({ 'files.exclude': filesExclude });
}

/**
 * Copies all paths in the given `project.dashedName` directory to the root directory
 * @param {object} project Project to reset
 */
export async function dumpProjectDirectoryIntoRoot(project) {
  const pathToRoot = join(__dirname, '../..');
  await cp(join(pathToRoot, project.dashedName), pathToRoot, {
    recursive: true
  });
}

/**
 * Removes non-boilerplate paths from the root, and copies them to the project directory
 * @param {object} projectToCopyTo Project to copy to
 */
export async function cleanWorkingDirectory(projectToCopyTo) {
  if (projectToCopyTo) {
    await copyNonWDirToProject(projectToCopyTo);
  }
  const pathToRoot = join(__dirname, '../..');
  const allOtherPaths = (await readdir(pathToRoot)).filter(
    p => !PERMANENT_PATHS_IN_ROOT.includes(p)
  );
  allOtherPaths.forEach(async p => {
    await rm(join(pathToRoot, p), { recursive: true });
  });
}

/**
 * Copies all non-boilerplate paths from the root to the project directory
 * @param {object} project Project to copy to
 */
async function copyNonWDirToProject(project) {
  const pathToRoot = join(__dirname, '../..');
  const allOtherPaths = (await readdir(pathToRoot)).filter(
    p => !PERMANENT_PATHS_IN_ROOT.includes(p)
  );
  allOtherPaths.forEach(async p => {
    const relativePath = join(pathToRoot, p);
    await cp(relativePath, join(pathToRoot, project, p), {
      recursive: true,
      force: true
    });
  });
}
