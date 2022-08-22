import express from 'express';
import runTests from './test.js';
import {
  getProjectConfig,
  getState,
  setProjectConfig,
  setState
} from './env.js';
import logover, { debug, error, warn } from 'logover';

import { WebSocketServer } from 'ws';
import runLesson from './lesson.js';
import { updateTests, updateHints, updateConsole } from './client-socks.js';
import hotReload from './hot-reload.js';
import projects from '../config/projects.json' assert { 'type': 'json' };
import { hideAll, showFile } from './utils.js';
logover({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
});

const app = express();

app.use(express.static('./dist'));

async function handleRunTests(ws, data) {
  const { currentProject } = await getState();
  const project = await getProjectConfig(currentProject);
  await runTests(ws, project);
  ws.send(parse({ data: { event: data.event }, event: 'RESPONSE' }));
}

function handleResetProject(ws, data) {}
function handleResetLesson(ws, data) {}

async function handleGoToNextLesson(ws, data) {
  const { currentProject } = await getState();
  const project = await getProjectConfig(currentProject);
  const nextLesson = project.currentLesson + 1;
  await setProjectConfig(currentProject, { currentLesson: nextLesson });
  await runLesson(ws, project);
  updateHints(ws, '');
  updateTests(ws, []);
  updateConsole(ws, '');
  ws.send(parse({ data: { event: data.event }, event: 'RESPONSE' }));
}

async function handleGoToPreviousLesson(ws, data) {
  const { currentProject } = await getState();
  const project = await getProjectConfig(currentProject);
  const prevLesson = project.currentLesson - 1;
  await setProjectConfig(currentProject, { currentLesson: prevLesson });
  await runLesson(ws, project);
  updateTests(ws, []);
  updateHints(ws, '');
  updateConsole(ws, '');
  ws.send(parse({ data: { event: data.event }, event: 'RESPONSE' }));
}

async function handleConnect(ws) {
  const { currentProject } = await getState();
  if (!currentProject) {
    return;
  }
  const project = await getProjectConfig(currentProject);
  runLesson(ws, project);
}

async function handleSelectProject(ws, data) {
  const selectedProject = projects.find(p => p.id === data?.data?.id);
  // TODO: Should this set the currentProject to `null` (empty string)?
  // for the case where the Camper has navigated to the landing page.
  await setState({ currentProject: selectedProject?.dashedName ?? null });
  if (!selectedProject) {
    warn('Selected project does not exist: ', data);
    return ws.send(parse({ data: { event: data.event }, event: 'RESPONSE' }));
  }

  // TODO: Disabled whilst in development because it is annoying
  // await hideAll();
  // await showFile(selectedProject.dashedName);
  await runLesson(ws, selectedProject);
  return ws.send(parse({ data: { event: data.event }, event: 'RESPONSE' }));
}

const server = app.listen(8080, () => {
  console.log('Listening on port 8080');
});

const handle = {
  connect: (ws, data) => {
    handleConnect(ws);
  },
  'run-tests': handleRunTests,
  'reset-project': handleResetProject,
  'go-to-next-lesson': handleGoToNextLesson,
  'go-to-previous-lesson': handleGoToPreviousLesson,
  'select-project': handleSelectProject
};

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  hotReload(ws);
  ws.on('message', function message(data) {
    const parsedData = parseBuffer(data);
    handle[parsedData.event]?.(ws, parsedData);
  });
  sock('connect', { message: "Server says 'Hello!'" });

  function sock(type, data = {}) {
    ws.send(parse({ event: type, data }));
  }
});

function parse(obj) {
  return JSON.stringify(obj);
}

function parseBuffer(buf) {
  return JSON.parse(buf.toString());
}

/**
 * Files currently under ownership by another thread.
 */
const RACING_FILES = new Set();
const FREEDOM_TIMEOUT = 100;

/**
 * Adds an operation to the race queue. If a file is already in the queue, the op is delayed until the file is released.
 * @param {string} filepath Path to file to move
 * @param {*} cb Callback to call once file is free
 */
async function addToRaceQueue(filepath, cb) {
  const isFileFree = await new Promise(resolve => {
    setTimeout(() => {
      if (!RACING_FILES.has(filepath)) {
        resolve(true);
      }
    }, FREEDOM_TIMEOUT);
  });
  if (isFileFree) {
    RACING_FILES.add(filepath);
    cb();
  }
}
