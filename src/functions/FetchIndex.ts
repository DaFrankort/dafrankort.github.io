export interface IndexProject {
  file: string;
  display_name: string;
  excerpt: string;
}

interface ProjectData {
  repos: IndexProject[];
}

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
