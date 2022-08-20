// This file handles the watching of the /curriculum folder for changes
// and executing the command to run the tests for the next (current) lesson
import { getState, getProjectConfig, ROOT } from './env.js';
import runLesson from './lesson.js';
import runTests from './test.js';
import { watch } from 'chokidar';
import { join } from 'path';
const { currentProject } = await getState();
const { testPollingRate, runTestsOnWatch } = await getProjectConfig(
  currentProject
);

let testsRunning = false;

function hotReload(ws) {
  console.log(`Watching for file changes on ${ROOT}`);
  let isWait = false;
  let isClearConsole = false;

  const pathsToIgnore = [join(ROOT, '.logs/.temp.log'), join(ROOT, 'config')]
    .join('|')
    .replaceAll('.', '\\.');

  watch(ROOT, {
    ignored: pathsToIgnore
  }).on('all', async (event, name) => {
    if (name) {
      if (isWait) return;
      isWait = setTimeout(() => {
        isWait = false;
      }, testPollingRate);

      const { currentProject } = await getState();
      if (!currentProject) {
        return;
      }
      const project = await getProjectConfig(currentProject);
      if (isClearConsole) {
        console.clear();
      }
      await runLesson(ws, project);
      // console.log(`Watcher: ${event} - ${name}`);
      console.log(testsRunning);
      if (runTestsOnWatch && !testsRunning) {
        testsRunning = true;
        await runTests(ws, project);
        testsRunning = false;
      }
    }
  });
}

export default hotReload;
