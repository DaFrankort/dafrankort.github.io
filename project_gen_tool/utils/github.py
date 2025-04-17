import logging
import os
import requests
from dotenv import get_key, load_dotenv

env_path = os.path.join(os.getcwd(), '.env')
load_dotenv(env_path)
print(env_path)

class GitHub:
    @staticmethod
    def get_headers() -> object:
        token = get_key(env_path, "GH_TOKEN")
        return {
            'Authorization': f'token {token}'
        }
    
    @staticmethod
    def get_username() -> str:
        return get_key(env_path, "GH_USERNAME")
    
    @staticmethod
    def generate_new_projects() -> list[object]:
        from utils.repo import Repo

        repos = GitHub._get_projects_json()
        
        projects = []
        for repo in repos:
            project = Repo(repo)
            if project.exists():
                continue

            projects.append(project)
            project.save()

        logging.info(f"{len(projects)} New projects generated!")
        return projects
    
    @staticmethod
    def _get_projects_json() -> dict:
        all_repos = []
        page = 1
        per_page = 50

        while True:
            username = GitHub.get_username()
            headers = GitHub.get_headers()

            url = f"https://api.github.com/user/repos?per_page={per_page}&page={page}"
            response = requests.get(url, headers=headers)

            if response.status_code != 200:
                raise ConnectionError(f"Request '{url}' failed with status code {response.status_code}")

            repos = response.json()
            if not repos:
                break  # No more pages

            all_repos.extend(repos)
            page += 1

        logging.info(f"Received {len(all_repos)} projects from GitHub")
        return all_repos
    
    @staticmethod
    def get_project_readme(project_name: str) -> str:
        username = GitHub.get_username()
        headers = GitHub.get_headers()

        # Get all contents of a project
        url = f"https://api.github.com/repos/{username}/{project_name}/contents/"
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            raise ConnectionError(f"Request \'{url}\' failed with status code {response.status_code}")

        # Look for file called readme.md and return
        contents = response.json()
        for content in contents:
            filename = content.get('name', '')

            if 'readme' not in filename.lower():
                continue
            
            # Get readme.md contents
            readme_url = content.get('download_url')
            readme_response = requests.get(readme_url, headers=headers)
            if readme_response.status_code != 200:
                raise ConnectionError(f"Request \'{url}\' failed with status code {response.status_code}")

            return readme_response.text
        
        return None
