/**
 * Represents a brief version of a project from the index file.
 */
export interface IndexProject {
  /** Filename of the project JSON, e.g., "my-project.json" */
  file: string;
  /** Human-readable name of the project */
  display_name: string;
  /** Short summary of the project */
  excerpt: string;
  /** List of languages & technologies used */
  techstack: string[];
  /** Whether or not the included link is private or not */
  private: boolean;
}

/**
 * Structure of the data returned from the index JSON file.
 */
interface ProjectData {
  /** List of indexed projects */
  repos: IndexProject[];
}

/**
 * Fetches the project index from `/content/index.json`.
 * Returns a list of brief project entries (used for listing or searching).
 *
 * @returns {Promise<IndexProject[]>} A list of project summaries, or an empty array on failure.
 */
export async function fetchIndex(): Promise<IndexProject[]> {
  try {
    const response = await fetch("/content/index.json");
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data: ProjectData = await response.json();
    return data.repos;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
