export type Project = {
  name: string;
  display_name: string;
  excerpt: string;
  description: string;
  html_url: string;
  private: boolean;
  hidden: boolean;
};

export async function fetchProjectDetail(projectId: string): Promise<Project | null> {
  try {
    const response = await fetch(`/content/repos/${projectId}.json`);
    if (!response.ok) {
      throw new Error("Project not found");
    }
    const data: Project = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching project detail:", error);
    return null;
  }
}
