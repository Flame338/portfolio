import { workEntries, type Entry } from '../data/portfolio.ts';
import { projectEntry } from './projectModel.ts';
import { getProjects } from './projects.ts';

export async function getEntries(): Promise<Entry[]> {
  const projects = await getProjects();
  return [...projects.map((project) => projectEntry(project, import.meta.env.BASE_URL)), ...workEntries];
}
