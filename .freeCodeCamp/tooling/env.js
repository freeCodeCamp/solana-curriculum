import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ROOT = join(__dirname, '../..');

export async function getState() {
  let defaultState = {
    currentProject: null,
    locale: 'english'
  };
  try {
    const state = JSON.parse(
      await readFile(join(ROOT, '.freeCodeCamp/config/state.json'), 'utf-8')
    );
    return { ...defaultState, ...state };
  } catch (err) {
    console.error(err);
  }
  return meta;
}

export async function setState(obj) {
  const state = await getState();
  const updatedState = {
    ...state,
    ...obj
  };

  await writeFile(
    join(ROOT, '.freeCodeCamp/config/state.json'),
    JSON.stringify(updatedState, null, 2)
  );
}

/**
 * @param {string} project Project dashed name
 */
export async function getProjectConfig(project) {
  const projects = JSON.parse(
    await readFile(join(ROOT, '.freeCodeCamp/config/projects.json'), 'utf-8')
  );

  const proj = projects.find(p => p.dashedName === project);

  const defaultConfig = {
    testPollingRate: 333,
    currentLesson: 1,
    runTestsOnWatch: false,
    lastKnownLessonWithHash: 1,
    seedEveryLesson: false,
    useGitBuildOnProduction: false // TODO: Necessary?
  };
  if (!proj) {
    return defaultConfig;
  }
  return { ...defaultConfig, ...proj };
}

/**
 *
 * @param {string} project Project dashed name
 * @param {object} config Config properties to set
 */
export async function setProjectConfig(project, config = {}) {
  const projects = JSON.parse(
    await readFile(join(ROOT, '.freeCodeCamp/config/projects.json'), 'utf-8')
  );

  const updatedProject = {
    ...projects.find(p => p.dashedName === project),
    ...config
  };

  const updatedProjects = projects.map(p =>
    p.dashedName === project ? updatedProject : p
  );

  await writeFile(
    join(ROOT, '.freeCodeCamp/config/projects.json'),
    JSON.stringify(updatedProjects, null, 2)
  );
}
