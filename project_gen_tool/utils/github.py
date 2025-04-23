import logging
import threading
import requests
from dotenv import get_key, load_dotenv

from utils.paths import Paths

load_dotenv(Paths.env())

class GitHub:
    @staticmethod
    def get_headers() -> object:
        token = get_key(Paths.env(), "GH_TOKEN")
        return {
            'Authorization': f'token {token}'
        }
    
    @staticmethod
    def get_username() -> str:
        return get_key(Paths.env(), "GH_USERNAME")
    
    @staticmethod
    def generate_new_projects() -> list[object]:
        from utils.content import Content # Imported late to prevent circle-import

        repos = GitHub._get_projects_json()
        projects = []
        threads = []
        for repo in repos:
            project = Content(repo)
            if project.exists():
                continue

            def run(p=project):
                p.generate_techstack()
                projects.append(p)
                p.save()
            thread = threading.Thread(target=run)
            thread.start()
            threads.append(thread)

        for thread in threads:
            thread.join()

        logging.info(f"{len(projects)} New projects generated!")
        return projects
    
    @staticmethod
    def _get_projects_json() -> list[any]:
        all_repos = []
        page = 1
        per_page = 50

        while True:
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
        url = f"https://api.github.com/repos/{username}/{project_name}/contents/" # TODO, there is an API call for readme.md specifically, no need to iterate through this.
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

    @staticmethod
    def get_project_languages(project_name: str) -> list[str]:
        username = GitHub.get_username()
        headers = GitHub.get_headers()

        url = f"https://api.github.com/repos/{username}/{project_name}/languages"
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            raise ConnectionError(f"Request \'{url}\' failed with status code {response.status_code}")
        
        language_list = list(response.json().keys())
        return language_list
