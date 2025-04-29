/**
 * Represents a brief version of a project from the index file.
 */
export interface IndexProject {
  file: string;
  display_name: string;
  excerpt: string;
  techstack: string[];
  private: boolean;
}

/**
 * Structure of the data returned from the index JSON file.
 */
interface ProjectData {
  repos: IndexProject[];
  techstacks: string[];
}

/**
 * Private helper to fetch and parse the index data from `/content/index.json`.
 */
async function fetchIndexData(): Promise<ProjectData | null> {
  try {
    const response = await fetch("/content/index.json");
    if (!response.ok) {
      throw new Error("Failed to fetch index.json");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching index data:", error);
    return null;
  }
}

/**
 * Fetches the project index from `/content/index.json`.
 * Returns a list of brief project entries (used for listing or searching).
 *
 * @returns {Promise<IndexProject[]>} A list of project summaries, or an empty array on failure.
 */
export async function fetchIndexRepos(): Promise<IndexProject[]> {
  const data = await fetchIndexData();
  return data?.repos ?? [];
}

/**
 * Fetches the techstacks from `/content/index.json`.
 * Returns a list of techstacks, gathered from all showcased projects.
 *
 * @returns {Promise<string[]>} A list of techstacks
 */
export async function fetchIndexTechstacks(): Promise<string[]> {
  const data = await fetchIndexData();
  return data?.techstacks ?? [];
}
