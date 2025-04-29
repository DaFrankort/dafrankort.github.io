import { fetchIndexRepos } from "./FetchIndex";
import Fuse from "fuse.js";

/**
 * Represents the detailed structure of a project.
 */
export type Project = {
  name: string;
  display_name: string;
  excerpt: string;
  description: string;
  techstack: string[];
  html_url: string;
  private: boolean;
};

/**
 * Fetches project details by name.
 * If the exact project is not found, attempts to find a similar one using fuzzy matching.
 *
 * @param {string} projectName - The name of the project to fetch.
 * @returns {Promise<Project | null>} The project details or null if not found.
 */
export async function fetchProjectDetail(projectName: string): Promise<Project | null> {
  const details = await _tryFetchProject(projectName);
  if (details) return details;

  const similarName = await _findSimilarProjectName(projectName);
  if (!similarName) {
    return null;
  }

  const fallback = await _tryFetchProject(similarName);
  if (!fallback) {
    return null;
  }

  return fallback;
}

/**
 * Attempts to fetch a project by name.
 * Normalizes `.json` suffix and checks for fetch success.
 *
 * @param {string} name - The normalized name of the project (with or without `.json`).
 * @returns {Promise<Project | null>} The project data if found, or null.
 */
async function _tryFetchProject(name: string): Promise<Project | null> {
  try {
    if (name.endsWith(".json")) {
      name = name.replace(".json", "");
    }

    const res = await fetch(`/content/repos/${name}.json`);
    if (!res.ok) return null;
    const data: Project = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}

/**
 * Searches for a similar project name using fuzzy matching.
 *
 * @param {string} projectName - The name of the project to match against the index.
 * @returns {Promise<string | null>} The name of the most similar project or null if none found.
 */
async function _findSimilarProjectName(projectName: string): Promise<string | null> {
  const projectIndex = await fetchIndexRepos();

  const fuse = new Fuse(projectIndex, {
    keys: ["file"],
    threshold: 0.3,
  });

  const [match] = fuse.search(projectName);
  if (!match) {
    return null;
  }

  const similarFile = match.item.file;
  return similarFile;
}
