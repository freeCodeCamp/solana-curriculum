import { readFile, readdir } from 'fs/promises';
import { exec, execSync } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import fs from 'fs';
import { ROOT } from './env.js';

// ---------------
// GENERIC HELPERS
// ---------------

const execute = promisify(exec);

/**
 * Get the contents of a directory
 * @param {string} path Path relative to root of working directory
 * @returns {string[]} An array of file names
 */
async function getDirectory(path) {
  const files = await readdir(join(ROOT, path));
  return files;
}

/**
 * Get the `.logs/.terminal-out.log` file contents, or `throw` if not found
 * @returns {string} The `.terminal-out.log` file contents
 */
async function getTerminalOutput() {
  const pathToTerminalLogs = join(ROOT, '.logs/.terminal-out.log');
  const terminalLogs = await readFile(pathToTerminalLogs, 'utf8');

  // TODO: Throwing is probably an anti-pattern?
  if (!terminalLogs) {
    throw new Error('No terminal logs found');
  }

  return terminalLogs;
}

/**
 * Returns the output of a command called from a given path
 * @param {string} command
 * @param {string} path Path relative to root of working directory
 * @returns {{stdout, stderr}}
 */
async function getCommandOutput(command, path = '') {
  try {
    const cmdOut = await execute(command, {
      cwd: join(ROOT, path),
      shell: '/bin/bash'
    });
    return cmdOut;
  } catch (err) {
    return err;
  }
}

/**
 * Get the `.logs/.bash_history.log` file contents, or `throw` is not found
 * @param {number?} howManyBack The `nth` log from the history
 * @returns {string}
 */
async function getLastCommand(howManyBack = 0) {
  const pathToBashLogs = join(ROOT, '.logs/.bash_history.log');
  const bashLogs = await readFile(pathToBashLogs, 'utf8');

  if (!bashLogs) {
    throw new Error(`Could not find ${pathToBashLogs}`);
  }

  const logs = bashLogs.split('\n');
  const lastLog = logs[logs.length - howManyBack - 2];

  return lastLog;
}

/**
 * Get the `.logs/.cwd.log` file contents
 * @returns {string}
 */
async function getCWD() {
  // TODO: Do not return whole file?
  const pathToCWD = join(ROOT, '.logs/.cwd.log');
  const cwd = await readFile(pathToCWD, 'utf8');
  return cwd;
}

/**
 * Get a file from the given `path`
 * @param {string} path Path relative to root of working directory
 * @returns {string}
 */
async function getFile(path) {
  const file = await readFile(join(ROOT, path), 'utf8');
  return file;
}

/**
 * Check if given path exists
 * @param {string} path Path relative to root of working directory
 * @returns {boolean}
 */
async function fileExists(path) {
  return fs.existsSync(join(ROOT, path));
}

/**
 * Copy the contents of a directory from one location to another
 * @param {string} folderToCopyPath Path to folder to copy relative to root
 * @param {string} destinationFolderPath Path to folder destination relative to root
 */
async function copyDirectory(folderToCopyPath, destinationFolderPath) {
  const folderToCopy = join(ROOT, folderToCopyPath);
  const destinationFolder = join(ROOT, destinationFolderPath);

  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }

  fs.readdirSync(folderToCopy).forEach(file => {
    fs.copyFileSync(`${folderToCopy}/${file}`, `${destinationFolder}/${file}`);
  });
}

async function copyProjectFiles(
  projectFolderPath,
  testsFolderPath,
  arrayOfFiles = []
) {
  const projectFolder = join(ROOT, projectFolderPath);
  const testsFolder = join(ROOT, testsFolderPath);

  if (!projectFolder || !testsFolder || arrayOfFiles.length === 0) {
    throw Error('Cannot copy project files');
  }

  arrayOfFiles.forEach(file => {
    fs.copyFileSync(`${projectFolder}/${file}`, `${testsFolder}/${file}`);
  });
}

/**
 *
 * @param {string} command Command string to run
 * @param {string} path Path relative to root to run command in
 */
async function runCommand(command, path) {
  execSync(command, {
    cwd: join(ROOT, path),
    shell: '/bin/bash'
  });
}

/**
 *
 * @param {string} filePath Path to JSON file relative to root
 * @returns {object} `JSON.parse` file contents
 */
async function getJsonFile(filePath) {
  const fileString = fs.readFileSync(join(ROOT, filePath));
  return JSON.parse(fileString);
}

/**
 *
 * @param {string} path Path to JSON file relative to root
 * @param {any} content Stringifiable content to write to `path`
 */
async function writeJsonFile(path, content) {
  fs.writeFileSync(join(ROOT, path), JSON.stringify(content, null, 2));
}

const __helpers = {
  getDirectory,
  getFile,
  fileExists,
  getTerminalOutput,
  getCommandOutput,
  getLastCommand,
  getCWD,
  copyDirectory,
  copyProjectFiles,
  runCommand,
  getJsonFile,
  writeJsonFile
};

export default __helpers;
